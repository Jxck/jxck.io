-module(udp_sup).
-behaviour(supervisor).
-mode(compile).
-compile(export_all).
-include("logger.hrl").

%%====================================================================
%% API functions
%%====================================================================
start_link(#{}=State) ->
    (supervisor:start_link({local, ?MODULE}, ?MODULE, State)).


%%====================================================================
%% Behaviour callbacks
%%====================================================================
init(#{}) ->
    SupFlags = #{
      strategy  => one_for_one,
      intensity => 1,
      period    => 5
     },
    Children = [
                #{ id       => udp_listener_sup,
                   start    => {udp_listener_sup, start_link, [#{}]},
                   restart  => permanent,
                   shutdown => infinity,
                   type     => supervisor,
                   modules  => [udp_listener_sup]
                 },
                #{ id       => dtls_worker_sup,
                   start    => {dtls_worker_sup, start_link, [#{}]},
                   restart  => permanent,
                   shutdown => infinity,
                   type     => supervisor,
                   modules  => [dtls_worker_sup]
                 },
                #{ id       => srtp_worker_sup,
                   start    => {srtp_worker_sup, start_link, [#{}]},
                   restart  => permanent,
                   shutdown => infinity,
                   type     => supervisor,
                   modules  => [srtp_worker_sup]
                 }
               ],
    ({ok, {SupFlags, Children}}).


%%====================================================================
%% Internal functions
%%====================================================================
