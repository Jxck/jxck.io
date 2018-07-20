-module(worker).
-behaviour(gen_server).
-mode(compile).
-compile(export_all).

%%% Supervisor callbacks
%-export([
%         start_link/1,
%         start_link/2
%        ]).
%
%%% Behaviour callbacks
%-export([
%         init/1,
%         handle_call/3,
%         handle_cast/2,
%         handle_info/2,
%         code_change/3,
%         terminate/2
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
start_link(#{count := Cout}, #{delta := Delta}) ->
    ?Log(gen_server:start_link(?MODULE, {Cout, Delta}, [])).

stop() ->
    ?Log(gen_server:stop(?MODULE)).


%%====================================================================
%% Behaviour callbacks
%%====================================================================
init({Cout, Delta}) ->
    process_flag(trap_exit, true),
    ?Log(Cout, Delta),
    {ok, {Cout, Delta}}.

handle_call(Msg, From, State) ->
    ?Log(Msg, From, State),
    {reply, Msg, State}.


handle_cast(incr, {C, D}) ->
    Next = C + D,
    {noreply, {Next, D}};

handle_cast(stop, State) ->
    ?Log(stop, State),
    {stop, normal, State};

handle_cast(Msg, State) ->
    ?Log(Msg, State),
    {noreply, State}.

handle_info(Msg, State) ->
    ?Log(Msg, State),
    {noreply, State}.

code_change(OldVsn, State, Extra) ->
    ?Log(OldVsn, State, Extra),
    {ok, State}.

terminate(Reason, State) ->
    ?Log(Reason, State),
    ok.



%%====================================================================
%% Internal functions
%%====================================================================
