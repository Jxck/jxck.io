%%%-------------------------------------------------------------------
%% @doc http top level supervisor.
%% @end
%%%-------------------------------------------------------------------
-module(http_sup).
-behaviour(supervisor).
-include("logger.hrl").

%% API
-export([
         start_link/1
        ]).

%% Supervisor callbacks
-export([
         init/1
        ]).


%%====================================================================
%% API functions
%%====================================================================
start_link(#{port := Port, num_acceptor := NumAccepter}=State) ->
    ?Log(supervisor:start_link({local, ?MODULE}, ?MODULE, State)).


%%====================================================================
%% Supervisor callbacks
%%====================================================================
init(#{port := Port, num_acceptor := NumAccepter}=State) ->
    Children = [
                {
                 http_acceptor_sup,
                 { http_acceptor_sup, start_link, [State]},
                 permanent, 5, supervisor, [http_acceptor_sup]
                },
                {
                 http_worker_sup,
                 { http_worker_sup, start_link, []},
                 permanent, 5, supervisor, [http_worker_sup]
                },
                {
                 ws_worker_sup,
                 { ws_worker_sup, start_link, []},
                 permanent, 5, supervisor, [ws_worker_sup]
                }
               ],
    {ok, { {one_for_all, 0, 1}, Children} }.


%%====================================================================
%% Internal functions
%%====================================================================
