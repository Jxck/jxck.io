#!/usr/bin/env escript
-module(client).

-export([
         main/1
        ]).

-include("../logger.hrl").

-define(PORT, 4444).

%% サーバからの受信なので {active, true} で開く。
%% 受信と送信が平行できるように受信は spawn し、制御プロセスを移譲する。
main(_) ->
    ok = ?Log(ssl:start()),
    {ok, Socket} = ssl:connect({127,0,0,1}, ?PORT, [
                                                    {ciphers, [{rsa,aes_128_cbc,sha256}]},
                                                    {active, true},
                                                    {protocol, dtls},
                                                    binary
                                                   ]),

    PID = spawn(fun() -> receive_loop(Socket) end),
    ssl:controlling_process(Socket, PID),

    send_loop(Socket).

%% コンソールから入力を受け取り送信
send_loop(Socket) ->
    {ok, [Msg]} = io:fread("> ", "~s"),
    ssl:send(Socket, Msg),
    send_loop(Socket).

%% 受信
receive_loop(Socket) ->
    receive
        {ssl, Socket, Data} ->
            ?Log(Data),
            receive_loop(Socket);
        {ssl_closed, Socket} ->
            ?Log({ssl_closed, Socket}),
            ?Log(ssl:close(Socket));
        {ssl_error, {sslsocket, _, From}=Socket, Reason} ->
            ?Log({ssl_error, From, Reason}),
            ?Log(ssl:close(Socket));
        Error ->
            ?Log(Error)
    end.
