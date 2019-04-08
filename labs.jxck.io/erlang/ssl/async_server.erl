#!/usr/bin/env escript
-module(server).
-compile(export_all).
-include("../logger.hrl").

-define(PORT, 4443).
-define(KEY,  "/keys/key.pem").
-define(CERT, "/keys/cert.pem").


%% curl -k -i https://localhost:4443
main(_) ->
    ok = ?Log(ssl:start()),
    Opts = [
            {active,    false},
            {reuseaddr, true},
            {packet,    http_bin},
            binary
           ],
    {ok, ListenSocket} = ?Log(gen_tcp:listen(?PORT, Opts)),
    accept_loop(ListenSocket).


accept_loop(ListenSocket) ->
    {ok, Ref} = ?Log(prim_inet:async_accept(ListenSocket, -1)),
    receive
        {inet_async, ListenSocket, Ref, {ok, Socket}}=Msg ->
            ?Log(Msg),

            % get Listening Socket Module
            {ok, Mod} = (inet_db:lookup_socket(ListenSocket)),

            % set Socket Module same as Listening Socket
            true = inet_db:register_socket(Socket, Mod),

            % getopts of Listening Socket
            Opts = [active, nodelay, keepalive, delay_send, priority, tos],
            {ok, SockOpt} = (prim_inet:getopts(ListenSocket, Opts)),
            ok = prim_inet:setopts(Socket, SockOpt),

            {ok, SSLSocket} = ssl:ssl_accept(Socket, [{certfile, ?CERT}, {keyfile, ?KEY}]),
            PID = spawn(fun() -> receive_loop(SSLSocket) end),
            ?Log(ssl:controlling_process(SSLSocket, PID)),
            ?Log(ssl:setopts(SSLSocket, [{active, once}])),
            accept_loop(ListenSocket);
        X ->
            ?Log(X)
    end.


receive_loop(Socket) ->
    ?Log(Socket),
    receive
        {ssl, Socket, {http_request, Method, Path, {1,1}}} ->
            ?Log(Method, Path),
            ssl:setopts(Socket, [{active, once}]),
            receive_loop(Socket);
        {ssl, Socket, {http_header, _,Key,_,Value}} ->
            ?Log(Key, Value),
            ssl:setopts(Socket, [{active, once}]),
            receive_loop(Socket);
        {ssl, Socket, http_eoh}=Msg ->
            ?Log(http_eoh),
            ok = ssl:send(Socket, <<
                                    "HTTP/1.1 200 OK\r\n"
                                    "Content-Length: 3\r\n"
                                    "\r\n"
                                    "ok\n"
                                  >>),
            ssl:setopts(Socket, [{active, once}]),
            receive_loop(Socket);
        {ssl, Socket, Data} ->
            ?Log(Data, from, Socket),
            ok = ssl:send(Socket, Data),
            ssl:setopts(Socket, [{active, once}]),
            receive_loop(Socket);
        {ssl_closed, Socket} ->
            ?Log({ssl_closed, Socket}),
            ?Log(ssl:close(Socket));
        {ssl_error, Socket, Reason} ->
            ?Log({ssl_error, Socket, Reason}),
            ?Log(ssl:close(Socket));
        Error ->
            ?Log(Error)
    end.
