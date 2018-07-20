-module(sup).
-behaviour(supervisor).
-mode(compile).
-compile(export_all).

%%% API
%-export([
%         start_link/1,
%         start_child/1
%        ]).
%
%%% Behaviour callbacks
%-export([
%         init/1
%        ]).

-define(Log(A),                (fun(P) -> io:format("[~p:~p#~p] ~p~n",     [?MODULE, ?FUNCTION_NAME, ?LINE, P]), P end)(A)).
-define(Log(A, B),             io:format("[~p:~p#~p] ~p ~p~n",             [?MODULE, ?FUNCTION_NAME, ?LINE, A, B            ])).
-define(Log(A, B, C),          io:format("[~p:~p#~p] ~p ~p ~p~n",          [?MODULE, ?FUNCTION_NAME, ?LINE, A, B, C         ])).
-define(Log(A, B, C, D),       io:format("[~p:~p#~p] ~p ~p ~p ~p~n",       [?MODULE, ?FUNCTION_NAME, ?LINE, A, B, C, D      ])).
-define(Log(A, B, C, D, E),    io:format("[~p:~p#~p] ~p ~p ~p ~p ~p~n",    [?MODULE, ?FUNCTION_NAME, ?LINE, A, B, C, D, E   ])).
-define(Log(A, B, C, D, E, F), io:format("[~p:~p#~p] ~p ~p ~p ~p ~p ~p~n", [?MODULE, ?FUNCTION_NAME, ?LINE, A, B, C, D, E, F])).


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
    process_flag(trap_exit, true),
    % Child :: {Id,StartFunc,Restart,Shutdown,Type,Modules}
    ?Log(init),
    Children = [
                {
                 worker,
                 {worker, start_link, [State]},
                 permanent, brutal_kill, worker, [worker]}
               ],
    ({ok, {{simple_one_for_one, 0, 1}, Children}}).


%%====================================================================
%% Internal functions
%%====================================================================
