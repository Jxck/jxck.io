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
    {ok, Socket} = ?Log(gen_udp:open(3000, [binary, {active, once}])),
    receive_loop(Socket).

%% 受信ループ
receive_loop(Socket) ->
    receive
        {udp, Socket, IP, Port, Data} ->
            ?Log(Data, from, IP, Port),
            gen_udp:send(Socket, IP, Port, Data),
            inet:setopts(Socket, [{active, once}]),
            receive_loop(Socket);
        Error ->
            ?Log(Error)
    end.
