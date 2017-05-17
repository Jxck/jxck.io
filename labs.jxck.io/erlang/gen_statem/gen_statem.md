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

- keep_state, repeat_state
- callback_mode/1
- postpone
- next_event
- state_enter
- etc




## keep_state

ハンドラの最後で状態を遷移しない場合、 gen_fsm では自身と同じ状態名を明示的に指定していた。

```erlang
% hello から遷移しない
hello(Event, Data) ->
    {next_state, hello, Data}.
```

これを明示的に表すのに keep_state が使える。


```erlang
% hello から遷移しない
hello(cast, Event, Data) ->
    {keep_state, Data}.
```

データまで同じなら keep_state_and_data だけで良い。


```erlang
% hello から遷移しない
hello(cast, Event, Data) ->
    keep_state_and_data.
```

これは後述する、 timeout などのアクションを使う際に、アクションは実行したいが状態は遷移したくないという場合に使える。


```erlang
% hello から遷移しない
hello(cast, Event, Data) ->
    {keep_state_and_data, [{timeout, 1000, world}]}.
```


## callback_mode

gen_statem では callback_mode/0 というビヘイビアが追加された。
これは、コールバックの実装方法を指定するもので、 gen_fsm のように atom で状態に名前をつけ、対応する関数を実装するスタイルは `state_functions` になる。

したがって、以下のように実装すると、 gen_fsm と似たスタイルになる。


```
callback_mode() -> state_functions
```


## handle_event_function

gen_fsm では、状態には atom で名前をつけるスタイルをとった。
しかし、なんらかのデータコンテナの値などを状態として扱いたい場合、atom ではなくそのパターンマッチをそのまま状態として持つ方が便利な場合もある。

callback_mode/0 で `handle_event_function` を返すと、状態名を atom 以外の任意の値にすることができる。

```
callback_mode() -> handle_event_function.
```

コールバックは `handle_event` 1 種類になり、この関数の引数のマッチで状態を表す。


```
handle_event(EventType, EventContent, State, Data)
```

これにより Map や record などを用いたデータへのパターンマッチなどを使って複雑な状態を表現することができる。


```
% data が空という状態
handle_event(#{data := []}, EventContent, State, Data) -> ...;

% data が [1,2,3] という状態
handle_event(#{data := [1,2,3]}, EventContent, State, Data) -> ...;
```


## State Enter Calls

callback_mode で state_enter を追加すると、状態遷移時に一度実行される State Enter Call を実行できる。


```
callback_mode() ->
    [state_functions, state_enter].


StateName(enter, OldState, Data) ->
    % この状態に入ったとき最初に必ず一回実行される
    {keep_state_and_data, [{state_timeout, 5000, SomeState}]};
StateName(cast, OldState, Data) ->
    {next_state, SomeState, Data}.
```


このモードが有効な場合は、すべてのイベントで enter のハンドラ実装が必要になる。

また、 State Enter Call 内では `keep_state` に似た `repeat_state` を呼び出すことで、同じ State Enter Call を繰り返し実行することもできる。

State Enter Call 以外で呼びだした `repeat_state` は `keep_state` と等価。


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


## Postponing

発生したイベントを先送りすることができるアクション。
先送りしたイベントはキューに積まれ、状態が遷移したら再度順番に再生される。


```
{keep_state, Data, [postpone]}
```


## Self Generated Events

ステートマシン内部から、自身に対してイベントを送信することができる。

gen_fsm では、イベントは gen_statem を用いて発行する以外になかったが、コールバック処理の結果別のステートに移りたい場合がある。

gen_statem では、以下のような next_event アクションを返すことで、内部からイベントを発行できる。


```
{keep_state, Data, [{reply, From, ok}, {next_event, cast, Arg}]};
```

call, info などすべての EventType は、 next_event で送ることができ、外部からのイベントと同じように扱うことができる。


## internal event

internal という EventType があり、これは next_event でしか送ることができないようになっている。

```
{keep_state, Data, [{reply, From, ok}, {next_event, internal, Arg}]};
```


逆をいえば、 internal は外部から送られてくることが無いため、内部で発生した Self Generated イベントであることが保証できる。

他の EventType は next_event で来たものか、外から来たものか区別ができないため、イベントを内部に閉じたい場合に利用することができる。
