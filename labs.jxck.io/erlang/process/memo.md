# erlang process

## escript

```erlang
#!/usr/bin/env escript
-module(store).
-mode(compile). % spawn するため
-compile(export_all).
-define(Log(A), (fun(P) -> io:format(standard_error, "[~p ~p:~p#~p]~n\t~p~n", [self(), ?MODULE, ?FUNCTION_NAME, ?LINE, P]), P end)(A)).

main(Arg) -> ?Log(Arg).
```

## spawn

spawn すると別の process ができて process id が返る。


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

store がメッセージを受け取り続けられるようにするには、再起すれば良い。

```erlang
store() ->
    receive
        {PID, Message} ->
            ?Log(Message),
            PID ! world,
            store(); % 再起
        Unknown ->
            ?Log(Unknown),
            store() % 再起
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
    ?Log(State),
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


## take

取得を行う take() を追加する。

```erlang
#!/usr/bin/env escript
-module(store).
-mode(compile).
-compile(export_all).

-include("../logger.hrl").

store(State) ->
    ?Log(State),
    receive
        {PID, save, {Key, Value}} ->
            ?Log({Key, Value}),
            NewState = State#{Key => Value},
            ?Log(NewState),
            PID ! ok,
            store(NewState);
        {PID, take, Key} ->
            ?Log(Key),
            PID ! maps:take(Key, State),
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

take(PID, Key) ->
    PID ! {self(), take, Key},
    receive
        Message -> ?Log(Message)
    end.

