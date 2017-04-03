#!/usr/bin/env escript
-module(server).

-export([
         main/1
        ]).

-include("../logger.hrl").

main(_) ->
    ok = ?Log(ssl:start()),
    {ok, Listen} = ssl:listen(3000, [{certfile,"/keys/cert.pem"}, {keyfile, "/keys/key.pem"}, {reuseaddr, true}]),
    {ok, Socket} = ?Log(ssl:transport_accept(Listen)),
    ok = ?Log(ssl:ssl_accept(Socket)),
    loop(Socket).

loop(Socket) ->
    receive
        {ssl, Socket, Data} ->
            ?Log(Data),
            ok = ssl:send(Socket, Data),
            loop(Socket);
        {ssl_closed, Socket} ->
            ?Log({ssl_closed, Socket}),
            ?Log(ssl:close(Socket));
        Error ->
            ?Log(Error)
    end.
