#!/usr/bin/env escript
-module(main).
-mode(compile).
-compile(export_all).

-include("../logger.hrl").

-behaviour(gen_event).



init(_Args) ->
    {ok, []}.

handle_event(Msg, State) ->
    ?Log(Msg, State),
    {ok, State}.

handle_call(Msg, State) ->
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

main(_) ->
    gen_event:start_link({local, events}),
    gen_event:add_handler(events, main, []),
    gen_event:notify(events, no_reply),
    gen_event:stop(events).
