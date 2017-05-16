# MODULE

gen_statem

## MODULE SUMMARY

Generic state machine behavior.

## DESCRIPTION

This behavior module provides a state machine. Two callback modes are supported:

この動作モジュールは状態機械を提供する。 2 つの コールバックモード がサポートされています:


One for finite-state machines (gen_fsm like), which requires the state to be an atom and uses that state as the name of the current callback function

1 つは有限状態機械(gen_fsm のような)のためのものであり、状態を atom にし、その状態を現在のコールバック関数の名前として使用する


One without restriction on the state data type that uses one callback function for all states

もう一つは、すべての状態に対して 1 つのコールバック関数を使用する状態データ型に制限のないもの


## Note

This is a new behavior in Erlang/OTP 19.0. It has been thoroughly reviewed, is stable enough to be used by at least two heavy OTP applications, and is here to stay. Depending on user feedback, we do not expect but can find it necessary to make minor not backward compatible changes into Erlang/OTP 20.0.

これは、 Erlang/OTP 19.0 の新しい動作です。それは徹底的にレビューされ、少なくとも 2 つの重い OTP アプリケーションで使用するのに十分安定しており、ここに滞在しています。ユーザーからのフィードバックによると、期待はしていませんが、 Erlang/OTP 20.0 への後方互換性のない変更を軽微にする必要があります。


The gen_statem behavior is intended to replace gen_fsm for new code. It has the same features and adds some really useful:

gen_statem 動作が代わることを意図している gen_fsm を新しいコードのために。それは同じ機能を持ち、本当に便利なものを追加します:


- State code is gathered.
- The state can be any term.
- Events can be postponed.
- Events can be self-generated.
- Automatic state enter code can be called.
- A reply can be sent from a later state.
- There can be multiple sys traceable replies.


- 状態コードが集められます。
- 状態は任意の型(atom 以外)にすることができます。
- イベントを延期することができます。
- イベントは自己生成することができます。
- 状態への enter コードを自動で呼び出すことができます。
- 応答は後の状態から送信することができます。
- 複数の sys トレーサブルな応答がある可能性があります。

The callback model(s) for gen_statem differs from the one for gen_fsm, but it is still fairly easy to rewrite from gen_fsm to gen_statem.

gen_statem のコールバックモデルは、 gen_fsm のものと異なっているが、まだ gen_fsm から gen_statem への書き直すことが非常に簡単です。


A generic state machine process (gen_statem) implemented using this module has a standard set of interface functions and includes functionality for tracing and error reporting. It also fits into an OTP supervision tree. For more information, see OTP Design Principles.

このモジュールを使用して実装される ジェネリックステートマシンプロセス(gen_statem)には、標準的なインターフェイス関数セットがあり、トレースおよびエラーレポートの機能が含まれています。また、 OTP 監督ツリーにも適合します。詳細については、「OTP 設計の原則」を参照してください 。


A gen_statem assumes all specific parts to be located in a callback module exporting a predefined set of functions. The relationship between the behavior functions and the callback functions is as follows:

gen_statem は、関数の所定のセットをエクスポートコールバックモジュールに配置されるすべての特定の部分を想定しています。ビヘイビア関数とコールバック関数の関係は次のとおりです。


```
gen_statem module            Callback module
-----------------            ---------------
gen_statem:start
gen_statem:start_link -----> Module:init/1

Server start or code change
                      -----> Module:callback_mode/0

gen_statem:stop       -----> Module:terminate/3

gen_statem:call
gen_statem:cast
erlang:send
erlang:'!'            -----> Module:StateName/3
                             Module:handle_event/4

-                     -----> Module:terminate/3

-                     -----> Module:code_change/4
```

Events are of different types, so the callback functions can know the origin of an event and how to respond.

イベントはさまざま なタイプのものであるため、コールバック関数はイベントの起点と応答方法を知ることができます。


If a callback function fails or returns a bad value, the gen_statem terminates, unless otherwise stated. However, an exception of class throw is not regarded as an error but as a valid return from all callback functions.

コールバック関数が失敗したか、不正な値を返す場合、 gen_statem は特に断りのない限り終了します。ただし、クラススローの例外はエラーではなく、すべてのコールバック関数からの有効な戻り値とみなされます。


The "state callback" for a specific state in a gen_statem is the callback function that is called for all events in this state. It is selected depending on which callback mode that the callback module defines with the callback function Module:callback_mode/0.

gen_statem 内の特定の状態に対する 「状態コールバック」は、 この状態のすべてのイベントに対して呼び出されるコールバック関数です。これは、コールバックモジュールがコールバック関数 Module:callback_mode/0 で定義するコールバックモードに応じて選択されます。


When the callback mode is state_functions, the state must be an atom and is used as the state callback name; see Module:StateName/3. This gathers all code for a specific state in one function as the gen_statem engine branches depending on state name. Notice the fact that there is a mandatory callback function Module:terminate/3 makes the state name terminate unusable in this mode.

コールバックモードが state_functions の場合、状態は atom でなければならず、状態のコールバック名として使用されます。 Module:StateName/3 を参照してください 。これにより、状態名に応じて gen_statem エンジンが分岐するため、特定の状態のすべてのコードが 1 つの関数に集約されます。必須のコールバック関数があることに注意してください。 Module :terminate/3 は、このモードで状態名を終了することを不可能にします。


When the callback mode is handle_event_function, the state can be any term and the state callback name is Module:handle_event/4. This makes it easy to branch depending on state or event as you desire. Be careful about which events you handle in which states so that you do not accidentally postpone an event forever creating an infinite busy loop.

コールバックモードが handle_event_function の場合、状態は、任意の型にすることができ、状態のコールバック名は Module:handle_event/4 です。これにより、必要に応じて状態やイベントに応じて簡単に分岐することができます。どの状態でどのイベントを処理するか注意してください。そうすれば、無限のビジーループを永久に作成して間違ってイベントを延期することはありません。


The gen_statem enqueues incoming events in order of arrival and presents these to the state callback in that order. The state callback can postpone an event so it is not retried in the current state. After a state change the queue restarts with the postponed events.

gen_statem は到着順に着信イベントをエンキューし、これらを状態コールバックに順番に渡します。状態コールバックは、現在の状態で再試行されないようにイベントを延期することができます。状態が変更されると、キューは延期されたイベントで再開します。


The gen_statem event queue model is sufficient to emulate the normal process message queue with selective receive. Postponing an event corresponds to not matching it in a receive statement, and changing states corresponds to entering a new receive statement.

gen_statem イベントキューモデルは、選択的に受信して通常の処理メッセージキューをエミュレートするのに十分です。イベントを延期することは、 receive ステートメントでまっちしないことに対応し、状態を変更することは、新しい receive ステートメントを入力することに対応する。


TODO:
The state callback can insert events using the `action()` next_event and such an event is inserted as the next to present to the state callback. That is, as if it is the oldest incoming event. A dedicated `event_type()` internal can be used for such events making them impossible to mistake for external events.

状態コールバックは `action()` を使用してイベントを挿入することができます `action()` next_event 、そのようなイベントは状態コールバックに提供するように次のように挿入されています。つまり、それが最古の着信イベントであるかのようになります。専用の event_type() 内部イベントを使用すると、外部イベントを間違えることはありません。


TODO:
Inserting an event replaces the trick of calling your own state handling functions that you often would have to resort to in, for example, gen_fsm to force processing an inserted event before others.

イベントを挿入すると、頻繁に使用する必要のある独自の状態処理関数を呼び出すトリックが置き換えられます(たとえば、 gen_fsm など)。


The gen_statem engine can automatically make a specialized call to the state callback whenever a new state is entered; see `state_enter()`. This is for writing code common to all state entries. Another way to do it is to insert events at state transitions, but you have to do so everywhere it is needed.

gen_statem のエンジンが自動的に特化したコールすることができます 状態コールバックを 新しい状態に入った時はいつでも。 `state_enter()` を参照してください 。これは、すべての状態エントリに共通するコードを記述するためのものです。これを行うもう 1 つの方法は、状態遷移でイベントを挿入することですが、必要なときはいつでもイベントを挿入する必要があります。


## Note

If you in gen_statem, for example, postpone an event in one state and then call another state callback of yours, you have not changed states and hence the postponed event is not retried, which is logical but can be confusing.

