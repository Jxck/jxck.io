#!/usr/bin/env escript
-module(main).
-mode(compile).
-compile(export_all).

-include("../logger.hrl").

-behaviour(gen_event).


init(Args) ->
    ?Log(Args),
    {ok, Args}.

handle_event({K, V}, State) ->
    ?Log({K, V}, State),
    {ok, State#{K => V}}.

handle_call(Msg, State) ->
    ?Log(Msg, State),
    {noreply, State}.

handle_info(Msg, State) ->
    ?Log(Msg, State),
    {noreply, State}.

code_change(OldVsn, State, Extra) ->
    ?Log(OldVsn, State, Extra),
    {ok, State}.

terminate(Reason, State) ->
    ?Log(Reason, State),
    ok.

main(_) ->
    ?Log(),
    gen_event:start_link({local, events}, [{debug, [trace]}]),
    gen_event:add_handler(events, main, #{}),
    gen_event:notify(events, {a, 1}),
    gen_event:notify(events, {b, 2}),
    gen_event:notify(events, {c, 3}),
    gen_event:stop(events).
