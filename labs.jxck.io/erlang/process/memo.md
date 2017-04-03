# erlang process

## escript

```erlang
#!/usr/bin/env escript
-module(message).
-mode(compile).
-compile(export_all).

main(Arg) -> ?Log(Arg).
```

escript で実行する上で、コンパイルできてないと spawn がうまく行かないっぽいので、
`-mode(compile)` をつけておく。


## spawn

spawn すると process ができて process id が返る。


```erlang
store() ->
    ?Log(store).

main(_) ->
    PID = spawn(?MODULE, store, []),
    ?Log(PID).
```


## !

この PID に対してメッセージを送る。

```erlang
store() ->
    ?Log(store).

main(_) ->
    PID = spawn(?MODULE, store, []),
    PID ! hello.
```

しかし受け取って無いので何も起こらない。


## receive

受け取ったが、先に main() の方が終わってしまう。

```erlang
store() ->
    receive
        Message -> ?Log(Message)
    end.

main(_) ->
    PID = spawn(?MODULE, store, []),
    PID ! hello.
```


## self()

store から main に対して返事がしたい。
そこで返信先としての main の PID を一緒に送る。

これは self() で取れる。


```erlang
store() ->
    receive
        {PID, Message} ->
            ?Log(Message),
            PID ! world;
        Unknown ->
            ?Log(Unknown)
    end.

main(_) ->
    PID = spawn(?MODULE, store, []),
    PID ! {self(), hello}.
```


## receive 2

store が返してきたメッセージを main 側でも受け取る。


```erlang
store() ->
    receive
        {PID, Message} ->
            ?Log(Message),
            PID ! world;
        Unknown ->
            ?Log(Unknown)
    end.

main(_) ->
    PID = spawn(?MODULE, store, []),
    PID ! {self(), hello},
    receive
        Message -> ?Log(Message)
    end.
```

これでやりとりができた。


## 関数化

メッセージを送って、返事を表示するだけの処理を、関数にする。

```erlang
hello(PID) ->
    PID ! {self(), hello},
    receive
        Message -> ?Log(Message)
    end.

main(_) ->
    PID = spawn(?MODULE, store, []),
    hello(PID).
```

これでメッセージのたびに receive を書く必要がなくなった。
しかし、 hello() を二回呼んでみると、二回目が返ってこないことに気づく。

```erlang
main(_) ->
    PID = spawn(?MODULE, store, []),
    hello(PID),
    hello(PID).
```

これは、一回目の hello を受け取った store がそこで終わっているから。


## recurcive

store がメッセージを受け取りつづけられるようにするには、再起すれば良い。

```erlang
store() ->
    receive
        {PID, Message} ->
            ?Log(Message),
            PID ! world,
            store();
        Unknown ->
            ?Log(Unknown),
            store()
    end.
```

これで連続するメッセージを処理できる、デーモンのようになった。


## save

いよいよ KVS 的なメッセージを送る。
まずは hello() を修正して、 save(PID, k, v) に直す。

実際に送るメッセージは、 `{PID, save, {K, V}}` とタプルをコマンドとして入れる。
実際の保存はせず、オウム返しする。


```erlang
store() ->
    receive
        {PID, save, {Key, Value}} ->
            ?Log({Key, Value}),
            PID ! {Key, Value},
            store();
        Unknown ->
            ?Log(Unknown),
            store()
    end.

save(PID, Key, Value) ->
    PID ! {self(), save, {Key, Value}},
    receive
        Message -> ?Log(Message)
    end.

main(_) ->
    PID = spawn(?MODULE, store, [#{}]),
    save(PID, a, 10),
    save(PID, b, 20).
```

## Map

実際の保存は Map にし、それを store が内部に保存するようにする。
これが State(状態) となる。

State の初期化は、 spawn 時に引数として空の Map `#{}` を渡すことで行い。
store() を再起する際に、最新の Map を引数として渡す。

保存したら ok を返すようにした。

```erlang
store(State) ->
    receive
        {PID, save, {Key, Value}} ->
            ?Log({Key, Value}),
            NewState = State#{Key => Value},
            ?Log(NewState),
            PID ! ok,
            store(NewState);
        Unknown ->
            ?Log(Unknown),
            store(State)
    end.

save(PID, Key, Value) ->
    PID ! {self(), save, {Key, Value}},
    receive
        Message -> ?Log(Message)
    end.

main(_) ->
    PID = spawn(?MODULE, store, [#{}]),
    save(PID, a, 10),
    save(PID, b, 20).
```


## get

get() を追加する。

```erlang
#!/usr/bin/env escript
-module(message).
-mode(compile).
-compile(export_all).

-include("../logger.hrl").

store(State) ->
    receive
        {PID, save, {Key, Value}} ->
            ?Log({Key, Value}),
            NewState = State#{Key => Value},
            ?Log(NewState),
            PID ! ok,
            store(NewState);
        {PID, get, Key} ->
            ?Log(Key),
            PID ! maps:get(Key, State),
            store(State);

        Unknown ->
            ?Log(Unknown),
            store(State)
    end.

save(PID, Key, Value) ->
    PID ! {self(), save, {Key, Value}},
    receive
        Message -> ?Log(Message)
    end.

get(PID, Key) ->
    PID ! {self(), get, Key},
    receive
        Message -> ?Log(Message)
    end.

main(_) ->
    PID = ?Log(spawn(?MODULE, store, [#{}])),
    save(PID, a, 10),
    save(PID, b, 20),
    get(PID, a),
    get(PID, b).
```
