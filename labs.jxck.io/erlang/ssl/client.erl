#!/usr/bin/env escript
-module(client).

-export([
         main/1
        ]).

-include("../logger.hrl").

main(_) ->
    ok = ?Log(ssl:start()),
    {ok, Socket} = ssl:connect("localhost", 3000,  []),
    ok = ssl:send(Socket, "foo"),
    loop(Socket).

loop(Socket) ->
    receive
        {ssl, Socket, Data} ->
            ?Log(Data),
            ok = ssl:close(Socket);
        Error ->
            ?Log(Error)
    end.
