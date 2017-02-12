#!/usr/bin/env escript
-module(client).

-export([
         main/1
        ]).

-define(Log(A),                (fun(P) -> io:format("[~p:~p#~p] ~p~n",     [?MODULE, ?FUNCTION_NAME, ?LINE, P]), P end)(A)).
-define(Log(A, B),             io:format("[~p:~p#~p] ~p ~p~n",             [?MODULE, ?FUNCTION_NAME, ?LINE, A, B            ])).

main(_) ->
    {ok, Socket} = ?Log(gen_tcp:connect({127, 0, 0, 1}, 3000, [binary, {active, true}])),
    gen_tcp:send(Socket, "foo"),
    receive_roop(Socket).


receive_roop(Socket) ->
    receive
        {tcp, Socket, Data} ->
            ?Log(Data),
            gen_tcp:close(Socket);
        {tcp_closed, Socket} ->
            ?Log({tcp_closed, Socket})
    end.
