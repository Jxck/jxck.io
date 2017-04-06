#!/usr/bin/env escript
-module(store).
-mode(compile).
-compile(export_all).

-include("../logger.hrl").

store(State) ->
    receive
        {PID, save, {Key, Value}} ->
            ?Log({Key, Value}),
            NewState = State#{Key => Value},
            ?Log(NewState),
            PID ! ok,
            store(NewState);
        {PID, take, Key} ->
            ?Log(Key),
            PID ! maps:get(Key, State),
            store(State);

        Unknown ->
            ?Log(Unknown),
            store(State)
    end.

save(PID, Key, Value) ->
    PID ! {self(), save, {Key, Value}},
    receive
        Message -> ?Log(Message)
    end.

take(PID, Key) ->
    PID ! {self(), take, Key},
    receive
        Message -> ?Log(Message)
    end.

main(_) ->
    PID = ?Log(spawn(?MODULE, store, [#{}])),
    ?Log(save(PID, a, 10)),
    ?Log(save(PID, b, 20)),
    ?Log(take(PID, a)),
    ?Log(take(PID, b)).
