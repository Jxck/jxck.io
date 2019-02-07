-module(service_sup).
-behaviour(supervisor).
-mode(compile).
-compile(export_all).
-include("../logger.hrl").

%%====================================================================
%% API functions
%%====================================================================
start_link(#{count := C}=State) ->
    ?Log(supervisor:start_link({local, ?MODULE}, ?MODULE, State)).

start_child(#{delta := D}=State) ->
    ?Log(D),
    ?Log(supervisor:start_child(?MODULE, [State])).


%%====================================================================
%% Behaviour callbacks
%%====================================================================
init(#{count := C}=State) ->
    ?Log(init),
    Children = [
                #{id       => service_worker,
                  start    => {service_worker, start_link, [State]},
                  restart  => temporary,
                  shutdown => brutal_kill,
                  type     => worker,
                  modules  => [service_worker]
                 }
               ],
    ({ok, {{simple_one_for_one, 0, 1}, Children}}).


%%====================================================================
%% Internal functions
%%====================================================================
