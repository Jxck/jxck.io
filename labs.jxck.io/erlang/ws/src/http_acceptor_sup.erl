%%%-------------------------------------------------------------------
%% @doc http acceptor supervisor
%% @end
%%%-------------------------------------------------------------------

-module(http_acceptor_sup).

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
%% Internal functions
%%====================================================================

%% Child :: {Id,StartFunc,Restart,Shutdown,Type,Modules}
init([]) ->
    Port = 3000,
    NumAccepter = 1,
    Options = [binary,
               inet6, % support both ipv4 and ipv6
               {packet, raw},
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
