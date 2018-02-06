%#!/usr/bin/env escript
%-mode(compile).
%-compile(export_all).

%%% OTP デザインに準拠した設計
-module(server).

-export([
         main/0,
         add/1,
         list/0,
         start_link/2,
         init/3,
         loop/3,
         system_continue/3,
         system_terminate/4,
         system_get_state/1,
         system_replace_state/2,
         system_code_change/4,
         debug/3
        ]).

-include("../logger.hrl").

main() ->
    State = [],
    DebugOpt = [log, trace, statistics],

    {ok, _Pid} = ?Log(start_link(State, DebugOpt)),

    server:add("a"),
    server:add("b"),
    server:add("c"),

    ?Log(sys:get_state(?MODULE)),
    ?Log(sys:get_status(?MODULE)),
    ?Log(sys:replace_state(?MODULE, fun lists:reverse/1)),
    server:list(),

    sys:suspend(?MODULE),
    % ここで止めてコードを修正すると
    % コンパイル/ロードされ置き換わる
    compile:file(?MODULE),
    code:purge(?MODULE),
    code:load_file(?MODULE),
    sys:change_code(?MODULE, ?MODULE, [], []),
    sys:resume(?MODULE),

    server:add("d"),
    server:add("e"),
    server:add("f"),

    ?Log(sys:statistics(?MODULE, get)),

    receive
        N ->
            ?Log(N),
            ?Log(sys:terminate(server, normal))
    end,
    ok.


add(N) ->
    ?MODULE ! {self(), add, N}.

list() ->
    ?MODULE ! {self(), list}.

%% 同期でプロセスを spawn し ack を待つ
start_link(State, DebugOpt) ->
    proc_lib:start_link(?MODULE, init, [self(), State, DebugOpt]).

%% ack を非同期に返しつつ loop を回す
init(Parent, State, DebugOpt) ->
    ?Log(Parent, self(), State),
    true = register(?MODULE, self()),
    Debug = ?Log(sys:debug_options(DebugOpt)),
    ok = proc_lib:init_ack(Parent, {ok, self()}),
    ?MODULE:loop(Parent, Debug, []).

%% main loop, system message も処理する。
loop(Parent, Debug, State) ->
    receive
        {system, From, Request} ->
            sys:handle_debug(Debug, fun ?MODULE:debug/3, ?MODULE, {system, From, Request}),
            sys:handle_system_msg(Request, From, Parent, ?MODULE, Debug, State);
        {'EXIT', Parent, Reason} ->
            sys:handle_debug(Debug, fun ?MODULE:debug/3, ?MODULE, {'EXIT', Parent, Reason}),
            cleanup(State),
            exit(Reason);
        {_From, add, N} ->
            sys:handle_debug(Debug, fun ?MODULE:debug/3, ?MODULE, {in, add, N}),
            NextState = [N|State],
            ?MODULE:loop(Parent, Debug, NextState);
        {From, list} ->
            sys:handle_debug(Debug, fun ?MODULE:debug/3, ?MODULE, {in, list}),
            sys:handle_debug(Debug, fun ?MODULE:debug/3, ?MODULE, {out, State}),
            From ! State,
            ?MODULE:loop(Parent, Debug, State)
    end.

cleanup(_) ->
    ok.

%% sys:handle_debug() callback
debug(Device, Event, Extra) ->
    io:format(Device, ">>> [~p] ~p~n", [Extra, Event]).

%% sys:resume callback
system_continue(Parent, Debug, State) ->
    ?Log(Parent, State),
    ?MODULE:loop(Parent, Debug, State).

%% sys:terminate callback
system_terminate(Reason, Parent, Debug, State) ->
    ?Log(Reason, Parent, Debug, State),
    exit(Reason).

%% sys:get_state callback
system_get_state(State) ->
    ?Log(State),
    {ok, State}.

%% sys:replace_state callback
system_replace_state(StateFun, State) ->
    NextState = ReturnState = StateFun(State),
    ?Log(StateFun, State, NextState),
    {ok, NextState, ReturnState}.

%% sys:change_code
system_code_change(State, Module, OldVsn, Extra) ->
    ?Log(State, Module, OldVsn, Extra),
    {ok, State}.