gen_statem では、例えば、一つの状態でイベントを延期して、別の状態コールバックを呼び出して、状態を変更していない場合、延期イベントは再試行されていません。理論上正しいですが、混乱することがあるので、注意が必要です。


For the details of a state transition, see type transition_option().

状態遷移の詳細については、 `transition_option()` を参照してください。


A gen_statem handles system messages as described in sys. The sys module can be used for debugging a gen_statem.

gen_statem は sys で説明したようにシステムメッセージを処理します。 sys モジュールは gen_statem をデバッグに使用することができます。


Notice that a gen_statem does not trap exit signals automatically, this must be explicitly initiated in the callback module (by calling process_flag(trap_exit, true).

gen_statem は自動的に trap exit しないことに注意してください、これはコールバックモジュールで(process_flag(trap_exit, true) を)明示的に呼び出す必要があります。


Unless otherwise stated, all functions in this module fail if the specified gen_statem does not exist or if bad arguments are specified.

特に指定のない限り、指定された gen_statem が存在しないか、不正な引数が指定されていると、このモジュールのすべての関数が失敗します。


The gen_statem process can go into hibernation; see proc_lib:hibernate/3. It is done when a state callback or Module:init/1 specifies hibernate in the returned Actions list. This feature can be useful to reclaim process heap memory while the server is expected to be idle for a long time. However, use this feature with care, as hibernation can be too costly to use after every event; see erlang:hibernate/3.

gen_statem のプロセスは hibernation に入ることができます。 proc_lib:hibernate/3 を参照してください。これは状態コールバックか Module:init/1 が戻すアクションリストに hibernate が指定されている場合行われます。この機能は、サーバーが長期間アイドル状態になると予想される間にプロセスヒープメモリーを再利用するのに便利です。ただし、ハイバネーションはすべてのイベント後に使用するにはコストがかかる可能性があるため、この機能を注意して使用してください。 erlang:hibernate/3 を参照してください。


## Example

The following example shows a simple pushbutton model for a toggling pushbutton implemented with callback mode state_functions. You can push the button and it replies if it went on or off, and you can ask for a count of how many times it has been pushed to switch on.

次の例は、コールバックモード state_functions で実装されたトグルプッシュボタンの単純なプッシュボタンモデルを示しています。あなたはボタンを押すことができ、それがオンまたはオフになった場合に応答し、スイッチが押された回数をカウントすることができます。


The following is the complete callback module file pushbutton.erl:

以下は完全なコールバックモジュールファイル pushbutton.erl です:


```erlang
-module(pushbutton).
-behaviour(gen_statem).

-export([start/0, push/0, get_count/0, stop/0]).
-export([terminate/3, code_change/4, init/1, callback_mode/0]).
-export([on/3, off/3]).

name() -> pushbutton_statem. % The registered server name

%% API.  This example uses a registered name name()
%% and does not link to the caller.
start() ->
    gen_statem:start({local, name()}, ?MODULE, [], []).
push() ->
    gen_statem:call(name(), push).
get_count() ->
    gen_statem:call(name(), get_count).
stop() ->
    gen_statem:stop(name()).

%% Mandatory callback functions
terminate(_Reason, _State, _Data) ->
    void.
code_change(_Vsn, State, Data, _Extra) ->
    {ok, State, Data}.
init([]) ->
    %% Set the initial state + data.  Data is used only as a counter.
    State = off, Data = 0,
    {ok, State, Data}.
callback_mode() -> state_functions.

%%% state callback(s)

off({call, From}, push, Data) ->
    %% Go to 'on', increment count and reply
    %% that the resulting status is 'on'
    {next_state, on, Data+1, [{reply, From, on}]};
off(EventType, EventContent, Data) ->
    handle_event(EventType, EventContent, Data).

on({call, From}, push, Data) ->
    %% Go to 'off' and reply that the resulting status is 'off'
    {next_state, off, Data, [{reply, From, off}]};
on(EventType, EventContent, Data) ->
    handle_event(EventType, EventContent, Data).

%% Handle events common to all states
handle_event({call, From}, get_count, Data) ->
    %% Reply with the current count
    {keep_state, Data, [{reply, From, Data}]};
handle_event(_, _, Data) ->
    %% Ignore all other events
    {keep_state, Data}.
```

The following is a shell session when running it:

```
1> pushbutton:start().
{ok, <0.36.0>}
2> pushbutton:get_count().
0
3> pushbutton:push().
on
4> pushbutton:get_count().
1
5> pushbutton:push().
off
6> pushbutton:get_count().
1
7> pushbutton:stop().
ok
8> pushbutton:push().
** exception exit: {noproc, {gen_statem, call, [pushbutton_statem, push, infinity]}}
     in function  gen:do_for_proc/2 (gen.erl, line 261)
     in call from gen_statem:call/3 (gen_statem.erl, line 386)
```

To compare styles, here follows the same example using callback mode state_functions, or rather the code to replace after function init/1 of the pushbutton.erl example file above:

スタイルを比較するために、ここで使用した同じ例を次の コールバックモード state_functions 関数の後に交換する、またはむしろコードを init/1 の pushbutton.erl 上記の例のファイル:


```erlang
callback_mode() -> handle_event_function.

%%% state callback(s)

handle_event({call, From}, push, off, Data) ->
    %% Go to 'on', increment count and reply
    %% that the resulting status is 'on'
    {next_state, on, Data+1, [{reply, From, on}]};
handle_event({call, From}, push, on, Data) ->
    %% Go to 'off' and reply that the resulting status is 'off'
    {next_state, off, Data, [{reply, From, off}]};
%%
%% Event handling common to all states
handle_event({call, From}, get_count, State, Data) ->
    %% Reply with the current count
    {next_state, State, Data, [{reply, From, Data}]};
handle_event(_, _, State, Data) ->
    %% Ignore all other events
    {next_state, State, Data}.
```

## DATA TYPES

```
server_name() =
    {global, GlobalName :: term()} |
    {via, RegMod :: module(), Name :: term()} |
    {local, atom()}
```

Name specification to use when starting a gen_statem server. See start_link/3 and server_ref() below.

```
server_ref() =
    pid() |
    (LocalName :: atom()) |
    {Name :: atom(), Node :: atom()} |
    {global, GlobalName :: term()} |
    {via, RegMod :: module(), ViaName :: term()}
```

Server specification to use when addressing a gen_statem server. See call/2 and server_name() above.

It can be:

pid() | LocalName
The gen_statem is locally registered.

{Name, Node}
The gen_statem is locally registered on another node.

{global, GlobalName}
The gen_statem is globally registered in global.

{via, RegMod, ViaName}
The gen_statem is registered in an alternative process registry. The registry callback module RegMod is to export functions register_name/2, unregister_name/1, whereis_name/1, and send/2, which are to behave like the corresponding functions in global. Thus, `{via, global, GlobalName}` is the same as `{global, GlobalName}`.

gen_statem は、代替プロセスレジストリに登録されています。レジストリコールバックモジュール RegMod は、関数がエクスポートする register_name/2 、 unregister_name/1 、 whereis_name/1 、及び send/2 に対応するグローバル関数のように動作するようにされます。したがって、`{via, global, GlobalName}` は `{global, GlobalName}` と同じです。

```
debug_opt() =
    {debug,
     Dbgs ::
         [trace | log | statistics | debug | {logfile, string()}]}
```

Debug option that can be used when starting a gen_statem server through, enter_loop/4-6.

gen_statem サーバの起動時に、 enter_loop/4-6 を使用する際に使用できるデバッグオプション。


For every entry in Dbgs, the corresponding function in sys is called.

Dbg の すべてのエントリに対して、 sys の対応する関数が呼び出されます。


```
start_opt() =
    debug_opt() |
    {timeout, Time :: timeout()} |
    {spawn_opt, [proc_lib:spawn_option()]}
```

Options that can be used when starting a gen_statem server through, for example, start_link/3.

```
start_ret() = {ok, pid()} | ignore | {error, term()}
```

Return value from the start functions, for example, start_link/3.

```
from() = {To :: pid(), Tag :: term()}
```

Destination to use when replying through, for example, the action() `{reply, From, Reply}` to a process that has called the gen_statem server using call/2.

```
state() = state_name() | term()
```

If the callback mode is handle_event_function, the state can be any term. After a state change (NextState =/= State), all postponed events are retried.

```
state_name() = atom()
```

If the callback mode is state_functions, the state must be of this type. After a state change (NextState =/= State), all postponed events are retried.

```
data() = term()
```

A term in which the state machine implementation is to store any server data it needs. The difference between this and the state() itself is that a change in this data does not cause postponed events to be retried. Hence, if a change in this data would change the set of events that are handled, then that data item is to be made a part of the state.

ステートマシン実装が必要とする任意のサーバーデータを格納する値。これと `state()` の違いは、このデータを変更しても延期されたイベントは再試行されないということです。したがって、このデータの変更によって処理されるイベントのセットが変更された場合、そのデータ項目は状態の一部になります。


```
event_type() =
    `{call, From :: from()} |
    cast |
    info |
    timeout |
    state_timeout |
    internal
```

External events are of three types: `{call, From}`, cast, or info. Calls (synchronous) and casts originate from the corresponding API functions. For calls, the event contains whom to reply to. Type info originates from regular process messages sent to the gen_statem. Also, the state machine implementation can generate events of types timeout, state_timeout, and internal to itself.

外部イベントには `{call, From}` , `cast`, `info` という 3 つのタイプがあります。 call (同期)と cast は、対応する API 関数から発生します。コールの場合、イベントには返信先が含まれます。タイプ情報は、 gen_statem に送信される通常のプロセスメッセージから発生します。また、ステートマシンの実装では、 `timeout`, `state_timeout`, および `internal` のイベントを生成できます。

```
callback_mode_result() =
    callback_mode() | [callback_mode() | state_enter()]
```

This is the return type from Module:callback_mode/0 and selects callback mode and whether to do state enter calls, or not.

これは Module:callback_mode/0 の戻り値の型で、コールバックモードと状態入力呼び出しを行うかどうかを選択します。


```
callback_mode() = state_functions | handle_event_function
```

The callback mode is selected when starting the gen_statem and after code change using the return value from Module:callback_mode/0.

state_functions
  The state must be of type state_name() and one callback function per state, that is, Module:StateName/3, is used.
  状態は `state_name()` 型であり、状態ごとに 1 つのコールバック関数、つまり Module:StateName/3 が使用されている必要があります。


handle_event_function
  The state can be any term and the callback function Module:handle_event/4 is used for all states.
  状態には任意の用語を使用でき、コールバック関数 Module:handle_event/4 はすべての状態で使用されます。


```
state_enter() = state_enter
```

Whether the state machine should use state enter calls or not is selected when starting the gen_statem and after code change using the return value from Module:callback_mode/0.

Module:callback_mode/0 からの戻り値を使用して、 gen_statem を開始し、コード変更後に状態マシンが状態入力呼び出しを使用するかどうかを選択するかどうかを選択します。


If Module:callback_mode/0 returns a list containing state_enter, the gen_statem engine will, at every state change, call the state callback with arguments (enter, OldState, Data). This may look like an event but is really a call performed after the previous state callback returned and before any event is delivered to the new state callback. See Module:StateName/3 and Module:handle_event/4. Such a call can be repeated by returning a repeat_state or repeat_state_and_data tuple from the state callback.

もし Module:callback_mode/0 が state_enter を含むリストを返す場合、 gen_statem のエンジンは、すべての状態変化で、状態コールバックを `(enter, OldState, Data)` を引数に呼び出します。これはイベントのように見えるかもしれませんが、実際には前の状態コールバックが返された後、そして新しいイベントコールバックにイベントが送られる前に実行される呼び出しです。 Module:StateName/3 および Module:handle_event/4 を参照してください。このような呼び出しは、ステートコールバックから repeat_state または repeat_state_and_data タプルを返すことによって繰り返すことができます。


If Module:callback_mode/0 does not return such a list, no state enter calls are done.

Module:callback_mode/0 が、このようなリストを返さない場合、状態 enter は呼ばれません。


If Module:code_change/4 should transform the state to a state with a different name it is still regarded as the same state so this does not cause a state enter call.

Module:code_change/4 が、それはまだ同じ状態とみなされている別の名前で状態へ変換する必要があるので、この状態がコールに入ることはありません。


Note that a state enter call will be done right before entering the initial state even though this formally is not a state change. In this case OldState will be the same as State, which can not happen for a subsequent state change, but will happen when repeating the state enter call.

状態入力コールは、正式な状態変更ではないにもかかわらず、初期状態に入る直前に行われることに注意してください。この場合、 OldState は State と同じになります。これは後続の状態変更では発生しませんが、状態 enter 呼び出しを繰り返すと発生します。


```
transition_option() =
    postpone() | hibernate() | event_timeout() | state_timeout()
```

Transition options can be set by actions and they modify how the state transition is done:

遷移オプションはアクションによって設定することができ 、状態遷移の仕方を変更します。

- If the state changes, is the initial state, repeat_state or repeat_state_and_data is used, and also state enter calls are used, the gen_statem calls the new state callback with arguments (enter, OldState, Data). Any actions returned from this call are handled as if they were appended to the actions returned by the state callback that changed states.
- All actions are processed in order of appearance.
- If postpone() is true, the current event is postponed.
- If the state changes, the queue of incoming events is reset to start with the oldest postponed.
- All events stored with action() next_event are inserted to be processed before the other queued events.
- Timeout timers state_timeout() and event_timeout() are handled. Time-outs with zero time are guaranteed to be delivered to the state machine before any external not yet received event so if there is such a timeout requested, the corresponding time-out zero event is enqueued as the newest event.
- Any event cancels an event_timeout() so a zero time event time-out is only generated if the event queue is empty.
- A state change cancels a state_timeout() and any new transition option of this type belongs to the new state.
- If there are enqueued events the state callback for the possibly new state is called with the oldest enqueued event, and we start again from the top of this list.
- Otherwise the gen_statem goes into receive or hibernation (if hibernate() is true) to wait for the next message. In hibernation the next non-system event awakens the gen_statem, or rather the next incoming message awakens the gen_statem, but if it is a system event it goes right back into hibernation. When a new message arrives the state callback is called with the corresponding event, and we start again from the top of this list.


- 状態が変化した場合、初期状態 repeat_state または repeat_state_and_data が使用され、 状態入力呼び出しが使用され、 gen_statem は新しい状態コールバックを引数 `(enter, OldState, Data)` で呼び出します。任意の アクション 彼らは状態を変え状態コールバックによって返されたアクションに追加されたかのように、この呼び出しから返さが処理されます。
- すべての アクション は、出現順に処理されます。
- `postpone()` が true の場合、現在のイベントが延期されます。
- 状態が変化すると、着信イベントの待ち行列がリセットされ、最も古い延期で開始されます。
- `action()` next_event で 保存されたすべてのイベント は、他のキューに入れられたイベントの前に処理されるように挿入されます。
- タイムアウトタイマー `state_timeout()` および `event_timeout()` が処理されます。ゼロ時間を有するタイムアウトは、外部未受信イベントの前に状態機械に供給されることが保証されているので、そのようなタイムアウトが要求された場合、対応するタイムアウトゼロイベントは最新のイベントとしてエンキューされる。
- すべてのイベントは `event_timeout()` をキャンセルし、イベントキューが空の場合、タイムアウトイベントは生成されません。
- 状態の変更は `state_timeout()` をキャンセルし、 このタイプの新しい遷移オプションは新しい状態に属します。
- エンキューされたイベントがある場合 、おそらく新しい状態の状態コールバックが最も古いエンキューされたイベントで呼び出され、このリストの先頭から再び開始されます。
- さもなければ、 gen_statem は、次のメッセージを待つために、受信または休止状態に入ります(`hibernate()` が true の場合)。ハイバネーションでは、次の非システムイベントが gen_statem を起こし、次の受信メッセージが gen_statem を目覚めさせますが、システムイベントの場合は、すぐに休止状態に戻ります。新しいメッセージが到着する と、対応するイベントとともに状態コールバックが呼び出され、このリストの先頭から再び開始されます。


```
postpone() = boolean()
```

If true, postpones the current event and retries it when the state changes (NextState =/= State).

場合は真、現在のイベントを延期し、それを再試行するときの状態変化 (`NextState =/= State`)。

```
hibernate() = boolean()
```

If true, hibernates the gen_statem by calling proc_lib:hibernate/3 before going into receive to wait for a new external event. If there are enqueued events, to prevent receiving any new event, an erlang:garbage_collect/0 is done instead to simulate that the gen_statem entered hibernation and immediately got awakened by the oldest enqueued event.

場合は真、休止状態 gen_statem を 呼び出すことによって `proc_lib:hibernate/3` を休止状態に入る前に受け取る新しい外部イベントを待ちます。エンキューされたイベントがある場合、新しいイベントの受信を防止するために、代わりに `erlang:garbage_collect/0` が実行され、 gen_statem がハイバネーションに入ったことをシミュレートし、すぐに最も古いエンキューされたイベントによって起動されます。

```
event_timeout() = timeout()
```

Generates an event of event_type() timeout after this time (in milliseconds) unless another event arrives or has arrived in which case this time-out is cancelled. Note that a retried or inserted event counts as arrived. So does a state time-out zero event, if it was generated before this timer is requested.

別のイベントが到着または到着しない限り、このタイムアウト後に `event_type()` タイムアウトのイベントを生成します(ミリ秒単位)。再試行または挿入されたイベントは、到着したものとしてカウントされることに注意してください。このタイマーが要求される前に生成された場合は、状態タイムアウトゼロイベントも発生します。


If the value is infinity, no timer is started, as it never would trigger anyway.

値が無限大の場合、タイマーは開始されません。なぜなら、とにかく起動しないからです。


If the value is 0 no timer is actually started, instead the the time-out event is enqueued to ensure that it gets processed before any not yet received external event.

値が 0 の場合、タイマーは実際には起動されませんが、タイムアウトイベントはまだ受信されていない外部イベントの前に処理されるようにエンキューされます。


Note that it is not possible or needed to cancel this time-out, as it is cancelled automatically by any other event.

このタイムアウトは他のイベントによって自動的に取り消されるため、このタイムアウトをキャンセルすることはできません。


```
state_timeout() = timeout()
```

Generates an event of event_type() state_timeout after this time (in milliseconds) unless the gen_statem changes states (NewState =/= OldState) which case this time-out is cancelled.

イベントを生成 た `event_type()` state_timeout ない限り(ミリ秒単位)。この時間の後 gen_statem が 状態を変化(`NewState =/= OldState`) このタイムアウトがキャンセルされる場合。


If the value is infinity, no timer is started, as it never would trigger anyway.

値が無限大の場合、タイマーは開始されません。なぜなら、とにかく起動しないからです。


If the value is 0 no timer is actually started, instead the the time-out event is enqueued to ensure that it gets processed before any not yet received external event.

値が 0 の場合、タイマーは実際には起動されませんが、タイムアウトイベントはまだ受信されていない外部イベントの前に処理されるようにエンキューされます。


Setting this timer while it is running will restart it with the new time-out value. Therefore it is possible to cancel this time-out by setting it to infinity.

このタイマーを実行中に設定すると、新しいタイムアウト値で再始動します。したがって、このタイムアウトを無限に設定することで、このタイムアウトをキャンセルすることができます。


```
action() =
    postpone |
    {postpone, Postpone :: postpone()} |
    {next_event,
     EventType :: event_type(),
     EventContent :: term()} |
    enter_action()
```

These state transition actions can be invoked by returning them from the state callback when it is called with an event, from Module:init/1 or by giving them to enter_loop/5, 6.

これらの状態遷移アクションは、イベントで呼び出されたときに状態コールバックから、 Module:init/1 から 、または enter_loop/5, 6 にそれらを渡すことによって、それらを戻すことによって呼び出すことができます。


Actions are executed in the containing list order.

アクションは、包含リスト順で実行されます。


Actions that set transition options override any previous of the same type, so the last in the containing list wins. For example, the last postpone() overrides any previous postpone() in the list.

トランジションオプション を設定するアクション は、同じタイプの以前のものを上書きします。したがって、リストを含むリストの最後のものが勝ちます。例えば、最後の `postpone()` 以前にオーバーライド `postpone()` に。


postpone

  Sets the transition_option() postpone() for this state transition. This action is ignored when returned from Module:init/1 or given to enter_loop/5, 6, as there is no event to postpone in those cases.

  設定 `transition_option()` は `postpone()` この状態遷移のために。このアクションは、 Module:init/1 から返された場合や、 enter_loop/5, 6 に与えられた 場合は無視されます。その場合、延期する予定がないためです。


next_event

  Stores the specified EventType and EventContent for insertion after all actions have been executed.

  すべてのアクションが実行された後に挿入するために 、指定された EventType および EventContent を格納します。


  The stored events are inserted in the queue as the next to process before any already queued events. The order of these stored events is preserved, so the first next_event in the containing list becomes the first to process.

  格納されたイベントは、すでにキューされているイベントの前に処理する次のキューとしてキューに挿入されます。これらの格納されたイベントの順序は保持されているため、格納するリストの最初の next_event が最初に処理されます。


  An event of type internal is to be used when you want to reliably distinguish an event inserted this way from any external event.

  このようにして挿入されたイベントを外部イベントから確実に区別したい場合は、 internal タイプのイベントを 使用します。


```
enter_action() =
    hibernate |
    {hibernate, Hibernate :: hibernate()} |
    (Timeout :: event_timeout()) |
    {timeout, Time :: event_timeout(), EventContent :: term()} |
    {state_timeout,
     Time :: state_timeout(),
     EventContent :: term()} |
    reply_action()
```

These state transition actions can be invoked by returning them from the state callback, from Module:init/1 or by giving them to enter_loop/5, 6.

これらの状態遷移アクションは、状態コールバックから、 Module:init/1 から 、またはそれらを enter_loop/5, 6 に 渡すことによって呼び出すことができます。


Actions are executed in the containing list order.

アクションは、包含リスト順で実行されます。


Actions that set transition options override any previous of the same type, so the last in the containing list wins. For example, the last event_timeout() overrides any previous event_timeout() in the list.

トランジションオプション を設定するアクション は、同じタイプの以前のものを上書きします。したがって、リストを含むリストの最後のものが勝ちます。例えば、最後 `event_timeout()` は 以前のオーバーライド `event_timeout()` リストです。


hibernate
  Sets the transition_option() hibernate() for this state transition.

Timeout
  Short for {timeout, Timeout, Timeout}, that is, the time-out message is the time-out time. This form exists to make the state callback return value {next_state, NextState, NewData, Timeout} allowed like for gen_fsm's Module:StateName/2.

timeout
  Sets the transition_option() event_timeout() to Time with EventContent.

state_timeout
  Sets the transition_option() state_timeout() to Time with EventContent.

```
reply_action() = {reply, From :: from(), Reply :: term()}
```

This state transition action can be invoked by returning it from the state callback, from Module:init/1 or by giving it to enter_loop/5, 6.

It replies to a caller waiting for a reply in call/2. From must be the term from argument `{call, From}` in a call to a state callback.

Note that using this action from Module:init/1 or enter_loop/5, 6 would be weird on the border of whichcraft since there has been no earlier call to a state callback in this server.

```
init_result(StateType) =
    {ok, State :: StateType, Data :: data()} |
    {ok,
     State :: StateType,
     Data :: data(),
     Actions :: [action()] | action()} |
    ignore |
    {stop, Reason :: term()}
```

For a succesful initialization, State is the initial state() and Data the initial server data() of the gen_statem.

The Actions are executed when entering the first state just as for a state callback, except that the action postpone is forced to false since there is no event to postpone.

For an unsuccesful initialization, `{stop, Reason}` or ignore should be used; see start_link/3, 4.

```
state_enter_result(State) =
    {next_state, State, NewData :: data()} |
    {next_state,
     State,
     NewData :: data(),
     Actions :: [enter_action()] | enter_action()} |
    state_callback_result(enter_action())
```

State is the current state and it can not be changed since the state callback was called with a state enter call.

next_state
  The gen_statem does a state transition to State, which has to be the current state, sets NewData, and executes all Actions.

```
event_handler_result(StateType) =
    {next_state, NextState :: StateType, NewData :: data()} |
    {next_state,
     NextState :: StateType,
     NewData :: data(),
     Actions :: [action()] | action()} |
    state_callback_result(action())
```

StateType is state_name() if callback mode is state_functions, or state() if callback mode is handle_event_function.

next_state
  The gen_statem does a state transition to NextState (which can be the same as the current state), sets NewData, and executes all Actions.

```
state_callback_result(ActionType) =
    {keep_state, NewData :: data()} |
    {keep_state,
     NewData :: data(),
     Actions :: [ActionType] | ActionType} |
    keep_state_and_data |
    {keep_state_and_data, Actions :: [ActionType] | ActionType} |
    {repeat_state, NewData :: data()} |
    {repeat_state,
     NewData :: data(),
     Actions :: [ActionType] | ActionType} |
    repeat_state_and_data |
    {repeat_state_and_data, Actions :: [ActionType] | ActionType} |
    stop |
    {stop, Reason :: term()} |
    {stop, Reason :: term(), NewData :: data()} |
    {stop_and_reply,
     Reason :: term(),
     Replies :: [reply_action()] | reply_action()} |
    {stop_and_reply,
     Reason :: term(),
     Replies :: [reply_action()] | reply_action(),
     NewData :: data()}
```

ActionType is enter_action() if the state callback was called with a state enter call and action() if the state callback was called with an event.

keep_state
  The gen_statem keeps the current state, or does a state transition to the current state if you like, sets NewData, and executes all Actions. This is the same as `{next_state, CurrentState, NewData, Actions}`.

keep_state_and_data
  The gen_statem keeps the current state or does a state transition to the current state if you like, keeps the current server data, and executes all Actions. This is the same as `{next_state, CurrentState, CurrentData, Actions}`.

repeat_state
  The gen_statem keeps the current state, or does a state transition to the current state if you like, sets NewData, and executes all Actions. If the gen_statem runs with state enter calls, the state enter call is repeated, see type transition_option(), otherwise repeat_state is the same as keep_state.

repeat_state_and_data
  The gen_statem keeps the current state and data, or does a state transition to the current state if you like, and executes all Actions. This is the same as `{repeat_state, CurrentData, Actions}`. If the gen_statem runs with state enter calls, the state enter call is repeated, see type transition_option(), otherwise repeat_state_and_data is the same as keep_state_and_data.

stop
  Terminates the gen_statem by calling Module:terminate/3 with Reason and NewData, if specified.

stop_and_reply
  Sends all Replies, then terminates the gen_statem by calling Module:terminate/3 with Reason and NewData, if specified.

All these terms are tuples or atoms and this property will hold in any future version of gen_statem.

EXPORTS

```
call(ServerRef :: server_ref(), Request :: term()) ->
        Reply :: term()
call(ServerRef :: server_ref(),
     Request :: term(),
     Timeout ::
         timeout() |
         {clean_timeout, T :: timeout()} |
         {dirty_timeout, T :: timeout()}) ->
        Reply :: term()
```

Makes a synchronous call to the gen_statem ServerRef by sending a request and waiting until its reply arrives. The gen_statem calls the state callback with event_type() `{call, From}` and event content Request.

同期呼び出しを行い gen_statem の ServerRef 要求を送信し、その応答が到着するまで待つことを。 gen_statem は、コール 状態のコールバックを用いて `event_type() {call 、 From}` 及びイベントコンテンツリクエスト。


A Reply is generated when a state callback returns with `{reply, From, Reply}` as one action(), and that Reply becomes the return value of this function.

返信をするときに生成される状態のコールバックで戻り `{reply, From, Reply}` として `action()`、その返信が、この関数の戻り値となります。


Timeout is an `integer > 0`, which specifies how many milliseconds to wait for a reply, or the atom infinity to wait indefinitely, which is the default. If no reply is received within the specified time, the function call fails.

タイムアウトは `integer > 0` で、応答を待つ時間をミリ秒単位で指定します。または、無限大を無期限に待機することもできます(これがデフォルトです)。指定された時間内に応答がない場合、関数呼び出しは失敗します。


## Note

  For Timeout `<` infinity, to avoid getting a late reply in the caller's inbox if the caller should catch exceptions, this function spawns a proxy process that does the call. A late reply gets delivered to the dead proxy process, hence gets discarded. This is less efficient than using Timeout == infinity.

  以下のためにタイムアウト `<` 無限呼び出し側は例外をキャッチする必要がある場合、呼び出し側の受信トレイに返事が遅れを避けるために、この関数は、呼び出しを行うプロキシプロセスを生成します。遅い応答がデッドプロキシプロセスに渡されるため、破棄されます。これは、 `Timeout == infinity` を使用するより効率が悪い です。


Timeout can also be a tuple `{clean_timeout, T}` or `{dirty_timeout, T}`, where T is the time-out time. `{clean_timeout, T}` works like just T described in the note above and uses a proxy process for T `<` infinity, while `{dirty_timeout, T}` bypasses the proxy process which is more lightweight.

タイムアウトは、タプル `{clean_timeout, T}` or `{dirty_timeout, T}` でもかまいません。ここで、 T はタイムアウト時間です。 `{clean_timeout, T}` は同じように動作 T は上記で注記に記載のプロキシ処理を使用し T `<` 無限ながら、`{dirty_timeout, T}` は、より軽量でプロキシ処理をバイパスします。


## Note

  If you combine catching exceptions from this function with `{dirty_timeout, T}` to avoid that the calling process dies when the call times out, you will have to be prepared to handle a late reply. So why not just allow the calling process to die?

  呼び出しがタイムアウトしたときに呼び出しプロセスが終了するのを避けるために、この関数の catching 例外を `{dirty_timeout, T}` と組み合わせると、遅い応答を処理する準備が必要になります。なぜ、呼び出しプロセスが死ぬのを許さないのでしょうか?


The call can also fail, for example, if the gen_statem dies before or during this function call.

この関数呼び出しの前または途中で gen_statem が終了した場合など、呼び出しも失敗する可能性があります。


```
cast(ServerRef :: server_ref(), Msg :: term()) -> ok
```

Sends an asynchronous event to the gen_statem ServerRef and returns ok immediately, ignoring if the destination node or gen_statem does not exist. The gen_statem calls the state callback with event_type() cast and event content Msg.

```
enter_loop(Module :: module(),
           Opts :: [debug_opt()],
           State :: state(),
           Data :: data()) ->
              no_return()
```

The same as enter_loop/6 with Actions = [] except that no server_name() must have been registered. This creates an anonymous server.

```
enter_loop(Module :: module(),
           Opts :: [debug_opt()],
           State :: state(),
           Data :: data(),
           Server_or_Actions :: server_name() | pid() | [action()]) ->
              no_return()
```

If Server_or_Actions is a list(), the same as enter_loop/6 except that no server_name() must have been registered and Actions = Server_or_Actions. This creates an anonymous server.

Otherwise the same as enter_loop/6 with Server = Server_or_Actions and Actions = [].

```
enter_loop(Module :: module(),
           Opts :: [debug_opt()],
           State :: state(),
           Data :: data(),
           Server :: server_name() | pid(),
           Actions :: [action()] | action()) ->
              no_return()
```

Makes the calling process become a gen_statem. Does not return, instead the calling process enters the gen_statem receive loop and becomes a gen_statem server. The process must have been started using one of the start functions in proc_lib. The user is responsible for any initialization of the process, including registering a name for it.

呼び出しプロセスを gen_statem にします。戻りません。呼び出しプロセスは、代わりに gen_statem receive ループに入り、 gen_statem サーバーになります。プロセスは、 proc_lib の start 関数の 1 つを使用して開始されてい なければなりません。ユーザーは、プロセスの初期化(プロセスの名前の登録を含む)の初期化を担当します。


This function is useful when a more complex initialization procedure is needed than the gen_statem behavior provides.

この関数は、 gen_statem の動作よりも複雑な初期化手順が必要な場合に便利です。


Module, Opts have the same meaning as when calling start[_link]/3, 4.

Module, Opts は `start[_link]/3, 4` を呼び出すときと同じ意味を持ちます。


If Server is self() an anonymous server is created just as when using start[_link]/3. If Server is a server_name() a named server is created just as when using start[_link]/4. However, the server_name() name must have been registered accordingly before this function is called.

場合 Server がある `self()` 匿名サーバーは、単に使用している場合として作成された `start[_link]/3` を起動します。場合はサーバがある `server_name()` という名前のサーバーは、単に使用している場合として作成された `start[_link]/4` を起動します。ただし、この関数が呼び出される前に `server_name()` 名が登録されている必要があります。


State, Data, and Actions have the same meanings as in the return value of Module:init/1. Also, the callback module does not need to export a Module:init/1 function.

State, Data, Actions は、 Module:init/1 の戻り値と同じ意味を持ちます。また、コールバックモジュールは Module:init/1 関数をエクスポートする必要はありません 。


The function fails if the calling process was not started by a proc_lib start function, or if it is not registered according to server_name().

この関数は、呼び出し元のプロセスが proc_lib start 関数によって起動されなかった場合、または `server_name()` に従って登録されていない場合は失敗します。


```
reply(Replies :: [reply_action()] | reply_action()) -> ok
reply(From :: from(), Reply :: term()) -> ok
```

This function can be used by a gen_statem to explicitly send a reply to a process that waits in call/2 when the reply cannot be defined in the return value of a state callback.

この関数は、 gen_statem が、状態コールバックの戻り値で応答を定義できない場合に、 `call/2` で待機するプロセスに明示的に応答を送信するために使用できます。


From must be the term from argument `{call, From}` to the state callback. A reply or multiple replies canalso be sent using one or several reply_action()s from a state callback.

From は引数 `{call, From}` から 状態コールバックまでの項でなければなりません。 1 つまたは複数の `reply_action()` をステートコールバックから使用して、返信または複数の返信を送信することもできます。


## Note

  A reply sent with this function is not visible in sys debug output.

  この関数で送信された応答は、 sys デバッグ出力には表示されません。

```
start(Module :: module(), Args :: term(), Opts :: [start_opt()]) ->
         start_ret()
start(ServerName :: server_name(),
      Module :: module(),
      Args :: term(),
      Opts :: [start_opt()]) ->
         start_ret()
```

Creates a standalone gen_statem process according to OTP design principles (using proc_lib primitives). As it does not get linked to the calling process, this start function cannot be used by a supervisor to start a child.

For a description of arguments and return values, see start_link/3, 4.

```
start_link(Module :: module(),
           Args :: term(),
           Opts :: [start_opt()]) ->
              start_ret()
start_link(ServerName :: server_name(),
           Module :: module(),
           Args :: term(),
           Opts :: [start_opt()]) ->
              start_ret()
```

Creates a gen_statem process according to OTP design principles (using proc_lib primitives) that is linked to the calling process. This is essential when the gen_statem must be part of a supervision tree so it gets linked to its supervisor.

呼び出しプロセスにリンクされている OTP 設計原則(proc_lib プリミティブを使用)に従って gen_statem プロセスを作成します。これは、 gen_statem が監督ツリーの一部でなければならないので、監督者にリンクされるときには不可欠です。


The gen_statem process calls Module:init/1 to initialize the server. To ensure a synchronized startup procedure, start_link/3, 4 does not return until Module:init/1 has returned.

gen_statem プロセスは Module:init/1 を呼び出しサーバーを初期化します。同期された起動プロシージャを保証するために、 start_link/3, 4 は Module:init/1 が返されるまで戻りません。


ServerName specifies the server_name() to register for the gen_statem. If the gen_statem is started with start_link/3, no ServerName is provided and the gen_statem is not registered.

ServerName は、 gen_statem に登録する `server_name()` を指定します。場合 gen_statem がで開始されては start_link/3 、何のサーバー名が提供されていないと gen_statem が登録されていません。


Module is the name of the callback module.

Module はコールバックモジュールの名前です。


Args is an arbitrary term that is passed as the argument to Module:init/1.

Args は、引数として Module:init/1 に渡される任意の用語です 。


- If option {timeout, Time} is present in Opts, the gen_statem is allowed to spend Time milliseconds initializing or it terminates and the start function returns {error, timeout}.
- If option {debug, Dbgs} is present in Opts, debugging through sys is activated.
- If option {spawn_opt, SpawnOpts} is present in Opts, SpawnOpts is passed as option list to erlang:spawn_opt/2, which is used to spawn the gen_statem process.

- `{timeout, Time}` がある場合、 gen_statem 関数の初期化に Time ミリ秒使うことが許され、タイムアウトすると start が `{error, timeout}` を返します。
- `{debug, Dbgs}` がある場合、 sys でのデバッグがが有効化されます。
- `{spawn_opt, SpawnOpts}` がある場合、 SpawnOpts は `erlang:spawn_opts/1` のオプションリストとして渡され、 gen_statem のプロセスが spawn されます。


## Note

  Using spawn option monitor is not allowed, it causes this function to fail with reason badarg.

  spawn option で monitor を使用することはできません。これは badarg で失敗します。


If the gen_statem is successfully created and initialized, this function returns `{ok, Pid}`, where Pid is the pid() of the gen_statem. If a process with the specified ServerName exists already, this function returns `{error, {already_started, Pid}}`, where Pid is the pid() of that process.

gen_statem が正常に作成され初期化された場合、この関数の戻り `{ok, Pid}` (Pid は gen_statem の `pid()`) を返します。指定された ServerName のプロセスがすでに存在する場合、この関数は、 `{error, {already_started, Pid}}` (Pid はそのプロセスの Pid) を返します。


If Module:init/1 fails with Reason, this function returns `{error, Reason}`. If Module:init/1 returns `{stop, Reason}` or ignore, the process is terminated and this function returns `{error, Reason}` or ignore, respectively.

Module:init/1 が Reason で失敗した場合は、この関数は `{error, Reason}` を返します。 Module:init/1 が `{stop, Reason}` か `ignore` を返した場合、プロセスは中断され、関数は同じく `{error, Reason}` か `ignore` を返します。


```
stop(ServerRef :: server_ref()) -> ok
```

The same as stop(ServerRef, normal, infinity).

```
stop(ServerRef :: server_ref(),
     Reason :: term(),
     Timeout :: timeout()) ->
        ok
```

Orders the gen_statem ServerRef to exit with the specified Reason and waits for it to terminate. The gen_statem calls Module:terminate/3 before exiting.

注文 gen_statem ServerRef 指定で終了する理由とそれが終了するのを待ちます。 gen_statem は、呼び出しを Module:terminate/3 を終了する前に。


This function returns ok if the server terminates with the expected reason. Any other reason than normal, shutdown, or `{shutdown, Term}` causes an error report to be issued through error_logger:format/2. The default Reason is normal.

サーバーが予期した理由で終了すると、 この関数は ok を返します。通常、シャットダウン、または `{shutdown, Term}` 以外の理由があれば、 `error_logger:format/2` によってエラーレポートが発行され ます。デフォルトの Reason は正常です。


Timeout is an `integer > 0`, which specifies how many milliseconds to wait for the server to terminate, or the atom infinity to wait indefinitely. Defaults to infinity. If the server does not terminate within the specified time, a timeout exception is raised.

タイムアウトは `integer > 0` です。これは、サーバーが終了するまでの待機時間をミリ秒単位で指定します。または、無限大を無期限に待機させることもできます。デフォルトは無限大です。サーバーが指定された時間内に終了しない場合は、タイムアウト例外が発生します。


If the process does not exist, a noproc exception is raised.

プロセスが存在しない場合、 noproc 例外が発生します。


## Callback Functions

The following functions are to be exported from a gen_statem callback module.

### EXPORTS

```
Module:callback_mode() -> CallbackMode
```

Types:

```
CallbackMode = callback_mode() | [ callback_mode() | state_enter() ]
```

This function is called by a gen_statem when it needs to find out the callback mode of the callback module. The value is cached by gen_statem for efficiency reasons, so this function is only called once after server start and after code change, but before the first state callback in the current code version is called. More occasions may be added in future versions of gen_statem.

この関数は 、コールバックモジュールのコールバックモードを見つける必要があるときに、 gen_statem によって呼び出されます。値は 効率の理由から gen_statem によってキャッシュされるため、この関数はサーバーの起動後およびコード変更後に 1 回だけ呼び出されます が、現在のコードバージョンの最初の 状態コールバックが呼び出される前に呼び出されます。より多くの機会は、将来のバージョンに加えてもよい gen_statem 。


Server start happens either when Module:init/1 returns or when enter_loop/4-6 is called. Code change happens when Module:code_change/4 returns.

サーバーの起動は、 Module:init/1 が戻るか、 enter_loop/4-6 が呼び出されたときに発生し ます。コード変更は、 Module:code_change/4 が返ったときに発生します。


The CallbackMode is either just callback_mode() or a list containing callback_mode() and possibly the atom state_enter.

CallbackMode はただのいずれかである `callback_mode()` またはリストを含む `callback_mode()` およびおそらく atom state_enter 。


## Note

If this function's body does not return an inline constant value the callback module is doing something strange.

この関数の本体がインライン定数値を返さない場合、コールバックモジュールは何か変なことをしています。

```
Module:code_change(OldVsn, OldState, OldData, Extra) -> Result
```

Types:

```
OldVsn = Vsn | {down, Vsn}
  Vsn = term()
OldState = NewState = term()
Extra = term()
Result = {ok, NewState, NewData} | Reason
OldState = NewState = state()
OldData = NewData = data()
Reason = term()
```

This function is called by a gen_statem when it is to update its internal state during a release upgrade/downgrade, that is, when the instruction `{update, Module, Change, ...}`, where Change={advanced, Extra}, is specified in the appup file. For more information, see OTP Design Principles.

この関数は、によって呼び出され gen_statem それはリリースのアップグレード/ダウングレード中にその内部状態を更新するときに、それが命令するとき、ある `{update, Module, Change, ...}`、`Change={advanced, Extra}` が、ありますで指定された appup の ファイル。詳細については、「OTP 設計の原則」を参照してください 。


For an upgrade, OldVsn is Vsn, and for a downgrade, OldVsn is `{down, Vsn}`. Vsn is defined by the vsn attribute(s) of the old version of the callback module Module. If no such attribute is defined, the version is the checksum of the Beam file.

アップグレードの場合、 OldVsn は Vsn で、ダウングレードの場合は OldVsn は `{down , Vsn}` です。 VSN は、によって定義されている VSN の コールバックモジュールの古いバージョンの属性(複数可) モジュール。そのような属性が定義されていない場合、バージョンは Beam ファイルのチェックサムになります。


OldState and OldData is the internal state of the gen_statem.

OldState と OLDDATA は、内部の状態である gen_statem 。


Extra is passed "as is" from the `{advanced, Extra}` part of the update instruction.

Extra は 、更新命令の`{advanced 、 Extra}` 部分から "そのまま"渡されます。


If successful, the function must return the updated internal state in an `{ok, NewState, NewData}` tuple.

成功した場合、関数は更新された内部状態を`{ok 、 NewState 、 NewData}` タプルで返さなければなりません 。


If the function returns a failure Reason, the ongoing upgrade fails and rolls back to the old release. Note that Reason can not be an `{ok, _, _}` tuple since that will be regarded as a `{ok, NewState, NewData}` tuple, and that a tuple matching `{ok, _}` is an also invalid failure Reason. It is recommended to use an atom as Reason since it will be wrapped in an `{error, Reason}` tuple.

関数が失敗 Reason を返した場合、進行中のアップグレードは失敗し、古いリリースにロールバックされます。そのノート理由はできません`{OK 、_、_}` つまり、とみなされるので、タプル `{OK 、 NewState に、 NEWDATA}` タプル、およびタプルマッチングがその`{OK 、_}` も無効不良である理由。`{error 、 Reason}` タプルでラップされるので、 Reason としてアトムを使用することをお勧めします。


Also note when upgrading a gen_statem, this function and hence the Change={advanced, Extra} parameter in the appup file is not only needed to update the internal state or to act on the Extra argument. It is also needed if an upgrade or downgrade should change callback mode, or else the callback mode after the code change will not be honoured, most probably causing a server crash.

また、 gen_statem をアップグレードするときには、この関数、したがって Appup ファイル内の Change = {advanced 、 Extra}パラメータは 、内部状態を更新するか、 Extra 引数に作用するために必要なだけではありません。アップグレードまたはダウングレードがコールバックモードを変更する必要がある場合、または コード変更後のコールバックモードが有効にならず、おそらくサーバークラッシュが発生する可能性があります。


```
Module:init(Args) -> Result(StateType)
```

Types:

```
Args = term()
Result(StateType) = init_result(StateType)
```

Whenever a gen_statem is started using start_link/3, 4 or start/3, 4, this optional function is called by the new process to initialize the implementation state and server data.

Args is the Args argument provided to that start function.

## Note

This callback is optional, so a callback module does not need to export it, but most do. If this function is not exported, the gen_statem should be started through proc_lib and enter_loop/4-6.

```
Module:format_status(Opt, [PDict, State, Data]) -> Status
```

Types:

```
Opt = normal | terminate
PDict = [{Key, Value}]
State = state()
Data = data()
Key = term()
Value = term()
Status = term()
```

## Note

This callback is optional, so a callback module does not need to export it. The gen_statem module provides a default implementation of this function that returns `{State, Data}`.

このコールバックはオプションであるため、コールバックモジュールはそれをエクスポートする必要はありません。 gen_statem のモジュールを返し、この関数のデフォルトの実装を提供 `{状態、データを}`。


If this callback is exported but fails, to hide possibly sensitive data, the default function will instead return `{State, Info}`, where Info says nothing but the fact that format_status/2 has crashed.

このコールバックがエクスポートされたが失敗した場合、重要なデータを隠すために、デフォルトの関数は代わりに `{State, Info}` を返します。ただし、 Info は format_status/2 がクラッシュしたという事実だけを示します。


This function is called by a gen_statem process when any of the following apply:

この関数は、次のいずれかが当てはまるときに gen_statem プロセスによって呼び出されます。


- One of sys:get_status/1, 2 is invoked to get the gen_statem status. Opt is set to the atom normal for this case.
- The gen_statem terminates abnormally and logs an error. Opt is set to the atom terminate for this case.


- 一つ SYS:GET_STATUS/1, 2 取得するために呼び出される gen_statem の状態を。この場合、 Opt は atom 法線に設定されます。
- gen_statem は異常終了し、エラーをログに記録します。 この場合、 Opt は atom 終端に設定されます。


This function is useful for changing the form and appearance of the gen_statem status for these cases. A callback module wishing to change the sys:get_status/1, 2 return value and how its status appears in termination error logs exports an instance of format_status/2, which returns a term describing the current status of the gen_statem.

この関数は、これらの場合の gen_statem ステータスの形式と外観を変更するのに便利です。変更したいコールバックモジュール SYS を:GET_STATUS/1, 2 戻り値とどのようにその状態が終了エラーログに表示さは、インスタンスエクスポート format_status/2 の現在のステータス記述用語戻り、 gen_statem を。


PDict is the current value of the process dictionary of the gen_statem.

PDict は、プロセス辞書の現在の値である gen_statem 。


State is the internal state of the gen_statem.

State は gen_statem の内部状態です。


Data is the internal server data of the gen_statem.

データ は、 gen_statem の内部サーバーデータです。


The function is to return Status, a term that contains the appropriate details of the current state and status of the gen_statem. There are no restrictions on the form Status can take, but for the sys:get_status/1, 2 case (when Opt is normal), the recommended form for the Status value is [{data, [{"State", Term}]}], where Term provides relevant details of the gen_statem state. Following this recommendation is not required, but it makes the callback module status consistent with the rest of the sys:get_status/1, 2 return value.

この関数は、現在の状態と gen_statem のステータスの適切な詳細を含む用語である Status を返します。ステータスには制限がありませんが、 sys:get_status/1, 2 の 場合(Opt が正常な場合)、ステータス値の推奨形式は[{data 、[{"State"、 Term}]です。 }]、ここで Term は gen_statem 状態の関連する詳細を提供します。この勧告に従うことは必須ではないが、


One use for this function is to return compact alternative state representations to avoid having large state terms printed in log files. Another use is to hide sensitive data from being written to the error log.

この関数の用途の 1 つは、コンパクトな代替状態表現を戻して、大きな状態の用語をログファイルに出力しないようにすることです。機密データがエラーログに書き込まれないようにすることもできます。


```
Module:StateName(enter, OldState, Data) -> StateEnterResult(StateName)
Module:StateName(EventType, EventContent, Data) -> StateFunctionResult
Module:handle_event(enter, OldState, State, Data) -> StateEnterResult(State)
Module:handle_event(EventType, EventContent, State, Data) -> HandleEventResult
```

Types:

```
EventType = event_type()
EventContent = term()
State = state()
Data = NewData = data()
StateEnterResult(StateName) = state_enter_result(StateName)
StateFunctionResult = event_handler_result(state_name())
StateEnterResult(State) = state_enter_result(State)
HandleEventResult = event_handler_result(state())
```

Whenever a gen_statem receives an event from call/2, cast/2, or as a normal process message, one of these functions is called. If callback mode is state_functions, Module:StateName/3 is called, and if it is handle_event_function, Module:handle_event/4 is called.

gen_statem が call/2 、 cast/2 、または通常のプロセスメッセージとしてイベントを受け取る たびに、これらの関数の 1 つが呼び出されます。場合は、コールバックモードがある state_functions 、 Module:StateName/3 と呼ばれ、それがある場合 handle_event_function は、 Module:handle_event/4 と呼ばれています。


If EventType is `{call, From}`, the caller waits for a reply. The reply can be sent from this or from any other state callback by returning with `{reply, From, Reply}` in Actions, in Replies, or by calling reply(From, Reply).

場合イベントタイプがある `{から、呼び出し}`、呼び出し側は応答を待ちます。応答は、このから、または任意の他から送信することができる 状態のコールバック で戻すことにより、`{返信からの返信、}` で アクションで、 返信、または呼び出すことにより (返信、から)応答を。


If this function returns with a next state that does not match equal (=/=) to the current state, all postponed events are retried in the next state.

この関数が現在の状態と等しくない(=/=)次の状態で戻る場合、すべての延期されたイベントは次の状態で再試行されます。


The only difference between StateFunctionResult and HandleEventResult is that for StateFunctionResult the next state must be an atom, but for HandleEventResult there is no restriction on the next state.

唯一の違い StateFunctionResult と HandleEventResult はのためということである StateFunctionResult 次の状態は atom でなければならない、しかしため HandleEventResult 次の状態に制限はありません。


For options that can be set and actions that can be done by gen_statem after returning from this function, see action().

設定可能なオプションと、この関数から返った後に gen_statem で実行できるアクションについては、 action()を参照してください。


When the gen_statem runs with state enter calls, these functions are also called with arguments `(enter, OldState, ...)` whenever the state changes. In this case there are some restrictions on the actions that may be returned: postpone() is not allowed since a state enter call is not an event so there is no event to postpone, and `{next_event, _, _}` is not allowed since using state enter calls should not affect how events are consumed and produced. You may also not change states from this call. Should you return {next_state, NextState, ...} with NextState =/= State the gen_statem crashes. It is possible to use `{repeat_state, ...}`, `{repeat_state_and_data, _}` or repeat_state_and_data but all of them makes little sense since you immediately will be called again with a new state enter call making this just a weird way of looping, and there are better ways to loop in Erlang. You are advised to use `{keep_state, ...}`, `{keep_state_and_data, _}` or keep_state_and_data since you can not change states from a state enter call anyway.







When the gen_statem runs with state enter calls,
gen_statem が state enter で実行された時


these functions are also called with arguments `(enter, OldState, ...)` whenever the state changes.
これらの関数は、状態が変わった時に `(enter, OldState, ...)` で呼び出される


In this case there are some restrictions on the actions that may be returned: postpone() is not allowed since a state enter call is not an event so there is no event to postpone,
このケースでは、戻すアクションにいくつかの制限がある、状態入力呼び出しはイベントではないので、延期するイベントがないため postpone() は許可されてない。


and `{next_event, _, _}` is not allowed since using state enter calls should not affect how events are consumed and produced.
そして、 `{next_event, _, _}` は許可されていない、状態入力関数はイベントがどう生成/消費されるかに影響しない。

You may also not change states from this call.
この呼び出しで状態を変更しません。

Should you return `{next_state, NextState, ...}` with `NextState =/= State` the gen_statem crashes.
get_statem がクラッシュしたら  `{next_state, NextState, ...}` with `NextState =/= State` を返すべき。


It is possible to use `{repeat_state, ...}`, `{repeat_state_and_data, _}` or `repeat_state_and_data`
`{repeat_state, ...}`, `{repeat_state_and_data, _}` or `repeat_state_and_data` を使うことは可能。

but all of them makes little sense since you immediately will be called again with a new state enter call making this just a weird way of looping,
しかし、これら全ては、意味がある、新しい状態入力呼び出しとすぐにまた呼び出される、変わったループにする方法

and there are better ways to loop in Erlang.
そして、 erlang でループを作るより良い方法

You are advised to use `{keep_state, ...}`, `{keep_state_and_data, _}` or `keep_state_and_data` since you can not change states from a state enter call anyway.
`{keep_state, ...}`, `{keep_state_and_data, _}` or `keep_state_and_data` を使う方がいい、状態入力関数から状態を変えることはできないから。




Note the fact that you can use throw to return the result, which can be useful. For example to bail out with throw(keep_state_and_data) from deep within complex code that can not return `{next_state, State, Data}` because State or Data is no longer in scope.

throw を 使用して結果を返すことができますが、これは便利なことに注意してください。たとえば、 State または Data がスコープ内に存在しないため、 `{next_state, State, Data}` を返せない複雑なコードの中から、 `throw(keep_state_and_data)` を深く掘り下げることができます。


Module:terminate(Reason, State, Data) -> Ignored

Types:

```
Reason = normal | shutdown | {shutdown, term()} | term()
State = state()
Data = data()
Ignored = term()
```

## Note

This callback is optional, so callback modules need not export it. The gen_statem module provides a default implementation without cleanup.

このコールバックはオプションであるため、コールバックモジュールはエクスポートする必要はありません。 gen_statem のモジュールは、クリーンアップせずにデフォルトの実装を提供します。


This function is called by a gen_statem when it is about to terminate. It is to be the opposite of Module:init/1 and do any necessary cleaning up. When it returns, the gen_statem terminates with Reason. The return value is ignored.

この関数は、終了しようとしている ときに gen_statem によって呼び出されます。これは Module:init/1 の反対で、必要なクリーンアップを行います。それが戻ったとき、 gen_statem はで終了した理由。戻り値は無視されます。


Reason is a term denoting the stop reason and State is the internal state of the gen_statem.

Reason は停止理由を示す用語で、 State は gen_statem の内部状態です。


Reason depends on why the gen_statem is terminating. If it is because another callback function has returned, a stop tuple `{stop, Reason}` in Actions, Reason has the value specified in that tuple. If it is because of a failure, Reason is the error reason.

理由は gen_statem が終了する理由に依存します。別のコールバック関数が返されたためであれば、 Actions 、 Reason の stop tuple `{stop 、 Reason}`はそのタプルで指定された値を持ちます。それが失敗のためであれば、 Reason がエラー理由です。


If the gen_statem is part of a supervision tree and is ordered by its supervisor to terminate, this function is called with Reason = shutdown if both the following conditions apply:

場合 gen_statem が監督・ツリーの一部であり、終了するためにその上司が注文されて、この機能を使用して呼び出された理由=シャットダウン次の両方の条件が適用された場合:


- The gen_statem has been set to trap exit signals.
- The shutdown strategy as defined in the supervisor's child specification is an integer time-out value, not brutal_kill.


- gen_statem はトラップ出口信号に設定されています。
- スーパーバイザの子仕様で定義されているシャットダウン戦略はありません、整数のタイムアウト値である brutal_kill 。


Even if the gen_statem is not part of a supervision tree, this function is called if it receives an 'EXIT' message from its parent. Reason is the same as in the 'EXIT' message.

場合でも gen_statem がありません 監督の木の一部、それが受信した場合、この関数が呼び出された「EXIT」親からのメッセージを。 理由は'EXIT'メッセージと同じです。


Otherwise, the gen_statem is immediately terminated.

それ以外の場合、 gen_statem は直ちに終了します。


Notice that for any other reason than normal, shutdown, or `{shutdown, Term}`, the gen_statem is assumed to terminate because of an error and an error report is issued using error_logger:format/2.

通常、 シャットダウン、または`{shutdown 、 Term}` 以外の理由で、 gen_statem はエラーのために終了するとみなされ、 error_logger:format/2 を使用してエラーレポートが発行され ます。
