#!/usr/bin/env escript
-module(store).
-mode(compile).
-compile(export_all).

-include("../logger.hrl").

-behaviour(gen_fsm).

-define(SERVER, ?MODULE).

main([]) ->
    ?Log(start_link(fsm)),
    ?Log(sync_next(fsm)),
    ?Log(sync_next(fsm)),
    ?Log(sync_next(fsm)),
    ?Log(sync_next(fsm)),
    ?Log(sync_reset(fsm)),
    ?Log(next(fsm)),
    ?Log(next(fsm)),
    ?Log(next(fsm)),
    ?Log(reset(fsm)),
    ok.

start_link(MachineName) ->
    gen_fsm:start_link({global, MachineName}, ?MODULE, [], []).

next(MachineName) ->
    gen_fsm:send_event({global, MachineName}, next).

sync_next(MachineName) ->
    gen_fsm:sync_send_event({global, MachineName}, next).

reset(MachineName) ->
    gen_fsm:send_all_state_event({global, MachineName}, reset).

sync_reset(MachineName) ->
    gen_fsm:sync_send_all_state_event({global, MachineName}, reset).

init([]) ->
    State = #{count => 0},
    {ok, first_state, State}.

%-----------------------------------------------------------------------------------
% Async events.
%-----------------------------------------------------------------------------------
first_state(next, #{count := N} = State) ->
    io:format("First state...~n"),
    {next_state, second_state, State#{count := N + 1}}.

second_state(next, #{count := N} = State) ->
    io:format("Second state...~n"),
    {next_state, third_state, State#{count := N + 1}}.

third_state(next, #{count := N} = State) ->
    io:format("Third state...~n"),
    {next_state, first_state, State#{count := N + 1}}.

%-----------------------------------------------------------------------------------
% Sync events.
%-----------------------------------------------------------------------------------
first_state(Event, _From, State) ->
    {next_state, NextState, NewState} = first_state(Event, State),
    {reply, maps:get(count, NewState), NextState, NewState}.

second_state(Event, _From, State) ->
    {next_state, NextState, NewState} = second_state(Event, State),
    {reply, maps:get(count, NewState), NextState, NewState}.

third_state(Event, _From, State) ->
    {next_state, NextState, NewState} = third_state(Event, State),
    {reply, maps:get(count, NewState), NextState, NewState}.

%-----------------------------------------------------------------------------------
% Async events (All).
%-----------------------------------------------------------------------------------
handle_event(reset, _StateName, _State) ->
    io:format("Async reset...~n"),
    {next_state, first_state, #{count => 0}}.

%-----------------------------------------------------------------------------------
% Sync events (All).
%-----------------------------------------------------------------------------------
handle_sync_event(reset, _From, _StateName, _State) ->
    io:format("Sync reset...~n"),
    {reply, 0, first_state, #{count => 0}}.

%-----------------------------------------------------------------------------------
% Regular OTP messages.
%-----------------------------------------------------------------------------------
handle_info(_Info, StateName, State) ->
    {next_state, StateName, State}.

terminate(_Reason, _StateName, _State) ->
    ok.

code_change(_OldVsn, StateName, State, _Extra) ->
    {ok, StateName, State}.
