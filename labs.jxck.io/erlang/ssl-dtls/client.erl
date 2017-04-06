#!/usr/bin/env escript
-module(client).

-export([
         main/1
        ]).

-include("../logger.hrl").

%% {protocol, dtls} を追加するだけ
main(_) ->
    ok = ?Log(ssl:start()),
    {ok, Socket} = ssl:connect({127,0,0,1}, 3000, [binary, {active, true}, {protocol, dtls}]),

    PID = spawn(fun() -> receive_loop(Socket) end),
    ssl:controlling_process(Socket, PID),

    send_loop(Socket).

%% コンソールから入力を受け取り送信
send_loop(Socket) ->
    {ok, [Msg]} = io:fread("> ", "~s"),
    ssl:send(Socket, Msg),
    send_loop(Socket).

%% 受信
receive_loop(Socket) ->
    receive
        {ssl, Socket, Data} ->
            ?Log(Data),
            receive_loop(Socket);
        {ssl_closed, Socket} ->
            ?Log({ssl_closed, Socket}),
            ?Log(ssl:close(Socket));
        {ssl_error, {sslsocket, _, From}=Socket, Reason} ->
            ?Log({ssl_error, From, Reason}),
            ?Log(ssl:close(Socket));
        Error ->
            ?Log(Error)
    end.