main(_) ->
    PID = ?Log(spawn(?MODULE, store, [#{}])),
    ?Log(save(PID, a, 10)),
    ?Log(save(PID, b, 20)),
    ?Log(take(PID, a)),
    ?Log(take(PID, b)).
```


## ref

save/take は同期処理となっており、返ってきたメッセージがリクエストしたものに対する結果であるかを保証したい。

ここで main は ref と呼ばれる値を生成しメッセージに含めて送る。

store は、レスポンスにその値をそのまま入れて返せば、 main は保持した ref と送られてきた ref を比べることができる。


```erlang
store(State) ->
    ?Log(State),
    receive
        {PID, Ref, save, {Key, Value}} ->
            ?Log({Key, Value}),
            NewState = State#{Key => Value},
            ?Log(NewState),
            PID ! {Ref, ok},
            store(NewState);
        {PID, Ref, take, Key} ->
            ?Log(Key),
            PID ! {Ref, maps:take(Key, State)},
            store(State);
        Unknown ->
            ?Log(Unknown),
            store(State)
    end.

save(PID, Key, Value) ->
    Ref = make_ref(),
    PID ! {self(), Ref, save, {Key, Value}},
    receive
        {Ref, Message} -> ?Log(Message)
    end.

take(PID, Key) ->
    Ref = make_ref(),
    PID ! {self(), Ref, take, Key},
    receive
        {Ref, Message} -> ?Log(Message)
    end.
```


こうした処理は、 store 側の再起動などを行った場合に、処理の競合を避けるためも使える。


## タイムアウト

store プロセスが busy 状態な場合は、 save()/take() が返信待ちでブロックしてしまう。
これを防ぐためにタイムアウトを仕込む。

ここでは固定で 1000ms とする。

```erlang
save(PID, Key, Value) ->
    Ref = make_ref(),
    PID ! {self(), Ref, save, {Key, Value}},
    receive
        {Ref, Message} -> ?Log(Message)
    after 1000 ->
              timeout
    end.
```


## monitor

store プロセスが落ちている場合は、 timeout まで待たずともすぐに処理を止めて次に進みたい。

そこで、プロセスを監視する monitor を使用する。

main から store を monitor すれば、 store が落ちたときに timeout まで待つ必要がなくなる。

erlang:monitor は ref を返すので、 make_ref を置き換えれば良い。


```erlang
save(PID, Key, Value) ->
    Ref = erlang:monitor(process, PID),
    PID ! {self(), Ref, save, {Key, Value}},
    receive
        {Ref, Message} ->
            erlang:demonitor(Ref, [flush]),
            ?Log(Message);
        {'DOWN', Ref, process, PID, _Reason} ->
            fail
    after 1000 ->
              timeout
    end.
```




## error

erlang:error

timeout と DOWN で erlang:error を使う。



```erlang
save(PID, Key, Value) ->
    Ref = erlang:monitor(process, PID),
    PID ! {self(), Ref, save, {Key, Value}},
    receive
        {Ref, Message} ->
            erlang:demonitor(Ref, [flush]),
            ?Log(Message);
        {'DOWN', Ref, process, PID, Reason} ->
            erlang:error(Reason)
    after 1000 ->
              erlang:error(timeout)
    end.
```




## 同期処理の共通化

save()/take() には同じような処理が多いので、これを切り出す。
ついでに、 timeout の時間も、オプションとして渡せるようにする。

```erlang
call(PID, Message, [{timeout, Timeout}]) ->
    Ref = erlang:monitor(process, PID),
    PID ! {self(), Ref, Message},
    receive
        {Ref, Reply} ->
            ?Log(Reply),
            erlang:demonitor(Ref, [flush]),
            Reply;
        {'DOWN', Ref, process, PID, Reason} ->
            erlang:error(Reason)
    after Timeout ->
              erlang:error(timeout)
    end.
```

これを使って書き直す。

```erlang
save(PID, Key, Value) ->
    call(PID, {save, Key, Value}, [{timeout, 1000}]).

take(PID, Key) ->
    call(PID, {take, Key}, [{timeout, 1000}]).
```


## ハンドラの共通化

store のハンドラも同じようなことをやっている。

また、全てを receive のコールバックに書いているため、これを関数に切り出す。


```erlang
store(State) ->
    ?Log(State),
    receive
        Message ->
            ?Log(Message),
            NewState = handle(Message, State),
            store(NewState)
    end.


handle({PID, Ref, {save, Key, Value}}, State) ->
    ?Log({save, Key, Value}),
    PID ! {Ref, ok},
    State#{Key => Value};

handle({PID, Ref, {take, Key}}, State) ->
    ?Log({take, Key}),
    PID ! {Ref, maps:take(Key, State)},
    State;

handle(Unknown, State) ->
    ?Log(Unknown, State).
```

receive のパターンマッチがそのまま関数のパターンマッチになる。



## reply

PID と Ref のやり取りも reply に切り出す。

```erlang
reply({PID, Ref}, Reply) ->
    PID ! {Ref, Reply}.
```

PID, Ref をタプルにすれば、中身を気にする必要がなくなる。

```erlang
handle({From, {save, Key, Value}}, State) ->
    ?Log({save, Key, Value}),
    reply(From, ok),
    State#{Key => Value};

handle({From, {take, Key}}, State) ->
    ?Log({take, Key}),
    reply(From, maps:take(Key, State)),
    State;

handle(Unknown, State) ->
    ?Log(Unknown, State).
```


## loop

store という関数を再起しているが、これはもう store に特化した処理は無い。
そこでこれを loop という汎用処理にする。


```erlang
start(State) ->
    ?Log(spawn(?MODULE, loop, State)).

loop(State) ->
    ?Log(State),
    receive
        Message ->
            ?Log(Message),
            NewState = handle(Message, State),
            loop(NewState)
    end.
```


## ロジックの分離

ここまで作ったファイルには、 3 つのものが混在している。

- store のハンドラロジック
- プロセス管理とメッセージハンドリング
- メイン処理

この 3 つを分離していく。

- store.erl:  ロジック
- server.erl: プロセス管理とメッセージハンドリング
- main:       メイン処理(.erl は消しておく)


escript はビルドしないので main から '.erl' を消しておくと楽になる。

```
store
|-- main
|-- server.erl
`-- store.erl
```

## store.erl

```erlang
-module(store).
-include("../../logger.hrl").

-compile(export_all).

handle({From, {save, Key, Value}}, State) ->
    ?Log({save, Key, Value}),
    server:reply(From, ok),
    State#{Key => Value};

handle({From, {take, Key}}, State) ->
    ?Log({take, Key}),
    server:reply(From, maps:take(Key, State)),
    State;

handle(Unknown, State) ->
    ?Log(Unknown, State).
```

store のロジックはこのハンドラを追加すれば良い。



## server.erl

loop の中で store のハンドラに処理を移譲することになる。

store のハンドラを呼び出す際に、 `store:handle` をハードコードすれば一応動く。


```erlang
start(State) ->
    ?Log(spawn(?MODULE, loop, State)).

loop(State) ->
    ?Log(State),
    receive
        Message ->
            ?Log(Message),
            NewState = store:handle(Message, State),
            loop(NewState)
    end.
```


しかし、これでは汎用にならないので、呼び出すハンドラのあるモジュールも引数で渡せるようにする。

```erlang
-module(server).

-include("../../logger.hrl").

-compile(export_all).

start(Module, State) ->
    ?Log(spawn(?MODULE, loop, [Module | State])).

loop(Module, State) ->
    ?Log(Module, State),
    receive
        Message ->
            ?Log(Message),
            NewState = Module:handle(Message, State),
            ?Log(NewState),
            loop(Module, NewState)
    end.

call(PID, Message, [{timeout, Timeout}]) ->
    Ref = erlang:monitor(process, PID),
    PID ! {{self(), Ref}, Message},
    receive
        {Ref, Reply} ->
            ?Log(Reply),
            erlang:demonitor(Ref, [flush]),
            Reply;
        {'DOWN', Ref, process, PID, Reason} ->
            erlang:error(Reason)
    after Timeout ->
              erlang:error(timeout)
    end.

reply({PID, Ref}, Reply) ->
    PID ! {Ref, Reply}.
```



## main

store を実行するが、実行するための一連の処理は全部 server に任せる。

server:start するときに 'store' というタプルを渡すことで、

実際には `store:handler` がメッセージに応じて呼び出される。


```erlang
#!/usr/bin/env escript
-mode(compile).
-compile(export_all).

-include("../../logger.hrl").

%% main
start_link(Module, State) ->
    ?Log(),
    server:start(Module, State).

save(PID, Key, Value) ->
    ?Log(PID, Key, Value),
    server:call(PID, {save, Key, Value}, [{timeout, 1000}]).

take(PID, Key) ->
    ?Log(),
    server:call(PID, {take, Key}, [{timeout, 1000}]).

main(_) ->
    PID = start_link(store, [#{}]),
    ?Log(save(PID, a, 10)),
    ?Log(save(PID, b, 20)),
    ?Log(take(PID, a)),
    ?Log(take(PID, b)).
```


## コンパイルと実行

server.erl と store.erl は erlc を使ってコンパイルする。

```
$ erlc *.erl
````

main はそのまま呼ぶ

```
$ ./main
```

モジュールはコンパイルされているので呼び出せる。


## supervisor

main は server が起動する loop のプロセスを経由して store の処理を呼んでいる。

もし loop のプロセスが落ちると、 main のメッセージが届かない。

そこで、 loop の死活を監視し、落ちたら再起動をする必要が有る。


### spawn_link

server が loop を spawn しているわけだが、 loop が落ちたことを server は知ることができない。

```erlang
start(Module, State) ->
    ?Log(spawn(?MODULE, loop, [Module | State])).
```

そこで、 loop と server を link させると loop が落ちたときに server が一緒に落ちるようになる。

link は、 spawn とは別に行うこともできるが、 spawn してから link するまでの間に落ちる可能性もある。

そこで、 spawn_link を用いてアトミックに行う。引数は spawn と同じ。


```erlang
PID = ?Log(spawn_link(?MODULE, loop, [#{}])),
```

### process_flag

link すると道連れで落ちると言ったが、正確には、特別なメッセージが伝搬されてきて、それを処理しないと落ちる。

このメッセージは、シグナルと呼ばれる。

```
{'EXIT', PID, Reason}
```

ここで、 server の中で prcess_flag() を実行すると、道連れで落ちる代わりにシグナルを receive できるようになる。

```erlang
process_flag(trap_exit, true),
PID = ?Log(spawn_link(?MODULE, loop, [#{}])),
receive
  {'EXIT', PID, Reason} -> ?Log(Reason)
end.
```

この receive のハンドラで、 loop を再起動すれば良い。
正常終了の場合は Reason が normal や shutdown になるため、この場合は何もしない。


```erlang
process_flag(trap_exit, true),
PID = ?Log(spawn_link(?MODULE, loop, [#{}])),
receive
  {'EXIT', PID, ok}     -> ok;
  {'EXIT', PID, normal} -> ok;
  {'EXIT', PID, Reason} ->
    ?Log(Reason),
    loop(#{})
end.
```

### supervisor




## Make

```Makefile
.SUFFIXES: .erl .beam

.erl.beam:
	erlc -W $<

MODS = store server main

all: compile
	erl -boot start_clean -noshell -s main main

compile: ${MODS:%=%.beam}

clean:
	rm -rf *.beam *.dump
```
