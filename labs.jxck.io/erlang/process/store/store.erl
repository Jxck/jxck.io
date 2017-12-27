-module(store).
-include("../../logger.hrl").

-compile(export_all).

handle({From, {save, Key, Value}}, State) ->
    ?Log({save, Key, Value}, State),
    server:reply(From, ok),
    State#{Key => Value};

handle({From, {take, Key}}, State) ->
    ?Log({take, Key}),
    server:reply(From, maps:take(Key, State)),
    State;

handle(Unknown, State) ->
    ?Log(Unknown, State).
