#!/usr/bin/env escript
-module(gen_tcp_server).

-mode(compile).
-compile(export_all).

-include("../logger.hrl").

-behaviour(gen_server).

%% Callback
% gen_server module            Callback module
% -----------------            ---------------
% gen_server:start
% gen_server:start_link -----> Module:init/1
%
% gen_server:stop       -----> Module:terminate/2
%
% gen_server:call
% gen_server:multi_call -----> Module:handle_call/3
%
% gen_server:cast
% gen_server:abcast     -----> Module:handle_cast/2
%
% -                     -----> Module:handle_info/2
%
% -                     -----> Module:terminate/2
%
% -                     -----> Module:code_change/3
init(Socket) ->
    ?Log(Socket),
    State = #{socket => Socket},
    {ok, State}.

handle_call(Msg, From, State) ->
    ?Log(Msg, From, State),
    {reply, Msg, State}.

handle_cast(Msg, State) ->
    ?Log(Msg, State),
    {noreply, State}.

handle_info({tcp, Socket, Data}, State) ->
    ?Log(Data, from, Socket),
    gen_tcp:send(Socket, Data),
    inet:setopts(Socket, [{active, once}]),
    {noreply, State};

handle_info({tcp_closed, Socket}, State) ->
    ?Log({tcp_closed, Socket}),
    ?Log(gen_tcp:close(Socket)),
    {stop, normal, maps:remove(socket, State)};

handle_info({tcp_error, Socket, Reason}, State) ->
    ?Log({tcp_error, Socket, Reason}),
    ?Log(gen_tcp:close(Socket)),
    {stop, normal, maps:remove(socket, State)};

handle_info(Msg, State) ->
    ?Log(Msg, State),
    {noreply, State}.

code_change(OldVsn, State, Extra) ->
    ?Log(OldVsn, Extra),
    {ok, State}.

terminate(Reason, State) ->
    ?Log(Reason, State),
    ok.


%% {active, true} : 何もしなくてもメッセージ上がる、流量の制限ができないので DOS の心配がある
%% {active, false}: gen_tcp:recv() しないと、メッセージを取しない
%% {active, once} : 1 つだけ受信し、処理が終わってから再度 inet:setopts すればまたメッセージが上がる
main([]) ->
    {ok, Listen} = ?Log(gen_tcp:listen(3000, [{reuseaddr, true}, {active, once}, binary])),
    accept_loop(Listen).

%% 接続待ちのループ
%% このプロセスで accept した socket へのメッセージは
%% このプロセスに来てしまうので、制御プロセスを移譲する。
%% メッセージは gen_server でハンドリング
accept_loop(Listen) ->
    {ok, Socket} = ?Log(gen_tcp:accept(Listen)),
    {ok, PID} = ?Log(start_link(Socket)),
    gen_tcp:controlling_process(Socket, PID),
    accept_loop(Listen).

%% 複数起動できるように名前はつけない
start_link(Socket) ->
    gen_server:start_link(?MODULE, Socket, []).
