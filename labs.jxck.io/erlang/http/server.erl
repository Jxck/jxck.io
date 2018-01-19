#!/usr/bin/env escript
-module(server).

-export([
         main/1
        ]).

-include("../logger.hrl").

-define(NUM_POOL, 10).

main(_) ->
    % gen_tcp:controlling_process してからじゃないと取りこぼすので
    % ここでは {active, false} にしておく
    Options = [{reuseaddr, true}, {active, false}],
    {ok, Listen} = ?Log(gen_tcp:listen(3000, Options)),

    % accepter 自体も複数起動
    [spawn(fun() -> accept_loop(Listen) end) || _ <- lists:seq(1, ?NUM_POOL)],
    receive
        stop -> gen_tcp:close(Listen)
    end.


accept_loop(Listen) ->
    {ok, Socket} = ?Log(gen_tcp:accept(Listen)),
    State = {{}, #{}, <<>>}, % {Request, Header, Body}

    % receiver をフォークして制御を移譲する
    % ここのパケットを取りこぼさないように {active, false}
    PID = spawn(fun() -> receive_loop(Socket, State) end),
    gen_tcp:controlling_process(Socket, PID),
    % 制御が移ってるので {active, once} で受信
    % 最初は {packet, http_bin} でパースを依頼する
    ok = inet:setopts(Socket, [{active, once}, {packet, http_bin}]),
    accept_loop(Listen).

receive_loop(Socket, {Req, Header, Body}=State) ->
    receive
        % First Line
        {http, Socket, {http_request, Method, Uri, Version}} ->
            % 以降はヘッダなので httph_bin
            ok = inet:setopts(Socket, [{active, once}, {packet, httph_bin}]),

            % first line
            ?Log(Method, Uri, Version),
            NextState = {{Method, Uri, Version}, Header, Body},
            receive_loop(Socket, NextState);

        % Header
        {http, Socket, {http_header, _Len, Field, _ , Value}} ->
            % ヘッダが終わるまでは httph_bin
            ok = inet:setopts(Socket, [{active, once}, {packet, httph_bin}]),
            NextState = {Req, Header#{Field => Value}, Body},
            receive_loop(Socket, NextState);

        % Header End
        {http, Socket, http_eoh} ->
            % ここで header が終わるので body を raw binary で受け取る
            % Content-Length 分だけ読むために active/false にして recv する。
            ok = inet:setopts(Socket, [binary, {packet, raw}, {active, false}]),
            Len = binary_to_integer(maps:get('Content-Length', Header, <<"0">>)),
            {ok, Data} = case Len of
                             0 -> {ok, <<>>};
                             _ -> gen_tcp:recv(Socket, Len)
                         end,

            % 終わったら http_bin に戻す
            ok = inet:setopts(Socket, [{packet, http_bin}, {active, once}]),
            NextState = {Req, Header, <<Body/binary, Data/binary>>},

            % handler を呼ぶ
            handle_request(Socket, NextState),

            receive_loop(Socket, NextState);

        {tcp_closed, Socket} ->
            ?Log({tcp_closed, Socket}),
            ?Log(gen_tcp:close(Socket));

        {tcp_error, Socket, Reason} ->
            ?Log({tcp_error, Socket, Reason}),
            ?Log(gen_tcp:close(Socket));

        Error ->
            ?Log(Error)
    end.


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
