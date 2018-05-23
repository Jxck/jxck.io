#!/usr/bin/env escript
-module(gen_udp_server).

-mode(compile).
-compile(export_all).

-define(NUM_POOL, 10).
-include("../logger.hrl").

%-behaviour(gen_server).

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

handle_info({udp, Socket, IP, Port, Packet}, #{socket := Socket}=State) ->
    ?Log(Packet, State),
    ok = inet:setopts(Socket, [{active, once}, binary]),
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
    % gen_tcp:controlling_process してからじゃないと取りこぼすので
    % ここでは {active, false} にしておく
    {ok, Socket} = ?Log(gen_udp:open(3000, [{reuseaddr, true}, {active, false}])),
    % accepter を複数起動、本来は supervisor でやる
    {ok, PID} = ?Log(start_link(Socket)),
    ok = gen_tcp:controlling_process(Socket, PID),
    ok = inet:setopts(Socket, [{active, once}, binary]),
    receive
        stop -> gen_tcp:close(Socket)
    end.

%% 複数起動できるように名前はつけない
start_link(Socket) ->
    gen_server:start_link(?MODULE, Socket, []).
