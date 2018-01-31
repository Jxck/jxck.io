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
    proc_lib:init_ack(Parent, {ok, self()}),
    loop(Parent, Listen, Debug).

loop(Parent, Listen, Debug) ->
    case ?Log(gen_tcp:accept(Listen)) of
        {ok, Socket} ->
            {ok, Pid} = http_worker_sup:start_child(Socket),
            gen_tcp:controlling_process(Socket, Pid);
        {error, Reason} ->
            io:format("fail accept ~p~n", [Reason])
    end,
    flush_message(Parent, Listen, Debug),
    loop(Parent, Listen, Debug).

flush_message(Parent, Listen, Debug) ->
    receive
        Message ->
            ?Log("Unexpected Message", Message),
            flush_message(Parent, Listen, Debug)
    after 0 ->
              ok
    end.





% receive_message(Parent, Listen, Debug) ->
%     receive
%         {system, From, Request} ->
%             sys:handle_system_msg(Request, From, Parent, ?MODULE, Debug, Listen)
%     end.
% 
% system_continue(Parent, Listen, Debug) ->
%     loop(Parent, Listen, Debug).
% 
% system_terminate(Reason, _Parent, _Debug, _Listen) ->
%     exit(Reason).
% 
% system_get_state(Listen) ->
%     {ok, Listen}.
% 
% system_replace_state(StateFun, Chs) ->
%     NChs = StateFun(Chs),
%     {ok, NChs, NChs}.
% 
% write_debug(Dev, Event, Name) ->
%     io:format(Dev, "~p event = ~p~n", [Name, Event]).
