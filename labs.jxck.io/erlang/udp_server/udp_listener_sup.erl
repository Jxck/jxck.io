-module(udp_listener_sup).
-behaviour(supervisor).
-mode(compile).
-compile(export_all).
-include("../logger.hrl").

%%====================================================================
%% API functions
%%====================================================================
start_link(#{}=State) ->
    (supervisor:start_link({local, ?MODULE}, ?MODULE, State)).

start_child(#{socket := Socket}=State) ->
    (supervisor:start_child(?MODULE, [State])).

terminate_child(PID) ->
    (supervisor:terminate_child(?MODULE, PID)).

%%====================================================================
%% Behaviour callbacks
%%====================================================================
init(#{}=State) ->
    Children = [
                #{id       => udp_listener,
                  start    => {udp_listener, start_link, [State]},
                  restart  => temporary,
                  shutdown => 100,
                  type     => worker,
                  modules  => [udp_listener]
                 }
               ],
    ({ok, {{simple_one_for_one, 0, 1}, Children}}).


%%====================================================================
%% Internal functions
%%====================================================================
