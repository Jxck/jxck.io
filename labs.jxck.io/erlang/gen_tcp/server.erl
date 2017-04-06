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
    {ok, Listen} = ?Log(gen_tcp:listen(3000, [{reuseaddr, true}, {active, once}, binary])),
    accept_loop(Listen).

%% 接続待ちのループ
%% このプロセスで accept した socket へのメッセージは
%% このプロセスに来てしまうので、制御プロセスを移譲する。
accept_loop(Listen) ->
    {ok, Socket} = ?Log(gen_tcp:accept(Listen)),
    PID = spawn(fun() -> receive_loop(Socket) end),
    gen_tcp:controlling_process(Socket, PID),
    accept_loop(Listen).

%% 単一のソケットを制御するループ
receive_loop(Socket) ->
    receive
        {tcp, Socket, Data} ->
            ?Log(Data, from, Socket),
            gen_tcp:send(Socket, Data),
            inet:setopts(Socket, [{active, once}]),
            receive_loop(Socket);
        {tcp_closed, Socket} ->
            ?Log({tcp_closed, Socket}),
            ?Log(gen_tcp:close(Socket));
        Error ->
            ?Log(Error)
    end.
