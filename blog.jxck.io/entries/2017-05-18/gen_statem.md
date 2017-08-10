# [erlang][gen_statem][gen_fsm] gen_fsm から gen_statem へ

## Intro

Erlang/OTP 19 から、 gen_fsm の後継として gen_statem が導入された。

OTP の内部でも ssl などはすでに gen_statem に移行している。

このビヘイビアの概要について記す。


### reference

- [gen_statem API](http://erlang.org/doc/man/gen_statem.html)
- [gen_statem Behavior](http://erlang.org/doc/design_principles/statem.html)


### caution

すでにかなり安定はしているが、軽微といえども非互換な変更が OTP 20 以降に発生する可能性があることがドキュメントに言及されている。

本記事は 19 時点での API ドキュメントをベースにしている。


## State Machine

特にサーバのようなプログラムでは、状態の管理が重要になる。

この状態の変化を、現在の状態(S)と発生したイベント(E)の組み合わせによって、実行する処理(A)と次の状態(S')とし、以下のようにモデル化する。


```
State(S) x Event(E) -> Actions(A), State(S')
```

これを、状態(S)を関数名とし、イベント(E)をパターンマッチで明示的に表現する gen_fsm ビヘイビアを用いて実装されることが多かった。

gen_statem は、この gen_fsm を強化したものとなっている。


## gen_fsm to gen_statem

まず、ビヘイビアの callback API が整理されている。

gen_fsm と似ているものの互換性が保たれているわけではない。

その上で追加された機能には以下のようなものがある。

- keep_state, repeat_state
- callback_mode/1
- postpone
- next_event
- state_enter
- format_status
- etc


## behavior

gen_fsm と gen_statem の behavior を比較する。


```
gen_fsm module                    Callback module
--------------                    ---------------
gen_fsm:start
gen_fsm:start_link                -----> Module:init/1

gen_fsm:stop                      -----> Module:terminate/3

gen_fsm:send_event                -----> Module:StateName/2

gen_fsm:send_all_state_event      -----> Module:handle_event/3

gen_fsm:sync_send_event           -----> Module:StateName/3

gen_fsm:sync_send_all_state_event -----> Module:handle_sync_event/4

-                                 -----> Module:handle_info/3

-                                 -----> Module:terminate/3

-                                 -----> Module:code_change/4
```


```
gen_statem module                        Callback module
-----------------                        ---------------
gen_statem:start
gen_statem:start_link             -----> Module:init/1

Server start or code change       -----> Module:callback_mode/0

gen_statem:stop                   -----> Module:terminate/3

gen_statem:call
gen_statem:cast
erlang:send
erlang:'!'                        -----> Module:StateName/3
                                         Module:handle_event/4

-                                 -----> Module:terminate/3

-                                 -----> Module:code_change/4
```

コールバックは減っていることがわかる。

大きいところとして、 gen_statem では、同期/非同期の使い分けが、 call/cast になっている。

そして、 Module:StateName/3 は引数の最初に Event Type を取り、ここで call/cast どちらで来たのかなどを受け取るようになった。 info の場合もここで分岐する。


```erlang
% Module:StateName(EventType, EventContent, Data) -> StateFunctionResult
hello({call, From}, eventname, Data) -> ...; % From は返答先
hello(cast, eventname, Data) -> ...;
hello(info, eventname, Data) -> ...;
```

EventType は後述するものも含めて 6 種類ある。

これにより、 Module:StateName/3 へのハンドラの統合がされている。

ハンドラの戻り値はいくつかの種類があるが、 gen_fsm で `Timeout`, `hibernate` などとしていたタプルの 4 番目がアクションとして整理された。


```erlang
{next_state, NextStateName, NewStateData}
{next_state, NextStateName, NewStateData, hibernate}
{next_state, NextStateName, NewStateData, Timeout}
```

gen_fsm のようにも書けるが、複数のアクション(tuple)を配列で書くことができる。


```erlang
{next_state, NextStateName, NewStateData}
{next_state, NextStateName, NewStateData, [{hibernate, true}]}
{next_state, NextStateName, NewStateData, [{timeout, Time, Data1}, {state_timeout, Time, Data}2]}
```

追加されたアクションについても一部後述する。


## keep_state

ハンドラの最後でステートを遷移しない場合、 gen_fsm では自身と同じステート名を明示的に指定していた。


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

これは後述する、 timeout などのアクションを使う際に、アクションは実行したいがステートは遷移したくないという場合に使える。


```erlang
% hello から遷移しない
hello(cast, Event, Data) ->
    {keep_state_and_data, [{timeout, 1000, world}]}.
```


## callback_mode

gen_statem では callback_mode/0 というビヘイビアが追加された。

これは、コールバックの実装方法を指定するもので、 gen_fsm のように atom でステートに名前をつけ、対応する関数を実装するスタイルは `state_functions` になる。


```erlang
callback_mode() -> state_functions.
```


## handle_event_function

gen_fsm では、ステートには atom で名前をつけるスタイルをとった。

しかし、なんらかのデータコンテナの値などをステートとして扱いたい場合 atom ではなくそのパターンマッチをそのままステートとして持つ方が便利な場合もある。

callback_mode/0 で `handle_event_function` を返すと、ステート名を atom 以外の任意の値にすることができる。


```erlang
callback_mode() -> handle_event_function.
```

コールバックは `handle_event` 1 種類になり、この関数の引数のマッチでステートを表す。


```erlang
handle_event(EventType, EventContent, State, Data)
```

これにより Map や record などを用いたデータへのパターンマッチなどを使って複雑な状態を表現することができる。


```erlang
% data が空という状態
handle_event(#{data := []}, EventContent, State, Data) -> ...;

% data が [1,2,3] という状態
handle_event(#{data := [1,2,3]}, EventContent, State, Data) -> ...;
```


## State Enter Calls

`callback_mode` で `state_enter` を追加すると、状態遷移時に一度実行される State Enter Call を実行できる。


```erlang
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

サーバ実装などにおいては、相手からの応答のタイムアウトや、トークンの期限など、タイムアウトのモデルは非常に重要だ。

gen_fsm よりも強化されており、 gen_statem を使う大きなモチベーションの 1 つと感じる。


### Timeout Event

以下のようなアクションを返すと、イベントタイムアウトが開始される。


```erlang
{next_state, NextState, Data, 10000}
{next_state, NextState, Data, [{timeout, 10000, EventContent}]}
```

1000ms 以内に次のイベントが無ければ Timeout イベントが上がる。


```erlang
NextState(timeout, Context, Data)
```

どんなイベントが発生してもこのタイマーはキャンセルされる。


### State Timeout Event

以下のようなアクションを返すと、ステートタイムアウトが開始される。


```erlang
{next_state, NextState, Data, [{state_timeout, 10000, EventContent}]}
```

1000ms 以内にステートが遷移しなければ Timeout イベントが上がる。


```erlang
NextState(state_timeout, Context, Data)
```

どんな状態に遷移していもこのタイマーはキャンセルされる。


### Erlang Timer

イベントやステートの変化などをまたぐ、独立したタイマーを自前で管理したい場合、ハンドラ内で erlang:start_timer/3 を用いてタイマーを作り、それを保持しておく。


```erlang
Timer = erlang:start_timer(1000, self(), Data)
```

このタイマーのタイムアウトが発生すると、その時いるステートでタイムアウトイベントが上がる。


```erlang
NextState(info, {timeout, Timer, Data}, Data)
```

キャンセルも自前で行う。


```erlang
erlang:cancel_timer(Timer)
```


## Postponing

発生したイベントを先送りすることができるアクション。

先送りしたイベントはキューに積まれ、状態が遷移したら再度順番に再生される。


```erlang
{keep_state, Data, [postpone]}
```


## Self Generated Events

ステートマシン内部から、自身に対してイベントを送信することができる。

gen_fsm では、イベントは gen_statem を用いて発行する以外になかったが、コールバック処理の結果別のイベントを発生したい場合がある。

gen_statem では、以下のような `next_event` アクションを返すことで、内部からイベントを発行できる。


```erlang
{keep_state, Data, [{reply, From, ok}, {next_event, cast, Arg}]};
```

call, info などすべての EventType は、 `next_event` で送ることができ、外部からのイベントと同じように扱うことができる。


## internal event

`internal` という EventType があり、これは `next_event` でしか送ることができないようになっている。


```erlang
{keep_state, Data, [{reply, From, ok}, {next_event, internal, Arg}]};
```

逆をいえば、 `internal` は外部から送られてくることが無いため、内部で発生した Self Generated イベントであることが保証できる。

他の EventType は `next_event` で来たものか、外から来たものか区別ができないため、イベントを内部に閉じたい場合に利用することができる。


## Module:format_status/2

sys:get_status/1,2 や teminate 時のダンプなどで出力される State の値を、事前に加工できるフックが導入された。

オプションなので、 Export されていなくても良い。

状態が大きい場合に重要な情報だけに絞る、もしくは機密情報が出力されるのを防ぐ目的などで使われる。
