%%%-------------------------------------------------------------------
%% @doc http listener worker
%% @end
%%%-------------------------------------------------------------------

-module(http_listener).

-include("../logger.hrl").

%% Supervisor callbacks
-export([start_link/0]).

%%====================================================================
%% API functions
%%====================================================================

start_link() ->
    Pid = ?Log(spawn_link(fun init/0)),
    {ok, Pid}.


%%====================================================================
%% Internal functions
%%====================================================================

init() ->
    Port = 3000,
    Backlog = 10244,
    Options = [binary,
               inet6, % support both ipv4 and ipv6
               {active, false},
               {reuseaddr, true},
               {backlog, Backlog}
              ],
    {ok, Listen} = ?Log(gen_tcp:listen(Port, Options)),
    accept(Listen).

accept(Listen) ->
    case ?Log(gen_tcp:accept(Listen)) of
        {ok, Socket} ->
            {ok, Pid} = http_worker_sup:start_child(Socket),
            gen_tcp:controlling_process(Socket, Pid);
        {error, Reason} ->
            io:format("fail accept ~p~n", [Reason])
    end,
    accept(Listen).
