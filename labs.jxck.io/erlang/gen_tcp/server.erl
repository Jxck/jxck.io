#!/usr/bin/env escript
-module(server).

-export([
         main/1
        ]).

-define(NUM_POOL, 10).
-include("../logger.hrl").

%% {active, true} : 何もしなくてもメッセージ上がる、流量の制限ができないので DOS の心配がある
%% {active, false}: gen_tcp:recv() しないと、メッセージを取しない
%% {active, once} : 1 つだけ受信し、処理が終わってから再度 inet:setopts すればまたメッセージが上がる
main(_) ->
    % gen_tcp:controlling_process してからじゃないと取りこぼすので
    % ここでは {active, false} にしておく
    {ok, Listen} = ?Log(gen_tcp:listen(3000, [{reuseaddr, true}, {active, false}])),

    % 同じ ListeningSocket を同時に複数プロセスから accept 待ちできるので
    % 複数プロセス同時に accept を待つ。
    [spawn(fun() -> accept_loop(Listen) end) || _ <- lists:seq(1, ?NUM_POOL)],
    receive
        stop -> gen_tcp:close(Listen)
    end.

%% 接続待ちのループ
accept_loop(Listen) ->
    ?Log(wait, for, accept),
    {ok, Socket} = ?Log(gen_tcp:accept(Listen)),

    % このプロセスで accept した socket へのメッセージはここに来る。
    % receive_loop は別プロセスで再起し、制御を移譲する。
    % ここのパケットを取りこぼさないように {active, false}
    PID = spawn(fun() -> receive_loop(Socket) end),
    gen_tcp:controlling_process(Socket, PID),
    % 制御が移ってるので {active, once} で受信
    ok = inet:setopts(Socket, [binary, {active, once}]),

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
        {tcp_error, Socket, Reason} ->
            ?Log({tcp_error, Socket, Reason}),
            ?Log(gen_tcp:close(Socket));
        Error ->
            ?Log(Error)
    end.
