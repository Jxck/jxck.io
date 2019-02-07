-module(sfu_sup).
-behaviour(supervisor).
-mode(compile).
-compile(export_all).
-include("logger.hrl").

%%====================================================================
%% API functions
%%====================================================================
start_link({}) ->
    State = {},
    (supervisor:start_link({local, ?MODULE}, ?MODULE, State)).

start_child(#{socket := Socket}=State) ->
    (supervisor:start_child(?MODULE, [State])).

terminate_child(Child) ->
    (supervisor:terminate_child(?MODULE, Child)).

%%====================================================================
%% Behaviour callbacks
%%====================================================================
init({}) ->
    Children = [
                {
                 udp_sup,
                 {udp_sup, start_link, [{}]},
                 temporary, infinity, supervisor, [udp_sup]}
               ],
    ({ok, {{simple_one_for_one, 1, 5}, Children}}).


%%====================================================================
%% Internal functions
%%====================================================================
