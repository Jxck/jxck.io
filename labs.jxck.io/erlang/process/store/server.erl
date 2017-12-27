-module(server).

-include("../../logger.hrl").

-compile(export_all).

start(Module, State) ->
    ?Log(spawn(?MODULE, loop, [Module | State])).

loop(Module, State) ->
    ?Log(Module, State),
    receive
        Message ->
            ?Log(Message),
            NewState = Module:handle(Message, State),
            ?Log(NewState),
            loop(Module, NewState)
    end.

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

reply({PID, Ref}, Reply) ->
    PID ! {Ref, Reply}.
