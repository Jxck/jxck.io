%%%-------------------------------------------------------------------
%% @doc http acceptor
%% @end
%%%-------------------------------------------------------------------

-module(http_acceptor).

-include("logger.hrl").

%% Supervisor callbacks
-export([
         start_link/1
        ]).

-export([
         init/2,
         loop/3
         % system_continue/3,
         % system_terminate/4,
         % system_get_state/1,
         % system_replace_state/2
        ]).


%%====================================================================
%% API functions
%%====================================================================

start_link(Listen) ->
    proc_lib:start_link(?MODULE, init, [self(), Listen]).


%%====================================================================
%% Internal functions
%%====================================================================

init(Parent, Listen) ->
    ?Log(Parent, Listen),
    Debug = sys:debug_options([]),
    ok = proc_lib:init_ack(Parent, {ok, self()}),
    loop(Parent, Listen, Debug).

loop(Parent, Listen, Debug) ->
    % ここで accept する
    case ?Log(gen_tcp:accept(Listen)) of
        {ok, Socket} ->
            ?Log(sys:handle_debug(Debug, fun ?MODULE:format_debug/3, ?MODULE, {accept, Socket})),
            % accept した socket ごとに worker を起動
            {ok, Pid} = http_worker_sup:start_child(Socket),
            % 制御を移譲する
            ok = gen_tcp:controlling_process(Socket, Pid);
        {error, Reason} ->
            ?Log(sys:handle_debug(Debug, fun ?MODULE:format_debug/3, ?MODULE, {error, Reason})),
            io:format("fail accept ~p~n", [Reason])
    end,
    ok = flush_message(Parent, Listen, Debug),
    loop(Parent, Listen, Debug).

flush_message(Parent, Listen, Debug) ->
    receive
        {system, From, Request} ->
            sys:handle_system_msg(Request, From, Parent, ?MODULE, Debug, Listen);
        Message ->
            ?Log("Unexpected Message", Message),
            flush_message(Parent, Listen, Debug)
    after 0 ->
              ok
    end.

format_debug(Device, Event, Extra) ->
    io:format(Device, ">>>>>> [~p] ~p~n", [Event, Extra]).



system_continue(Parent, Listen, Debug) ->
    loop(Parent, Listen, Debug).

system_terminate(Reason, _Parent, _Debug, _Listen) ->
    exit(Reason).

system_code_change(State, _Module, _OldVsn, _Extra) ->
    {ok, State}.

system_get_state(Listen) ->
    {ok, Listen}.

system_replace_state(StateFun, Chs) ->
    NChs = StateFun(Chs),
    {ok, NChs, NChs}.
