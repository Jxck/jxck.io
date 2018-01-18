#!/usr/bin/env escript
-module(server).

-export([
         main/1
        ]).

-include("../logger.hrl").

% packet オプションはここでは指定しない
main(_) ->
    {ok, Listen} = ?Log(gen_tcp:listen(3000, [{reuseaddr, true}, {active, once}, {packet, http_bin}])),
    spawn(fun() -> accept_loop(Listen) end),
    receive
        stop -> gen_tcp:close(Listen)
    end.


% 最初は packet, http_bin でパースを依頼する
accept_loop(Listen) ->
    {ok, Socket} = ?Log(gen_tcp:accept(Listen)),
    spawn(fun() -> accept_loop(Listen) end),
    State = {{}, #{}, <<>>}, % {Request, Header, Body}
    receive_loop(Socket, State).

% active, once で受信
receive_loop(Socket, {Req, Header, Body}=State) ->
    ok = inet:setopts(Socket, [{active, once}]),
    receive
        {http, Socket, http_eoh} ->
            NextState = handle_body(Socket, State),

            % handler を呼ぶ
            handle_request(Socket, NextState),

            receive_loop(Socket, NextState);
        {http, Socket, Data} ->
            NextState = handle_header(Data, State),
            receive_loop(Socket, NextState);
        {tcp, Socket, Data} ->
            receive_loop(Socket, State);
        {tcp_closed, Socket} ->
            ?Log({tcp_closed, Socket}),
            ?Log(gen_tcp:close(Socket));
        {tcp_error, Socket, Reason} ->
            ?Log({tcp_error, Socket, Reason}),
            ?Log(gen_tcp:close(Socket));
        Error ->
            ?Log(Error),
            receive_loop(Socket, State)
    end.


handle_header({http_request, Method, Uri, Version}, {Req, Header, Body}) ->
    ?Log(Method, Uri, Version),
    {{Method, Uri, Version}, Header, Body};

handle_header({http_header, _Len, Field, _ , Value}, {Req, Header, Body}) ->
    {Req, Header#{Field => Value}, Body};

handle_header(A, B) ->
    ?Log(A, B).


handle_body(Socket, {Req, #{'Content-Length' := _Len}=Header, Body}) ->
    Len = (binary_to_integer(_Len)),
    % ここで header が終わるので body を raw binary で受け取る
    % Content-Length 分だけ読むために active/false にして recv する。
    ok = inet:setopts(Socket, [binary, {packet, raw}, {active, false}]),
    {ok, Data} = gen_tcp:recv(Socket, Len),
    ok = inet:setopts(Socket, [{packet, http_bin}, {active, once}]),
    {Req, Header, <<Body/binary, Data/binary>>};

handle_body(Socket, State) ->
    ?Log(Socket, State),
    State.



handle_request(Socket, {{'GET', _, _}, _, _}=Req) ->
    ?Log(handle, Req),
    gen_tcp:send(Socket, <<
                           "HTTP/1.1 200 OK\r\n"
                           "Content-Length: 0\r\n"
                           "\r\n"
                         >>);

handle_request(Socket, {{'POST', _, _}, _, Body}=Res) ->
    ?Log(handle, Res),
    Length = integer_to_binary(byte_size(Body)),
    gen_tcp:send(Socket, <<
                           "HTTP/1.1 200 OK\r\n"
                           "Content-Length: ", Length/binary, "\r\n"
                           "\r\n",
                           Body/binary
                         >>).
