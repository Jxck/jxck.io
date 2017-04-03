#!/usr/bin/env escript
-module(store).
-mode(compile).
-compile(export_all).

-include("../logger.hrl").

-behaviour(gen_server).

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
main(_) ->
    ?Log(start_link()),
    save(a, 10),
    save(b, 20),
    take(a),
    take(b).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

save(Key, Value) ->
    gen_server:call(?MODULE, {save, {Key, Value}}).

take(Key) ->
    gen_server:call(?MODULE, {take, Key}).


%% Callback
init(_Args) ->
    State = #{},
    {ok, State}.

handle_call({save, {Key, Value}}, _From, State) ->
    ?Log(Key, Value, State),
    NewState = State#{Key => Value},
    ?Log(NewState),
    {reply, ok, NewState};

handle_call({take, Key}, _From, State) ->
    ?Log(Key, State),
    Value = maps:get(Key, State),
    ?Log(Value),
    {reply, Value, State}.

handle_cast(Msg, State) ->
    ?Log(Msg),
    {noreply, State}.

handle_info(Msg, State) ->
    ?Log(Msg),
    {noreply, State}.

code_change(OldVsn, State, Extra) ->
    ?Log(OldVsn, Extra),
    {ok, State}.

terminate(Reason, State) ->
    ?Log(Reason, State),
    ok.
