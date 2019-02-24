# [tag] Undocumented Erlang

## Intro

「ドキュメントに無いとはどういうことか」が理解できている人だけに向けたエントリ。


## gen_udp:connect/3

ソケットプログラミングでも UDP で connect が一応できるように、 gen_udp にも connect/3 が一応ある。

サーバ側の Port を特定のクライアント(IP/Port)に紐付ける。

```erlang
main(_) ->
    connect_loop().


connect_loop() ->
    {ok, Socket} = (gen_udp:open(0, [binary, {active, once}])),
    receive
        {udp, Socket, IP, Port, Data} ->
            ok = gen_udp:connect(Socket, IP, Port),
            PID = spawn(fun() -> receive_loop(Socket) end),
            PID ! {udp, Socket, IP, Port, Data},
            ok = gen_tcp:controlling_process(Socket, PID),
            connect_loop()
    end.

receive_loop(Socket) ->
    receive
        {udp, Socket, IP, Port, Data} ->
            io:format("~p from ~p ~p",[Data, IP, Port]),
            gen_udp:send(Socket, IP, Port, Data),
            inet:setopts(Socket, [{active, true}]),
            receive_loop(Socket)
    end.
```

使われているところはあまり見ない。

<http://erlang.org/doc/man/gen_udp.html>


## supervisor stop


Supervisor は基本的に勝手に殺すものではないので supervisor:stop/1,3 は無い。

しかし現状 Supervisor は [gen_server](https://github.com/erlang/otp/blob/master/lib/stdlib/src/supervisor.erl#L22) なので gen_statem:stop/1,3 で止まる。


```erlang
{ok, SupPid} = supervisor:start_link(server_sup, [])
ok = gen_server:stop(SudPid).
```


特に必要な場面が無いので使われてないと思われる。


<http://erlang.org/doc/man/supervisor.html>


## prim_inet:async_accept/2, prim_inet:async_recv/3

prim_inet 自体がドキュメントに無いが、非同期な Accept と Recieve ができる。

async_accept は Acceptor を gen_server や gen_statem にしたい場合に便利なのでよく使われてしまっている。

receive は `{active, true/once}` にすれば非同期だが、 async_recv は Length を指定しつつ非同期に取れるのでバッファリングをサボりたい場合に便利なので使われてしまっている。


```erlang
init(#{port := Port, option := Option, timeout := Timeout}) ->
    {ok, ListenSocket} = gen_tcp:listen(Port, Option),
    {ok, Ref} = prim_inet:async_accept(ListenSocket, Timeout),
    accept_loop(ListenSocket, Ref, Timeout).

accept_loop(ListenSocket, Ref, Timeout) ->
    receive
        {inet_async, ListenSocket, Ref, {ok, Socket}} = Msg ->
            % get Listening Socket Module
            {ok, Mod} = inet_db:lookup_socket(ListenSocket),

            % set Socket Module same as Listening Socket
            true = inet_db:register_socket(Socket, Mod),

            % getopts of Listening Socket
            {ok, SockOpt} = prim_inet:getopts(ListenSocket, [active, nodelay, keepalive, delay_send, priority, tos]),
            ok = prim_inet:setopts(Socket, SockOpt),

            % spawn worker
            Pid = spawn(?MODULE, receiver, [Socket]),

            % delegate socket controle
            ok = gen_tcp:controlling_process(Socket, Pid),

            % accept next
            {ok, NextRef} = prim_inet:async_accept(ListenSocket, -1),

            accept_loop(ListenSocket, NextRef, Timeout)
    end.

receiver(Socket) ->
    process_flag(trap_exit, true),
    receive_loop(Socket).

receive_loop(Socket) ->
    {ok, Ref} = prim_inet:async_recv(Socket, 5, -1),
    receive
        {inet_async, Socket, Ref, {ok, Data}} = Msg ->
            ok = gen_tcp:send(Socket, Data),
            receive_loop(Socket);
        {inet_async, Socket, Ref, {error, closed}} = Msg ->
            exit(normal);
        {inet_async, Socket, Ref, {error, _} = Error} = Msg ->
            exit(Error)
    end.
```


<https://github.com/erlang/otp/blob/master/erts/preloaded/src/prim_inet.erl>
