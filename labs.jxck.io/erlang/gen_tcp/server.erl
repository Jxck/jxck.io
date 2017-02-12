#!/usr/bin/env escript
-module(server).

-export([
         main/1
        ]).

-define(Log(A),                (fun(P) -> io:format("[~p:~p#~p] ~p~n",     [?MODULE, ?FUNCTION_NAME, ?LINE, P]), P end)(A)).
-define(Log(A, B),             io:format("[~p:~p#~p] ~p ~p~n",             [?MODULE, ?FUNCTION_NAME, ?LINE, A, B            ])).

main(_) ->
    {ok, Listen} = ?Log(gen_tcp:listen(3000, [{reuseaddr, true}, {active, once}, binary])),
    {ok, Socket} = ?Log(gen_tcp:accept(Listen)),
    receive_roop(Socket).


receive_roop(Socket) ->
    receive
        {tcp, Socket, Data} ->
            gen_tcp:send(Socket, Data),
            ?Log(Data),
            inet:setopts(Socket, [{active, once}]),
            receive_roop(Socket);
        {tcp_closed, Socket} ->
            ?Log({tcp_closed, Socket})
    end.
