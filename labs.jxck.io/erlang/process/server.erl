-module(server).

-include("../logger.hrl").

-export([
         start/1,
         loop/2,
         call/2
        ]).

start(Module) ->
    PID = ?Log(spawn(?MODULE, loop, [Module, Module:init()])),
    register(server, PID).

loop(Module, State) ->
    receive
        {call, From, Req} ->
            ?Log({call, From, Req}),
            {reply, Value, NewState} = ?Log(Module:handle_call(Req, From, State)),
            From ! Value,
            loop(Module, NewState)
    end.

call(Module, Req) ->
    server ! {call, self(), Req},
    receive
        Reply ->
            ?Log(Reply)
    end.
