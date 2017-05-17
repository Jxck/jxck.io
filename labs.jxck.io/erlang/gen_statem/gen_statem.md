# [erlang][gen_statem] gen_fsm から gen_statem へ

## Intro

Erlang/OTP 19 から、 gen_fsm の後継として gen_statem が導入された。

OTP の内部でも ssl などはすでに gen_statem に移行している。

このビヘイビアの概要について記す。


## 注意

すでにかなり安定はしているが、軽微といえども非互換な変更が OTP 20 以降に発生する可能性があることがドキュメントに言及されている。

本記事は、 19 時点での API ドキュメントをベースにしている。


## State Machine

特にサーバのようなプログラムでは、状態の管理が重要になる。
gen_server でも、状態を引数に保持し、パターンマッチで状態遷移を表現することはできる。

しかし、現在の状態(S)と、発生したイベント(E)の組み合わせによって、実行する処理(A)と次の状態(S')を以下のようにモデル化した場合、

```erlang
State(S) x Event(E) -> Actions(A), State(S')
```


これを実装する上では、 gen_server で汎用イベントを分岐して処理すると、コードは複雑になる。

そこで、状態(S)を関数名とし、イベント(E)をパターンマッチで明示的に表現する gen_fsm ビヘイビアを用いて実装されることが多かった。


## gen_fsm to gen_statem

gen_statem は gen_fsm と使用感は近く、これに機能を追加している。

- atom 以外の複雑な型の状態を定義できる
- イベントの遅延ができる
- イベントを自己生成できる
- 状態が遷移した時に実行される enter code を定義できる
- etc

















## handle_event

状態名を atom 以外の任意の値にすることができる。


`handle_event(EventType, EventContent, State, Data)`


これにより Map などを用いたデータへのパターンマッチで複雑な状態を表現することができる。



## Timeout

gen_statem の中でのタイムアウトは主に 3 つの方法がある。


### Timeout Event

`{next_state, NextState, Data, [{timeout, 10000, EventContent}]}` を返すと、 NextState に移ってから 1000ms 後に Timeout イベントが上がる。

`NextState(timeout, Context, Data)` などでハンドルする。


### State Timeout Event

`{next_state, NextState, Data, [{state_timeout, 1000, EventContent}]}` を返すと、 NextState に遷移後 1000 秒後に EventC


`NextState(state_timeout, Context, Data)` などでハンドルする。


### Erlang Timer

```
Timer = erlang:start_timer(1000, self(), Data)
```

などとしてタイマーを作り、それをデータに保持しておく。

このタイマーのタイムアウトが発生すると、 `NextState(info, {timeout, Timer, Data}, Data)` どの状態でもハンドルできる。

キャンセルも `erlang:cancel_timer(Timer)` で自前で行う。




## State Enter Calls

callback_mode で state_enter を追加すると、状態遷移時に一度実行される enter ハンドラを実行できる。


```
callback_mode() ->
    [state_functions, state_enter].


StateName(enter, OldState, Data) ->
    keep_state_and_data;
```

すべてのイベントで enter のハンドラ実装が必要になる。


`{repeat_state, ...}`, `{repeat_state_and_data, _}`, `repeat_state_and_data` などを返すことで、同じ enter call を繰り返すことができる。



## Postponing

発生したイベントを先送りすることができる。
先送りしたイベントはキューに積まれ、状態が遷移したら再度順番に再生される。


```
{keep_state, Data, [postpone]}
```



## Self Generated Events

```
{next_event, EventType, EventContent}
```




