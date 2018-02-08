#!/usr/bin/env escript
-module(nonblock).

-mode(compile).
-compile(export_all).

-include("../logger.hrl").

main(_) ->
    State = #{
      port => 3000,
      option => [
                 binary,
                 {packet, 0},
                 {active, false},
                 {reuseaddr, true}
                ],
      timeout => -1 % infinity
     },
    ?Log(State),
    init(State).

init(#{port := Port, option := Option, timeout := Timeout}) ->
    {ok, ListenSocket} = ?Log(gen_tcp:listen(Port, Option)),
    {ok, Ref} = ?Log(prim_inet:async_accept(ListenSocket, Timeout)),
    accept_loop(ListenSocket, Ref, Timeout).

accept_loop(ListenSocket, Ref, Timeout) ->
    receive
        {inet_async, ListenSocket, Ref, {ok, Socket}} = Msg ->
            ?Log(Msg),

            % get Listening Socket Module
            {ok, Mod} = ?Log(inet_db:lookup_socket(ListenSocket)),

            % set Socket Module same as Listening Socket
            true = inet_db:register_socket(Socket, Mod),

            % getopts of Listening Socket
            {ok, SockOpt} = ?Log(prim_inet:getopts(ListenSocket, [active, nodelay, keepalive, delay_send, priority, tos])),
            ok = prim_inet:setopts(Socket, SockOpt),

            % spawn worker
            Pid = ?Log(spawn(?MODULE, receiver, [Socket])),

            % delegate socket controle
            ok = gen_tcp:controlling_process(Socket, Pid),

            % accept next
            {ok, NextRef} = ?Log(prim_inet:async_accept(ListenSocket, -1)),

            accept_loop(ListenSocket, NextRef, Timeout);
        {inet_async, ListenSocket, Ref, Error} = Msg ->
            ?Log(error, Msg);
        Msg ->
            ?Log(unknown, Msg),
            accept_loop(ListenSocket, Ref, Timeout)
    end.

receiver(Socket) ->
    process_flag(trap_exit, true),
    receive_loop(Socket).

receive_loop(Socket) ->
    {ok, Ref} = ?Log(prim_inet:async_recv(Socket, 5, -1)),
    receive
        {inet_async, Socket, Ref, {ok, Data}} = Msg ->
            ?Log(Msg),
            ok = gen_tcp:send(Socket, Data),
            receive_loop(Socket);
        {inet_async, Socket, Ref, {error, closed}} = Msg ->
            ?Log(Msg),
            exit(normal);
        {inet_async, Socket, Ref, {error, _} = Error} = Msg ->
            ?Log(Msg),
            exit(Error);
        Msg ->
            ?Log(unknown, flush, Msg),
            receive_loop(Socket)
    end.
