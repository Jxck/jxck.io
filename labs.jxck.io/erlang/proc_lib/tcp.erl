%#!/usr/bin/env escript
%-mode(compile).
%-compile(export_all).

-module(tcp).

-export([
         main/0,
         start_link/2,
         init/3,
         stop/0,
         accept_loop/3,
         recv_loop/1,
         cleanup/1,

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
            [
             ?MODULE:accept_loop(Parent, Debug, State#{listensocket => ListenSocket})
             || _ <- lists:seq(0, 1000)
            ];
        {error, Reason} ->
            proc_lib:init_ack(Parent, {error, Reason}),
            error
    end.

accept_loop(Parent, Debug, #{listensocket := ListenSocket}=State) ->
    receive
        {system, From, Request} ->
            sys:handle_debug(Debug, fun ?MODULE:debug/3, ?MODULE, {system, From, Request}),
            sys:handle_system_msg(Request, From, Parent, ?MODULE, Debug, State);
        {'EXIT', Parent, Reason} ->
            sys:handle_debug(Debug, fun ?MODULE:debug/3, ?MODULE, {'EXIT', Parent, Reason}),
            ?MODULE:cleanup(State),
            exit(Reason);
        Message ->
            ?Log("Unexpected Message", Message),
            sys:handle_debug(Debug, fun ?MODULE:debug/3, ?MODULE, {unexpected, Message})
    after 0 ->
              case gen_tcp:accept(ListenSocket, 0) of
                  {ok, Socket} ->
                      ?Log(spawn_link(?MODULE, recv_loop, [Socket]));
                  {error, timeout} ->
                      ok
              end,
              ?MODULE:accept_loop(Parent, Debug, State)
    end.



recv_loop(Socket) ->
    %?Log(Socket),
    case (gen_tcp:recv(Socket, 0)) of
        {error, closed} ->
            gen_tcp:close(Socket);
        {ok, <<"bye\n">>} ->
            gen_tcp:send(Socket, <<"byeeeeeeeee\n">>),
            gen_tcp:close(Socket);
        {ok, <<"\r\n">>} ->
            gen_tcp:send(Socket, <<
"HTTP/1.1 200 OK\r\n"
"Content-Length: 1\r\n"
"Content-Type: text/plain\r\n"
"\r\n"
"a"
>>),

            gen_tcp:close(Socket);
        {ok, Msg} ->
            %?Log(Msg),
            ?MODULE:recv_loop(Socket)
    end.


cleanup(_) ->
    ok.

%% sys:handle_debug() callback
debug(Device, Event, Extra) ->
    io:format(Device, ">>> [~p] ~p~n", [Extra, Event]).


%% sys:resume callback
system_continue(Parent, Debug, State) ->
    ?Log(Parent, State),
    ?MODULE:accept_loop(Parent, Debug, State).

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
