#!/usr/bin/env escript
-module(server).

-export([
         main/1
        ]).

-include("../logger.hrl").

%% {active, true} : 何もしなくてもメッセージ上がる、流量の制限ができないので DOS の心配がある
%% {active, false}: gen_tcp:recv() しないと、メッセージを取しない
%% {active, once} : 1 つだけ受信し、処理が終わってから再度 inet:setopts すればまたメッセージが上がる
main(_) ->
    connect_loop(3000).


connect_loop(P) ->
    {ok, Socket} = (gen_udp:open(P, [binary, {active, once}])),
    receive
        {udp, Socket, IP, Port, Data} ->
            ok = gen_udp:connect(Socket, IP, Port),
            PID = spawn(fun() -> receive_loop(Socket) end),
            PID ! {udp, Socket, IP, Port, Data},
            ok = gen_tcp:controlling_process(Socket, PID),
            connect_loop(P+1)
    end.

%% 受信ループ
receive_loop(Socket) ->
    receive
        {udp, Socket, IP, Port, Data} ->
            ?Log(Data, from, IP, Port),
            gen_udp:send(Socket, IP, Port, Data),
            inet:setopts(Socket, [{active, true}]),
            receive_loop(Socket);
        Error ->
            ?Log(Error)
    end.
