#!/usr/bin/env escript
-module(async_udp_server).

-export([
         main/1
        ]).

-include("../logger.hrl").




-define(INET_AF_INET,  1).
-define(INET_AF_INET6, 2).

send(Socket, {A,B,C,D}, Port, Data) ->
    port_command(Socket, <<?INET_AF_INET:8, Port:16, A:8, B:8, C:8, D:8, Data/binary>>);

send(Socket, {A,B,C,D,E,F,G,H}, Port, Data) ->
    port_command(Socket, <<?INET_AF_INET6:8, Port:16, A:8, B:8, C:8, D:8, E:8, F:8, G:8, H:8, Data/binary>>).


reuseport() ->
    case os:type() of
        %              -> {raw, ?SOL_SOCKET, ?SO_REUSEPORT, <<1:32/native>>}
        {unix, darwin} -> {raw, 16#ffff, 16#0200, <<1:32/native>>};
        {unix, linux}  -> {raw, 1, 15, <<1:32/native>>}
    end.



%% num socket for same port
-define(C, 4).

main(_) ->
    Sockets = (open(?C)),

    lists:map(fun(Socket) ->
                      PID = spawn_link(fun() -> receive_loop(Socket) end),
                      ?Log(PID),
                      ok = gen_udp:controlling_process(Socket, PID)
              end, Sockets),
    receive
        stop -> ok
    end.

open(N) ->
    Open = [ gen_udp:open(3000, [inet, binary, {active, true}, {reuseaddr, true}, reuseport()]) || _ <- lists:seq(1, N) ],
    [Socket || {ok, Socket} <- Open].

receive_loop(Socket) ->
    receive
        {udp, Socket, IP, Port, Data} ->
            io:format("~p ~p~n", [self(), Port]),
            %?Log(Data, from, IP, Port),
            send(Socket, IP, Port, Data),
            receive_loop(Socket);
        {inet_reply, Socket, ok} ->
            ok;
        Error ->
            ?Log(Error)
    end.
