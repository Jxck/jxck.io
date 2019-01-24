-module(tcp_worker).

-behaviour(gen_server).

-export([start_link/2]).
-export([init/1,
         handle_call/3,
         handle_cast/2,
         handle_info/2]).

-define(Log(A),                (fun(P) -> io:format("[~p:~p#~p] ~p~n",     [?MODULE, ?FUNCTION_NAME, ?LINE, P]), P end)(A)).
-define(Log(A, B),             io:format("[~p:~p#~p] ~p ~p~n",             [?MODULE, ?FUNCTION_NAME, ?LINE, A, B            ])).
-define(Log(A, B, C),          io:format("[~p:~p#~p] ~p ~p ~p~n",          [?MODULE, ?FUNCTION_NAME, ?LINE, A, B, C         ])).
-define(Log(A, B, C, D),       io:format("[~p:~p#~p] ~p ~p ~p ~p~n",       [?MODULE, ?FUNCTION_NAME, ?LINE, A, B, C, D      ])).
-define(Log(A, B, C, D, E),    io:format("[~p:~p#~p] ~p ~p ~p ~p ~p~n",    [?MODULE, ?FUNCTION_NAME, ?LINE, A, B, C, D, E   ])).
-define(Log(A, B, C, D, E, F), io:format("[~p:~p#~p] ~p ~p ~p ~p ~p ~p~n", [?MODULE, ?FUNCTION_NAME, ?LINE, A, B, C, D, E, F])).

start_link(#{socket := Socket}=Args, Option) ->
    ?Log(Args),
    ?Log(gen_server:start_link(?MODULE, #{socket => Socket}, Option)).


init(#{socket := Socket}=Args) ->
    ?Log(Args),
    {ok, #{socket => Socket}}.

handle_call(Request, From, State) ->
    ?Log(Request, From, State),
    {noreply, State}.

handle_cast(Request, State) ->
    ?Log(Request, State),
    {noreply, State}.

handle_info({tcp, Socket, Bin}, #{socket := Socket}=State) ->
    ?Log(Bin),
    ok = gen_tcp:send(Socket, Bin),
    inet:setopts(Socket, [{active, once}]),
    {noreply, State};

handle_info({tcp_closed, Socket}, #{socket := Socket}) ->
    ?Log(tcp_closed),
    ok = ?Log(gen_tcp:close(Socket)),
    {stop, normal, []};

handle_info(Info, State) ->
    ?Log(Info, State),
    {stop, error, []}.



