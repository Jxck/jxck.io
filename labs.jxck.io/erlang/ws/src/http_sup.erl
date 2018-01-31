%%%-------------------------------------------------------------------
%% @doc http top level supervisor.
%% @end
%%%-------------------------------------------------------------------

-module(http_sup).

-include("logger.hrl").

-behaviour(supervisor).

%% API
-export([start_link/0]).

%% Supervisor callbacks
-export([init/1]).

-define(SERVER, ?MODULE).

%%====================================================================
%% API functions
%%====================================================================

start_link() ->
    ?Log(supervisor:start_link({local, ?SERVER}, ?MODULE, [])).

%%====================================================================
%% Supervisor callbacks
%%====================================================================

%% Child :: {Id,StartFunc,Restart,Shutdown,Type,Modules}
init([]) ->
    Children = [
                {
                 http_listener_sup,
                 { http_listener_sup, start_link, [] },
                 permanent, 5, worker, [http_listener_sup]
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
