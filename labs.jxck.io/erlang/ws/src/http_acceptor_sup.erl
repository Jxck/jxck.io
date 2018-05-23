%%%-------------------------------------------------------------------
%% @doc http acceptor supervisor
%% @end
%%%-------------------------------------------------------------------
-module(http_acceptor_sup).
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
%% Internal functions
%%====================================================================
init(#{port := Port, num_acceptor := NumAccepter}=State) ->
    Options = [binary,
               {packet, http_bin},
               {active, false}, % buffer until delegate ctl to worker
               {reuseaddr, true}
              ],
    {ok, Listen} = ?Log(gen_tcp:listen(Port, Options)),

    Children = [
                {
                 { http_acceptor, N },
                 { http_acceptor, start_link, [Listen] },
                 permanent, brutal_kill, worker, [http_acceptor]
                } || N <- lists:seq(0, NumAccepter)
               ],

    {ok, { {one_for_one, 1, 15}, Children} }.
