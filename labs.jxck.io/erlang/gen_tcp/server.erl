#!/usr/bin/env escript
-module(server).

-export([
         main/1
        ]).

-include("../logger.hrl").

main(_) ->
    {ok, Listen} = ?Log(gen_tcp:listen(3000, [{reuseaddr, true}, {active, once}, binary])),
    {ok, Socket} = ?Log(gen_tcp:accept(Listen)),
    loop(Socket).


loop(Socket) ->
    receive
        {tcp, Socket, Data} ->
            gen_tcp:send(Socket, Data),
            ?Log(Data),
            inet:setopts(Socket, [{active, once}]),
            loop(Socket);
        {tcp_closed, Socket} ->
            ?Log({tcp_closed, Socket});
        Error ->
            ?Log(Error)
    end.
