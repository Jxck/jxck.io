#!/usr/bin/env escript
-module(client).

-export([
         main/1
        ]).

-include("../logger.hrl").

%% accept が無い以外は tcp と同じ
%% port は 0 にすると ephemeral
main(_) ->
    {ok, Socket} = ?Log(gen_udp:open(0, [binary])),

    PID = spawn(fun() -> receive_loop(Socket) end),
    gen_tcp:controlling_process(Socket, PID),

    send_loop(Socket).

%% コンソールから入力を受け取り送信
send_loop(Socket) ->
    {ok, [Msg]} = io:fread("> ", "~s"),
    gen_udp:send(Socket, {127,0,0,1}, 3000, Msg),
    send_loop(Socket).

%% 受信
receive_loop(Socket) ->
    receive
        {udp, Socket, _IP, _Port, Data} ->
            ?Log(Data),
            receive_loop(Socket);
        Error ->
            ?Log(Error)
    after
        5000 ->
            ?Log(close),
            gen_udp:close(Socket)
    end.
