-module(srtp_worker_sup).
-behaviour(supervisor).
-mode(compile).
-compile(export_all).
-include("../logger.hrl").

%%====================================================================
%% API functions
%%====================================================================
start_link(#{}=State) ->
    (supervisor:start_link({local, ?MODULE}, ?MODULE, State)).

start_child(#{}=State) ->
    (supervisor:start_child(?MODULE, [State])).

terminate_child(PID) ->
    (supervisor:terminate_child(?MODULE, PID)).

%%====================================================================
%% Behaviour callbacks
%%====================================================================
init(#{}=State) ->
    Children = [
                #{id       => srtp_worker,
                  start    => {srtp_worker, start_link, [State]},
                  restart  => temporary,
                  shutdown => brutal_kill,
                  type     => worker,
                  modules  => [srtp_worker]
                 }
               ],
    ({ok, {{simple_one_for_one, 0, 1}, Children}}).


%%====================================================================
%% Internal functions
%%====================================================================
