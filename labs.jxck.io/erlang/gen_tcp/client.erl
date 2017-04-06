#!/usr/bin/env escript
-module(client).

-export([
         main/1
        ]).

-include("../logger.hrl").

%% サーバからの受信なので {active, true} で開く。
%% 受信と送信が平行できるように受信は spawn し、制御プロセスを移譲する。
main(_) ->
    {ok, Socket} = ?Log(gen_tcp:connect({127, 0, 0, 1}, 3000, [binary, {active, true}])),

    PID = spawn(fun() -> receive_loop(Socket) end),
    gen_tcp:controlling_process(Socket, PID),

    send_loop(Socket).

%% コンソールから入力を受け取り送信
send_loop(Socket) ->
    {ok, [Msg]} = io:fread("> ", "~s"),
    gen_tcp:send(Socket, Msg),
    send_loop(Socket).

%% 受信
receive_loop(Socket) ->
    receive
        {tcp, Socket, Data} ->
            ?Log(Data),
            receive_loop(Socket);
        {tcp_closed, Socket} ->
            ?Log({tcp_closed, Socket}),
            ?Log(gen_tcp:close(Socket));
        {tcp_error, Socket, Reason} ->
            ?Log({tcp_error, Socket, Reason}),
            ?Log(gen_tcp:close(Socket));
        Error ->
            ?Log(Error)
    end.
