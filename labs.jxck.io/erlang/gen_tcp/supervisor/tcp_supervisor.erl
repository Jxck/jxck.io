-module(tcp_supervisor).
-behaviour(supervisor).

%% API
-export([
         start_link/1,
         start_child/1
        ]).

%% Behaviour callbacks
-export([
         init/1
        ]).

-define(Log(A),                (fun(P) -> io:format("[~p:~p#~p] ~p~n",     [?MODULE, ?FUNCTION_NAME, ?LINE, P]), P end)(A)).
-define(Log(A, B),             io:format("[~p:~p#~p] ~p ~p~n",             [?MODULE, ?FUNCTION_NAME, ?LINE, A, B            ])).
-define(Log(A, B, C),          io:format("[~p:~p#~p] ~p ~p ~p~n",          [?MODULE, ?FUNCTION_NAME, ?LINE, A, B, C         ])).
-define(Log(A, B, C, D),       io:format("[~p:~p#~p] ~p ~p ~p ~p~n",       [?MODULE, ?FUNCTION_NAME, ?LINE, A, B, C, D      ])).
-define(Log(A, B, C, D, E),    io:format("[~p:~p#~p] ~p ~p ~p ~p ~p~n",    [?MODULE, ?FUNCTION_NAME, ?LINE, A, B, C, D, E   ])).
-define(Log(A, B, C, D, E, F), io:format("[~p:~p#~p] ~p ~p ~p ~p ~p ~p~n", [?MODULE, ?FUNCTION_NAME, ?LINE, A, B, C, D, E, F])).


%%====================================================================
%% API functions
%%====================================================================
start_link(Args) ->
    ?Log(Args),
    ?Log(supervisor:start_link({local, ?MODULE}, ?MODULE, Args)).

start_child(State) ->
    ?Log(State),
    ?Log(supervisor:start_child(?MODULE, [State, []])).


%%====================================================================
%% Behaviour callbacks
%%====================================================================
init(State) ->
    ?Log(State),
    Children = [
                {
                 tcp_worker,
                 {tcp_worker, start_link, []},
                 temporary, brutal_kill, worker, [tcp_worker]}
               ],
    ({ok, {{simple_one_for_one, 1, 5}, Children}}).


%%====================================================================
%% Internal functions
%%====================================================================
