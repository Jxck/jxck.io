#!/usr/bin/env escript
-module(fsm).
-mode(compile).
-compile(export_all).

-include("../logger.hrl").

-behaviour(gen_fsm).

% gen_fsm module                    Callback module
% --------------                    ---------------
% gen_fsm:start
% gen_fsm:start_link                -----> Module:init/1
%
% gen_fsm:stop                      -----> Module:terminate/3
%
% gen_fsm:send_event                -----> Module:StateName/2
%
% gen_fsm:send_all_state_event      -----> Module:handle_event/3
%
% gen_fsm:sync_send_event           -----> Module:StateName/3
%
% gen_fsm:sync_send_all_state_event -----> Module:handle_sync_event/4
%
% -                                 -----> Module:handle_info/3
%
% -                                 -----> Module:terminate/3
%
% -                                 -----> Module:code_change/4
init([]) ->
    State = #{count => 0},
    {ok, first_state, State}.

% async events
handle_event(reset, _StateName, _State) ->
    ?Log("Async reset..."),
    {next_state, first_state, #{count => 0}}.

% sync events
handle_sync_event(reset, _From, _StateName, _State) ->
    ?Log("Sync reset..."),
    {reply, 0, first_state, #{count => 0}}.

handle_info(_Info, StateName, State) ->
    {next_state, StateName, State}.

terminate(_Reason, _StateName, _State) ->
    ok.

code_change(_OldVsn, StateName, State, _Extra) ->
    {ok, StateName, State}.


% Async events.
first_state(next, #{count := N} = State) ->
    ?Log("First state..."),
    {next_state, second_state, State#{count := N + 1}}.

second_state(next, #{count := N} = State) ->
    ?Log("Second state..."),
    {next_state, third_state, State#{count := N + 1}}.

third_state(next, #{count := N} = State) ->
    ?Log("Third state..."),
    {next_state, first_state, State#{count := N + 1}}.

% Sync events.
first_state(next, _From, State) ->
    {next_state, NextState, NewState} = first_state(next, State),
    {reply, maps:get(count, NewState), NextState, NewState}.

second_state(next, _From, State) ->
    {next_state, NextState, NewState} = second_state(next, State),
    {reply, maps:get(count, NewState), NextState, NewState}.

third_state(next, _From, State) ->
    {next_state, NextState, NewState} = third_state(next, State),
    {reply, maps:get(count, NewState), NextState, NewState}.


% main
start_link() ->
    gen_fsm:start_link({local, fsm}, ?MODULE, [], []).

next() ->
    gen_fsm:send_event(fsm, next).

sync_next() ->
    gen_fsm:sync_send_event(fsm, next).

reset() ->
    gen_fsm:send_all_state_event(fsm, reset).

sync_reset() ->
    gen_fsm:sync_send_all_state_event(fsm, reset).

main([]) ->
    ?Log(start_link()),
    ?Log(sync_next()),
    ?Log(sync_next()),
    ?Log(sync_next()),
    ?Log(sync_next()),
    ?Log(sync_reset()),
    ?Log(next()),
    ?Log(next()),
    ?Log(next()),
    ?Log(reset()),
    ok.
