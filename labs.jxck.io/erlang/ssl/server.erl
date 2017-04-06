#!/usr/bin/env escript
-module(server).

-export([
         main/1
        ]).

-include("../logger.hrl").

main(_) ->
    ok = ?Log(ssl:start()),
    {ok, Listen} = ssl:listen(3000, [{certfile,"/keys/cert.pem"}, {keyfile, "/keys/key.pem"}, {reuseaddr, true}, {active, once}, binary]),
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
