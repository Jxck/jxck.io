-module(store).

-include("../logger.hrl").

-export([
         init/0,
         handle_call/3
        ]).

init() ->
    State = #{},
    State.

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
