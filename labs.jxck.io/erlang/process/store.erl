#!/usr/bin/env escript
-module(store).
-mode(compile).
-compile(export_all).

-include("../logger.hrl").

start(State) ->
    ?Log(spawn(?MODULE, loop, State)).

loop(State) ->
    ?Log(State),
    receive
        Message ->
            ?Log(Message),
            NewState = handle(Message, State),
            loop(NewState)
    end.


handle({From, {save, Key, Value}}, State) ->
    ?Log({save, Key, Value}),
    reply(From, ok),
    State#{Key => Value};

handle({From, {take, Key}}, State) ->
    ?Log({take, Key}),
    reply(From, maps:take(Key, State)),
    State;

handle(Unknown, State) ->
    ?Log(Unknown, State).


reply({PID, Ref}, Reply) ->
    PID ! {Ref, Reply}.



save(PID, Key, Value) ->
    call(PID, {save, Key, Value}, [{timeout, 1000}]).

take(PID, Key) ->
    call(PID, {take, Key}, [{timeout, 1000}]).

call(PID, Message, [{timeout, Timeout}]) ->
    Ref = erlang:monitor(process, PID),
    PID ! {{self(), Ref}, Message},
    receive
        {Ref, Reply} ->
            ?Log(Reply),
            erlang:demonitor(Ref, [flush]),
            Reply;
        {'DOWN', Ref, process, PID, Reason} ->
            erlang:error(Reason)
    after Timeout ->
              erlang:error(timeout)
    end.




main(_) ->
    PID = start([#{}]),
    ?Log(save(PID, a, 10)),
    ?Log(save(PID, b, 20)),
    ?Log(take(PID, a)),
    ?Log(take(PID, b)).
