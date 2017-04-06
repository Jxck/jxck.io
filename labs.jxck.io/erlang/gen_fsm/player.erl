#!/usr/bin/env escript
-module(store).
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
%
%
%                        +------------------+
%           +----------->|                  |
%           |            |    forwarding    |
% forward() |      +-----|                  |
%           |      |     +------------------+
%           |      |
%           |      | stop()
%           |      |
%           |      v
%     +------------------+      paly()       +------------------+
%     |                  |+----------------->|                  |
%     |     stopped      |                   |      playing     |
%     |                  |<------------------|                  |
%     +------------------+      stop()       +------------------+
%           |      ^
%           |      |
%           |      | stop()
%           |      |
%           |      |     +------------------+
%    back() |      +-----|                  |
%           |            |     backing      |
%           +----------->|                  |
%                        +------------------+
init([]) ->
    State = #{history => []},
    {ok, stopped, State}.

% async events
handle_event(EventName, StateName, State) ->
    ?Log(EventName, StateName, State),
    {next_state, stopped, State}.

% sync events
handle_sync_event(reset, _From, StateName, #{history := History}) ->
    ?Log("=== reset ==="),
    ?Log("current state", StateName),
    ?Log(lists:reverse(History)),
    {reply, ok, stopped, #{history => []}}.

handle_info(_Info, StateName, State) ->
    {next_state, StateName, State}.

terminate(_Reason, _StateName, _State) ->
    ok.

code_change(_OldVsn, StateName, State, _Extra) ->
    {ok, StateName, State}.


% Async events.
stopped(play, _From, #{history := History} = State) ->
    {reply, "playing...", playing, State#{history := [play|History]}};

stopped(forward, _From, #{history := History} = State) ->
    {reply, "forwarding...", forwarding, State#{history := [forward|History]}};

stopped(back, _From, #{history := History} = State) ->
    {reply, "backing...", backing, State#{history := [back|History]}}.


playing(stop, _From, #{history := History} = State) ->
    {reply, "stopped...", stopped, State#{history := [stop|History]}}.


forwarding(stop, _From, #{history := History} = State) ->
    {reply, "stopped...", stopped, State#{history := [stop|History]}}.


backing(stop, _From, #{history := History} = State) ->
    {reply, "stopped...", stopped, State#{history := [stop|History]}}.


% main
start() ->
    gen_fsm:start_link({local, player}, ?MODULE, [], []).

play() ->
    gen_fsm:sync_send_event(player, play).

stop() ->
    gen_fsm:sync_send_event(player, stop).

forward() ->
    gen_fsm:sync_send_event(player, forward).

back() ->
    gen_fsm:sync_send_event(player, back).

reset() ->
    %% 全ステートに投げる
    gen_fsm:sync_send_all_state_event(player, reset).

main([]) ->
    ?Log(start()),
    ?Log(play()),
    ?Log(stop()),
    ?Log(forward()),
    ?Log(stop()),
    ?Log(back()),
    ?Log(stop()),
    ?Log(reset()),
    ok.
