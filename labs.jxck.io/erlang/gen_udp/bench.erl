#!/usr/bin/env escript
-module(main).

-mode(compile).
-compile(export_all).

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





-define(C, 200). % concurrency
-define(N, 2000). % num requests

main(_) ->
    Sockets = ?Log([ element(2, gen_udp:open(0, [binary])) || _ <- lists:seq(1, ?C)]),
    Start = erlang:monotonic_time(),
    bench(Sockets),
    End =  erlang:monotonic_time(),
    ?Log((End - Start)),
    ok.

bench(Sockets) ->
    PID = self(),
    N = [ spawn(fun() -> sender(Socket, PID) end) || Socket <- Sockets ],
    receiver(length(N)).

receiver(0) ->
    ok;
receiver(N) ->
    receive
        done -> receiver(N-1)
    end.


sender(Socket, PID) ->
    [
     send(Socket, {127,0,0,1}, 3000, <<1,2,3,4>>) || _ <- lists:seq(1, ?N)
    ],
    recv(?N),
    PID ! done.

recv(0) -> ok;
recv(N) ->
    receive
        {inet_reply, _Socket, ok} -> recv(N-1);
        Error -> ?Log(Error)
    end.
