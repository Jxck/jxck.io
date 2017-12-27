#!/usr/bin/env escript
-module(server).

-export([
         main/1
        ]).

-include("../logger.hrl").

-define(PORT, 4443).
-define(KEY,  "/keys/key.pem").
-define(CERT, "/keys/cert.pem").

% # TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (0xc030) TLSv1.2 Kx=ECDH Au=RSA Enc=AESGCM(256) Mac=AEAD
% openssl s_client -no_ticket -connect localhost:4443 -msg -tls1_2 -cipher ECDHE-RSA-AES256-GCM-SHA384
main(_) ->
    ok = ?Log(ssl:start()),
    {ok, Listen} = ssl:listen(?PORT, [
                                      {ciphers, [{ecdhe_rsa, aes_256_gcm, null, sha384}]},
                                      {eccs, [secp521r1]},
                                      {keyfile, ?KEY},
                                      {certfile, ?CERT},
                                      {reuseaddr, true},
                                      {active, once},
                                      binary
                                     ]),
    accept_loop(Listen).

accept_loop(Listen) ->
    {ok, {sslsocket, _, From}=Socket} = ssl:transport_accept(Listen),
    ok = ssl:ssl_accept(Socket),
    ?Log(accept, From),
    PID = spawn(fun() -> receive_loop(Socket) end),
    ssl:controlling_process(Socket, PID),
    accept_loop(Listen).

receive_loop(Socket) ->
    receive
        {ssl, {sslsocket, _, From}=Socket, Data} ->
            ?Log(Data, from, From),
            ok = ssl:send(Socket, Data),
            ssl:setopts(Socket, [{active, once}]),
            receive_loop(Socket);
        {ssl_closed, {sslsocket, _, From}=Socket} ->
            ?Log({ssl_closed, From}),
            ?Log(ssl:close(Socket));
        {ssl_error, {sslsocket, _, From}=Socket, Reason} ->
            ?Log({ssl_error, From, Reason}),
            ?Log(ssl:close(Socket));
        Error ->
            ?Log(Error)
    end.
