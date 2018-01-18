#!/usr/bin/env escript
-module(client).

-export([
         main/1
        ]).

-include("../logger.hrl").

%% サーバからの受信なので {active, true} で開く。
%% 受信と送信が平行できるように受信は spawn し、制御プロセスを移譲する。
main(_) ->
    {ok, Socket} = ?Log(gen_tcp:connect({127, 0, 0, 1}, 3000, [binary, {active, true}])),

    PID = spawn(fun() -> receive_loop(Socket) end),
    gen_tcp:controlling_process(Socket, PID),

    send(Socket).

%% コンソールから入力を受け取り送信
send(Socket) ->
    Msg = <<
            "POST / HTTP/1.1\r\n"
            "Host: localhost:3000\r\n"
            "User-Agent: client.erl\r\n"
            "Accept: */*\r\n"
            "Content-Length: 9\r\n"
            "Content-Type: application/x-www-form-urlencoded\r\n"
            "\r\n"
            "key=value"
          >>,
    lists:foreach(fun(B) ->
                          ?Log(B),
                          timer:sleep(1),
                          gen_tcp:send(Socket, <<B>>)
                  end, binary_to_list(<<Msg/binary, Msg/binary>>)),
    ok.

%% 受信
receive_loop(Socket) ->
    receive
        {tcp, Socket, Data} ->
            ?Log(Data),
            receive_loop(Socket);
        {tcp_closed, Socket} ->
            ?Log({tcp_closed, Socket}),
            ?Log(gen_tcp:close(Socket));
        {tcp_error, Socket, Reason} ->
            ?Log({tcp_error, Socket, Reason}),
            ?Log(gen_tcp:close(Socket));
        Error ->
            ?Log(Error)
    end.
