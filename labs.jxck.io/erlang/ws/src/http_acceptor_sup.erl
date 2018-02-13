%%%-------------------------------------------------------------------
%% @doc http acceptor supervisor
%% @end
%%%-------------------------------------------------------------------

-module(http_acceptor_sup).

-include("logger.hrl").

-behaviour(supervisor).

%% API
-export([start_link/1]).

%% Supervisor callbacks
-export([init/1]).

-define(SERVER, ?MODULE).

%%====================================================================
%% API functions
%%====================================================================

start_link(#{port := Port, num_acceptor := NumAccepter}=State) ->
    ?Log(supervisor:start_link({local, ?SERVER}, ?MODULE, State)).


%%====================================================================
%% Internal functions
%%====================================================================

%% Child :: {Id,StartFunc,Restart,Shutdown,Type,Modules}
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
