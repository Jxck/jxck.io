%#!/usr/bin/env escript
%-mode(compile).
%-compile(export_all).

-module(tcp).

-export([
         main/0,
         start_link/2,
         init/3,
         stop/0,
         accept/3,
         handle_connection/1,
         handle_system_msg/3,
         recv_loop/1,

         system_continue/3,
         system_terminate/4,
         system_get_state/1,
         system_replace_state/2,
         system_code_change/4,
         debug/3
        ]).

-include("../logger.hrl").

main() ->
    State = #{
      port      => 3000,
      listenopt => [binary,
                    {active, false},
                    {packet, line},
                    {reuseaddr, true}
                   ]
     },
    DebugOpt = [log, trace, statistics],
    start_link(State, DebugOpt).

start_link(State, DebugOpt) ->
    proc_lib:start_link(?MODULE, init, [self(), State, DebugOpt]).

stop() ->
    sys:terminate(?MODULE, normal).

init(Parent, #{port := Port, listenopt := ListenOpt}=State, DebugOpt) ->
    ?Log(Parent, self(), State),
    true = register(?MODULE, self()),
    Debug = ?Log(sys:debug_options(DebugOpt)),
    case ?Log(gen_tcp:listen(Port, ListenOpt)) of
        {ok, ListenSocket} ->
            ok = proc_lib:init_ack(Parent, {ok, self()}),
            ?MODULE:accept(Parent, Debug, State#{listensocket => ListenSocket});
        {error, Reason} ->
            proc_lib:init_ack(Parent, {error, Reason}),
            error
    end.

accept(Parent, Debug, #{listensocket := ListenSocket}=State) ->
    ?Log(State),
    {ok, Socket} = gen_tcp:accept(ListenSocket),
    ?Log(spawn_link(?MODULE, handle_connection, [Socket])),
    ?MODULE:handle_system_msg(Parent, Debug, State),
    ?MODULE:accept(Parent, Debug, State).

handle_system_msg(Parent, Debug, State) ->
    receive
        {system, From, Request} ->
            sys:handle_debug(Debug, fun ?MODULE:debug/3, ?MODULE, {system, From, Request}),
            sys:handle_system_msg(Request, From, Parent, ?MODULE, Debug, State);
        {'EXIT', Parent, Reason} ->
            sys:handle_debug(Debug, fun ?MODULE:debug/3, ?MODULE, {'EXIT', Parent, Reason}),
            cleanup(State),
            exit(Reason);
        Message ->
            ?Log("Unexpected Message", Message),
            ?MODULE:handle_system_msg(Parent, Debug, State)
    after 0 ->
              ok
    end.


recv_loop(Socket) ->
    ?Log(Socket),
    case ?Log(gen_tcp:recv(Socket, 0)) of
        {error, closed} ->
            ok;
        {ok, <<"bye\n">>} ->
            gen_tcp:send(Socket, <<"byeeeeeeeee\n">>),
            gen_tcp:close(Socket);
        {ok, Msg} ->
            gen_tcp:send(Socket, Msg),
            ?MODULE:recv_loop(Socket)
    end.


cleanup(_) ->
    ok.

%% sys:handle_debug() callback
debug(Device, Event, Extra) ->
    io:format(Device, ">>> [~p] ~p~n", [Extra, Event]).


handle_connection(Socket) ->
    ?Log(Socket),
    gen_tcp:send(Socket, <<"hello\r\n">>),
    ?MODULE:recv_loop(Socket).


%% sys:resume callback
system_continue(Parent, Debug, State) ->
    ?Log(Parent, State),
    ?MODULE:accept(Parent, Debug, State).

%% sys:terminate callback
system_terminate(Reason, Parent, Debug, State) ->
    ?Log(Reason, Parent, Debug, State),
    exit(Reason).

%% sys:get_state callback
system_get_state(State) ->
    ?Log(State),
    {ok, State}.

%% sys:replace_state callback
system_replace_state(StateFun, State) ->
    NextState = ReturnState = StateFun(State),
    ?Log(StateFun, State, NextState),
    {ok, NextState, ReturnState}.

%% sys:change_code
system_code_change(State, Module, OldVsn, Extra) ->
    ?Log(State, Module, OldVsn, Extra),
    {ok, State}.

