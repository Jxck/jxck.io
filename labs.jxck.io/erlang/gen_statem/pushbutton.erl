#!/usr/bin/env escript
-module(pushbutton).

-mode(compile).
-compile(export_all).
-behaviour(gen_statem).
-include("../logger.hrl").

start() ->
    gen_statem:start({local, ?MODULE}, ?MODULE, [], []).

push() ->
    gen_statem:call(?MODULE, push).

get_count() ->
    gen_statem:call(?MODULE, get_count).

stop() ->
    gen_statem:stop(?MODULE).


init([]) ->
    {ok, off, 0}.

callback_mode() ->
    state_functions.

off({call, From}, push, Data) ->
    {next_state, on, Data+1, [{reply, From, on}]};

off(EventType, EventContent, Data) ->
    handle_event(EventType, EventContent, Data).


on({call, From}, push, Data) ->
    {next_state, off, Data, [{reply, From, off}]};

on(EventType, EventContent, Data) ->
    handle_event(EventType, EventContent, Data).


handle_event({call, From}, get_count, Data) ->
    {keep_state, Data, [{reply, From, Data}]};

handle_event(_, _, Data) ->
    {keep_state, Data}.


terminate(_Reason, _State, _Data) ->
    void.

code_change(_Vsn, State, Data, _Extra) ->
    {ok, State, Data}.


main([]) ->
    main().

main() ->
    ?Log(start()),
    ?Log(push()),
    ?Log(push()),
    ?Log(get_count()),
    ?Log(push()),
    ?Log(stop()).
