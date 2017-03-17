#!/usr/bin/env escript
-module(message).
-compile(export_all).

-define(Log(A), (fun(P) -> io:format("[~p:~p#~p] ~p~n", [?MODULE, ?FUNCTION_NAME, ?LINE, P]), P end)(A)).

store(State) ->
    receive
        {PID, save, {Key, Value}} ->
            ?Log({Key, Value}),
            NewState = State#{Key => Value},
            ?Log(NewState),
            PID ! ok,
            store(NewState);
        {PID, get, Key} ->
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

get(PID, Key) ->
    PID ! {self(), get, Key},
    receive
        Message -> ?Log(Message)
    end.

main(_) ->
    PID = spawn(?MODULE, store, [#{}]),
    save(PID, a, 10),
    save(PID, b, 20),
    get(PID, a),
    get(PID, b).
