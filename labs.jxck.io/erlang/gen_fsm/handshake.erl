#!/usr/bin/env escript
-module(handshake).
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
%   |                                     | listening
%   | Client Hello                        |
%   |------------------------------------>|
%   |                                     |
%   |                         ServerHello |
%   |<------------------------------------|
%   |                                     |
%   |                         Certificate |
%   |<------------------------------------|
%   |                                     |
%   |                     ServerHelloDone |
%   |<------------------------------------|
%   |                                     | server_hello_done
%   | ClientKeyEx                         |
%   |------------------------------------>|
%   |                                     | client_key_ex
%   | ChangeCipherSpec                    |
%   |------------------------------------>|
%   |                                     | change_cipher_spec
%   | Finished                            |
%   |------------------------------------>|
%   |                                     |
%   |                    ChangeCipherSpec |
%   |<------------------------------------|
%   |                                     |
%   |                            Finished |
%   |<------------------------------------|
%   |                                     | finished
%   |            Application              |
%   |<----------------------------------->|
%
init([]) ->
    State = [],
    {ok, listening, State}.

% async events
handle_event(EventName, StateName, State) ->
    ?Log(EventName, StateName, State),
    {stop, "Unsupported", State}.

% sync events
handle_sync_event(Event, From, StateName, State) ->
    ?Log(Event, From, StateName, State),
    ok.

handle_info(Info, StateName, State) ->
    ?Log(Info, StateName, State),
    ok.

terminate(Reason, StateName, State) ->
    ?Log(Reason, StateName, State),
    ok.

code_change(_OldVsn, StateName, State, _Extra) ->
    {ok, StateName, State}.


listening(#{type := client_hello}, _From, State) ->
    ?Log(">>", client_hello),
    ?Log("<<", server_hello),
    ?Log("<<", certificate),
    ?Log("<<", server_hello_done),
    {reply, next_state, server_hello_done, State}.

server_hello_done(#{type := client_key_exchange}, _From, State) ->
    ?Log(">>", client_key_exchange),
    {reply, next_state, client_key_exchange, State}.

client_key_exchange(#{type := change_cipher_spec}, _From, State) ->
    ?Log(">>", change_cipher_spec),
    {reply, next_state, change_cipher_spec, State}.

change_cipher_spec(#{type := finished}, _From, State) ->
    ?Log(">>", finished),
    ?Log("<<", change_cipher_spec),
    ?Log("<<", finished),
    {reply, next_state, finished, State}.

finished(#{type := application}, _From, State) ->
    ?Log(">>", application),
    ?Log("<<", application),
    {reply, next_state, finished, State}.


% main
start() ->
    gen_fsm:start_link({local, server}, ?MODULE, [], []).

main([]) ->
    (gen_fsm:start_link({local, server}, ?MODULE, [], [])),
    (gen_fsm:sync_send_event(server, #{type => client_hello})),
    (gen_fsm:sync_send_event(server, #{type => client_key_exchange})),
    (gen_fsm:sync_send_event(server, #{type => change_cipher_spec})),
    (gen_fsm:sync_send_event(server, #{type => finished})),
    (gen_fsm:sync_send_event(server, #{type => application})),
    (gen_fsm:sync_send_event(server, #{type => application})),
    (gen_fsm:sync_send_event(server, #{type => application})),
    (gen_fsm:sync_send_event(server, #{type => application})),
    ok.
