-module(udp_sup).
-behaviour(supervisor).
-mode(compile).
-compile(export_all).
-include("logger.hrl").

%%====================================================================
%% API functions
%%====================================================================
start_link({}, #{socket := Socket}=State) ->
    Name = main:name_from_port(udp_sup, Socket),
    (supervisor:start_link({local, Name}, ?MODULE, State)).

stop() ->
    gen_server:stop(?MODULE).


%%====================================================================
%% Behaviour callbacks
%%====================================================================
init(#{socket := Socket}=State) ->
    ?Log(Socket),
    SupFlags = #{
      strategy  => one_for_all,
      intensity => 0,
      period    => 1
     },
    Children = [
                #{ id       => udp_worker,
                   start    => {udp_worker, start_link, [State]},
                   restart  => temporary,
                   shutdown => 5,
                   type     => worker,
                   modules  => [udp_worker]
                 },
                #{ id       => dtls_worker,
                   start    => {dtls_worker, start_link, [State]},
                   restart  => temporary,
                   shutdown => 5,
                   type     => worker,
                   modules  => [dtls_worker]
                 },
                #{ id       => srtp_worker,
                   start    => {srtp_worker, start_link, [State]},
                   restart  => temporary,
                   shutdown => 5,
                   type     => worker,
                   modules  => [srtp_worker]
                 }
               ],
    ({ok, {SupFlags, Children}}).


%%====================================================================
%% Internal functions
%%====================================================================
