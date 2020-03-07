#!/usr/bin/env escript
-module(main).

-mode(compile).
-compile(export_all).

-define(Log(A),                (fun(P) -> io:format("[~p:~p#~p] ~p~n",     [self(), ?FUNCTION_NAME, ?LINE, P]), P end)(A)).
-define(Log(A, B),             io:format("[~p:~p#~p] ~p ~p~n",             [self(), ?FUNCTION_NAME, ?LINE, A, B            ])).
-define(Log(A, B, C),          io:format("[~p:~p#~p] ~p ~p ~p~n",          [self(), ?FUNCTION_NAME, ?LINE, A, B, C         ])).
-define(Log(A, B, C, D),       io:format("[~p:~p#~p] ~p ~p ~p ~p~n",       [self(), ?FUNCTION_NAME, ?LINE, A, B, C, D      ])).
-define(Log(A, B, C, D, E),    io:format("[~p:~p#~p] ~p ~p ~p ~p ~p~n",    [self(), ?FUNCTION_NAME, ?LINE, A, B, C, D, E   ])).
-define(Log(A, B, C, D, E, F), io:format("[~p:~p#~p] ~p ~p ~p ~p ~p ~p~n", [self(), ?FUNCTION_NAME, ?LINE, A, B, C, D, E, F])).

main(_) ->
    Option       = #{family => inet, port => 3000, addr => loopback},
    {ok, Listen} = ?Log(socket:open(inet, stream, tcp)),
    ok           = ?Log(socket:setopt(Listen, socket, reuseaddr, true)),
    {ok, Port}   = ?Log(socket:bind(Listen, Option)),
    ok           = ?Log(socket:listen(Listen)),
    spawn(fun() -> accept_loop(Listen) end),
    receive
        stop -> ok
    end.

accept_loop(Listen) ->
    {select, {select_info, accept, SelectRef}} = ?Log(socket:accept(Listen, nowait)),
    receive
        {'$socket', Listen, select, SelectRef} ->
            {ok, Socket} = ?Log(socket:accept(Listen)),
            spawn(fun() -> recv_loop(Socket) end),
            accept_loop(Listen)
    end.


recv_loop(Socket) ->
    ?Log('========================================='),
    {select, {select_info, _, SelectRef}} = ?Log(socket:recv(Socket, 100, nowait)),
    receive
        {'$socket', Socket, select, SelectRef} ->
            ?Log(socket:recv(Socket, 10)),
            recv_loop(Socket);
        Msg ->
            ?Log(Msg)
    end.
