# 4 gen_statem Behavior

This section is to be read with the gen_statem(3) manual page in STDLIB, where all interface functions and callback functions are described in detail.

このセクションは、 STDLIB の gen_statem(3) の マニュアルページと共に読まれます。ここでは、すべてのインタフェース関数とコールバック関数について詳しく説明します。


## Note

This is a new behavior in Erlang/OTP 19.0. It has been thoroughly reviewed, is stable enough to be used by at least two heavy OTP applications, and is here to stay. Depending on user feedback, we do not expect but can find it necessary to make minor not backward compatible changes into Erlang/OTP 20.0.

これは、 Erlang/OTP 19.0 の新しいビヘイビアです。それは徹底的にレビューされ、少なくとも 2 つの重い OTP アプリケーションで使用されるほど十分安定しています。ユーザーからのフィードバックによっては、望ましくはありませんが、 Erlang / OTP 20.0 で小さくとも後方互換性のない変更をする必要があるかもしれません。


## 4.1  Event-Driven State Machines

Established Automata Theory does not deal much with how a state transition is triggered, but assumes that the output is a function of the input (and the state) and that they are some kind of values.

確立されたオートマトン理論は、状態遷移がどのようにトリガされるかをあまり扱っていないが、出力が入力(および状態)の関数であり、ある種の値であると仮定している。


For an Event-Driven State Machine, the input is an event that triggers a state transition and the output is actions executed during the state transition. It can analogously to the mathematical model of a Finite-State Machine be described as a set of relations of the following form:

イベントドリブンステートマシンの場合、入力は状態遷移をトリガするイベントであり、出力は状態遷移中に実行されるアクションです。これは、有限状態機械の数学的モデルと同様に、以下の形式の関係の集合として記述することができる。


```erlang
State(S) x Event(E) -> Actions(A), State(S')
```

These relations are interpreted as follows: if we are in state S and event E occurs, we are to perform actions A and make a transition to state S'. Notice that S' can be equal to S.

これらの関係は、以下のように解釈される。
状態 S にあり、事象 E が発生した場合、動作 A を実行して状態 S' に移行する。 S' は S と同じ場合もありえる。


As A and S' depend only on S and E, the kind of state machine described here is a Mealy Machine (see, for example, the corresponding Wikipedia article).

A と S' は S と E のみに依存するため、ここで説明したステートマシンはミーリマシンである(Wikipedia の記事参照)。


Like most gen_ behaviors, gen_statem keeps a server Data besides the state. Because of this, and as there is no restriction on the number of states (assuming that there is enough virtual machine memory) or on the number of distinct input events, a state machine implemented with this behavior is in fact Turing complete. But it feels mostly like an Event-Driven Mealy Machine.

ほとんどの gen_ ビヘイビアと同様に、 gen_statem は状態のほかにサーバーデータも保持します。このため、(仮想マシンメモリが十分であることを前提として)状態数や個別の入力イベント数に制限がないため、このビヘイビアを実装したステートマシンは実際にはチューリング完全です。しかし、イベントドリブンミーリマシンのようにも見えます。


## 4.2  Callback Modes

The gen_statem behavior supports two callback modes:

gen_statem のビヘイビアは、 2 つのコールバックモードをサポートしています。

- In mode state_functions, the state transition rules are written as some Erlang functions, which conform to the following convention:

- `state_functions`: 状態遷移ルールが、次のルールを満たす関数で書かれる。

```erlang
StateName(EventType, EventContent, Data) ->
    ... code for actions here ...
    {next_state, NewStateName, NewData}.
```

This form is used in most examples here for example in section Example.

ほとんどの例は、この形で書かれています。

- In mode handle_event_function, only one Erlang function provides all state transition rules:

- `handle_event_function`: 1 つの関数が全ての状態遷移ルールを表現する。

```erlang
handle_event(EventType, EventContent, State, Data) ->
    ... code for actions here ...
    {next_state, NewState, NewData}
```

See section One Event Handler for an example.

セクション 1 を参照

Both these modes allow other return tuples; see Module:StateName/3 in the gen_statem manual page. These other return tuples can, for example, stop the machine, execute state transition actions on the machine engine itself, and send replies.

どちらのモードでも、他のタプルを返すこともできます。 gen_statem マニュアルページ Module:StateName/3 を参照。これらの他の戻りタプルは、例えば、マシンを停止し、マシンエンジン自体の状態遷移アクションを実行し、応答を送信することができる。


## Choosing the Callback Mode

The two callback modes give different possibilities and restrictions, but one goal remains: you want to handle all possible combinations of events and states.

2 つのコールバックモードにはさまざまな可能性と制限がありますが、すべてのイベントと状態の組み合わせを処理したいという目標は共通です。


This can be done, for example, by focusing on one state at the time and for every state ensure that all events are handled. Alternatively, you can focus on one event at the time and ensure that it is handled in every state. You can also use a mix of these strategies.

これにより、例えば
ある時点で 1 つの状態に注目し、全ての状態で全てのイベントが処理されることを保証する。
あるいは、 ある時点で 1 つのイベントに注目し、全ての状態で処理されることを保証する。
これらの戦略を組み合わせて利用することもできます。


With state_functions, you are restricted to use atom-only states, and the gen_statem engine branches depending on state name for you. This encourages the callback module to gather the implementation of all event actions particular to one state in the same place in the code, hence to focus on one state at the time.

state_functions では、 atom のみの状態を使用するように制限されており、 gen_statem のエンジンはその状態名に依存して遷移します。これにより、コールバックモジュールは、コード内の同じ場所にある 1 つの状態に特有のすべてのイベントアクションの実装を収集し、その時点で 1 つの状態に集中することができます。


This mode fits well when you have a regular state diagram, like the ones in this chapter, which describes all events and actions belonging to a state visually around that state, and each state has its unique name.

このモードは、この章のような通常の状態図を持つ場合に適しています。この図では、視覚的に状態に属しているすべてのイベントとアクションが説明され、各状態は一意な名前を持っています。


With handle_event_function, you are free to mix strategies, as all events and states are handled in the same callback function.

`handle_event_function` では、すべてのイベントと状態が同じコールバック関数内で処理されているため、戦略をミックスするのは自由です。


This mode works equally well when you want to focus on one event at the time or on one state at the time, but function Module:handle_event/4 quickly grows too large to handle without branching to helper functions.

このモードは、その時に 1 つのイベントにフォーカスを当てたいときや、ある時点で 1 つの状態に集中したいときにも同様に機能しますが、関数 module:handle_event/4 はヘルパ関数なしで処理を分離するのが困難なくらい急速に大きくなります。


The mode enables the use of non-atom states, for example, complex states or even hierarchical states. If, for example, a state diagram is largely alike for the client side and the server side of a protocol, you can have a state {StateName,server} or {StateName,client}, and make StateName determine where in the code to handle most events in the state. The second element of the tuple is then used to select whether to handle special client-side or server-side events.

このモードでは、atom ではない状態、たとえば複雑な状態または階層的状態の使用が可能になります。たとえば、状態図がクライアント側とプロトコルのサーバ側でほぼ同じ場合、状態 `{StateName , server}` または `{StateName,client}` を持つことができ、 StateName で状態内のほとんどのイベントを処理し、その後、タプルの第 2 要素を使用して、クライアント側イベントまたはサーバー側イベントの特定の処理するかどうかを選択します。


## 4.3  State Enter Calls

The gen_statem behavior can regardless of callback mode automatically call the state callback with special arguments whenever the state changes so you can write state entry actions near the rest of the state transition rules. It typically looks like this:

gen_statem のビヘイビアにかかわらず、コールバックモードの自動できる状態コールバックを呼び出しますが、状態遷移ルールの残りの部分に近い状態エントリのアクションを書くことができますので、いつでも状態が変化する特殊な引数を持ちます。通常、次のようになります。


```erlang
StateName(enter, _OldState, Data) ->
    ... code for state entry actions here ...
    {keep_state, NewData};
StateName(EventType, EventContent, Data) ->
    ... code for actions here ...
    {next_state, NewStateName, NewData}.
```

Depending on how your state machine is specified, this can be a very useful feature, but it forces you to handle the state enter calls in all states. See also the State Entry Actions chapter.

あなたのステートマシンの指定方法によっては、これは非常に便利な機能ですが、すべての状態で状態入力呼び出しを処理する必要があります。「状態エントリ操作」の 章も参照してください 。


### 4.4  Actions

In the first section Event-Driven State Machines actions were mentioned as a part of the general state machine model. These general actions are implemented with the code that callback module gen_statem executes in an event-handling callback function before returning to the gen_statem engine.

最初のセクションでは、 イベントドリブンステートマシンの アクションは、一般的なステートマシンモデルの一部として記述されていました。これらの一般的なアクションは、 gen_statem エンジンに戻る前に、コールバックモジュール gen_statem がイベント処理コールバック関数で実行するコードで実装されます。


There are more specific state-transition actions that a callback function can order the gen_statem engine to do after the callback function return. These are ordered by returning a list of actions in the return tuple from the callback function. These state transition actions affect the gen_statem engine itself and can do the following:

コールバック関数が戻った後に、 gen_statem エンジンが行うべきことを指示するための、特殊な状態遷移アクションがあります。
これらは、コールバック関数の戻り値のタプルにアクションのリストを返すことにより順序づけられます。
これらの状態遷移アクションは、 gen_statem エンジン自体に影響を与え、以下を実行できます。


- Postpone the current event, see section Postponing Events
- Hibernate the gen_statem, treated in Hibernation
- Start a state time-out, read more in section State Time-Outs
- Start an event time-out, see more in section Event Time-Outs
- Reply to a caller, mentioned at the end of section All State Events
- Generate the next event to handle, see section Self-Generated Events

For details, see the gen_statem(3) manual page. You can, for example, reply to many callers and generate multiple next events to handle.

詳細は、 gen_statem(3) のマニュアルページを参照してください。たとえば、多くの発信者に返信し、処理するために複数の次のイベントを生成することができます。


## 4.5  Event Types

Events are categorized in different event types. Events of all types are handled in the same callback function, for a given state, and the function gets EventType and EventContent as arguments.

イベントは、異なるイベントタイプに分類されます。すべての型のイベントは、特定の状態の同じコールバック関数で処理され、その関数は EventType と EventContent を引数として取ります。


The following is a complete list of event types and where they come from:

以下は、イベントタイプの完全なリストとその出所です。


- cast
  - Generated by gen_statem:cast.
- {call,From}
  - Generated by gen_statem:call, where From is the reply address to use when replying either through the state transition action {reply,From,Msg} or by calling gen_statem:reply.
- info
  - Generated by any regular process message sent to the gen_statem process.
- state_timeout
  - Generated by state transition action {state_timeout,Time,EventContent} state timer timing out.
- timeout
  - Generated by state transition action {timeout,Time,EventContent} (or its short form Time) event timer timing out.
- internal
  - Generated by state transition action {next_event,internal,EventContent}. All event types above can also be generated using {next_event,EventType,EventContent}.

- cast
  - gen_statem:cast で生成
- {call, From}
  - gen_statem:call で生成、 From は {reply, From, Msg} か gen_statem:reply で返信する宛先。
- info
  - gen_statem プロセスに送られる任意のメッセージ
- state_timeout
  - {state_timeout, Time, EventContent} で状態のタイムアウト
- timeout
  - {timeout, Time, EventContent} でイベントのタイムアウト
- internal
  - {next_event, internal, EventContent}

上述は全て {next_event, EventType, EventContent} でも生成可能。


## 4.6  Example

This example starts off as equivalent to the example in section gen_fsm Behavior. In later sections, additions and tweaks are made using features in gen_statem that gen_fsm does not have. The end of this chapter provides the example again with all the added features.

この例は、セクション gen_fsm ビヘイビアの例と同じように始まります。後のセクションでは、 gen_fsm にはない gen_statem の機能を使って追加や修正を行っています。この章の最後には、追加されたすべての機能についての例が再び示されています。


A door with a code lock can be seen as a state machine. Initially, the door is locked. When someone presses a button, an event is generated. Depending on what buttons have been pressed before, the sequence so far can be correct, incomplete, or wrong. If correct, the door is unlocked for 10 seconds (10,000 milliseconds). If incomplete, we wait for another button to be pressed. If wrong, we start all over, waiting for a new button sequence.

コードロック付きのドアは、ステートマシンと見なすことができます。最初は、ドアがロックされています。誰かがボタンを押すと、イベントが生成されます。前にどのボタンが押されているかに応じて、これまでのシーケンスは correct/incomplete/wron になる可能性があります。 correct の場合、ドアは 10 秒間(10,000 ミリ秒)ロックが解除されます。 incomplete な場合、別のボタンが押されるのを待ちます。 wrong の場合は、新しいボタンシーケンスを待っています。


![Figure 4.1:   Code Lock State Diagram](http://erlang.org/doc/design_principles/code_lock.png)

This code lock state machine can be implemented using gen_statem with the following callback module:
このコードロックステートマシンは、次のコールバックモジュールを使用して gen_statem を使用して実装できます。


```erlang
-module(code_lock).
-behaviour(gen_statem).
-define(NAME, code_lock).

-export([start_link/1]).
-export([button/1]).
-export([init/1,callback_mode/0,terminate/3,code_change/4]).
-export([locked/3,open/3]).

start_link(Code) ->
    gen_statem:start_link({local,?NAME}, ?MODULE, Code, []).

button(Digit) ->
    gen_statem:cast(?NAME, {button,Digit}).

init(Code) ->
    do_lock(),
    Data = #{code => Code, remaining => Code},
    {ok, locked, Data}.

callback_mode() ->
    state_functions.

locked(
  cast, {button,Digit},
  #{code := Code, remaining := Remaining} = Data) ->
    case Remaining of
        [Digit] ->
            do_unlock(),
            {next_state, open, Data#{remaining := Code}, [{state_timeout,10000,lock}];
        [Digit|Rest] -> % Incomplete
            {next_state, locked, Data#{remaining := Rest}};
        _Wrong ->
            {next_state, locked, Data#{remaining := Code}}
    end.

open(state_timeout, lock,  Data) ->
    do_lock(),
    {next_state, locked, Data};
open(cast, {button,_}, Data) ->
    {next_state, open, Data}.

do_lock() ->
    io:format("Lock~n", []).
do_unlock() ->
    io:format("Unlock~n", []).

terminate(_Reason, State, _Data) ->
    State =/= locked andalso do_lock(),
    ok.
code_change(_Vsn, State, Data, _Extra) ->
    {ok, State, Data}.
```

The code is explained in the next sections.

## 4.7  Starting gen_statem

In the example in the previous section, gen_statem is started by calling code_lock:start_link(Code):

前のセクションの例では、 gen_statem は、 code_lock:start_link(Code) を呼び出して起動します。

```erlang
start_link(Code) ->
    gen_statem:start_link({local, ?NAME}, ?MODULE, Code, []).
```

start_link calls function gen_statem:start_link/4, which spawns and links to a new process, a gen_statem.

start_link は、関数 gen_statem:start_link/4 を呼び出します。 これは、新しいプロセス gen_statem を生成してリンクします。


- The first argument, {local, ?NAME}, specifies the name. In this case, the gen_statem is locally registered as code_lock through the macro ?NAME.

- 最初の引数 `{local, ?NAME}` は名前を指定します。この場合、 gen_statem は、 ?NAME マクロを通して code_lock として local に登録されます。


- If the name is omitted, the gen_statem is not registered. Instead its pid must be used. The name can also be specified as {global,Name}, then the gen_statem is registered using global:register_name/2 in Kernel.

- 名前を省略すると、 gen_statem は登録されません。代わりに、その pid を使用する必要があります。名前は `{global, Name}` として指定することもでき、 gen_statem は カーネルの global:register_name/2 を使って登録されます。


- The second argument, ?MODULE, is the name of the callback module, that is, the module where the callback functions are located, which is this module.

- 2 番目の引数?MODULE は、コールバックモジュールの名前です。コールバック関数が配置されているモジュール(このモジュールです)です。

- The interface functions (start_link/1 and button/1) are located in the same module as the callback functions (init/1, locked/3, and open/3). It is normally good programming practice to have the client-side code and the server-side code contained in one module.

- インタフェース関数(`start_link/1` と `button/1`)は、コールバック関数(`init/1`, `locked/3`, `open/3`)と同じモジュールにあります。クライアント側のコードとサーバー側のコードを 1 つのモジュールに含めることは、通常はプログラミングの良い習慣です。


- The third argument, Code, is a list of digits, which is the correct unlock code that is passed to callback function init/1.

- 3 番目の引数 `Code` は、コールバック関数 `init/1` に渡される正しいロック解除コードである数字のリストです。


- The fourth argument, [], is a list of options. For the available options, see gen_statem:start_link/3.

- 4 番目の引数 `[]` は、オプションのリストです。使用可能なオプションについては、 `gen_statem:start_link/3` を参照してください 。


If name registration succeeds, the new gen_statem process calls callback function code_lock:init(Code). This function is expected to return {ok, State, Data}, where State is the initial state of the gen_statem, in this case locked; assuming that the door is locked to begin with. Data is the internal server data of the gen_statem. Here the server data is a map with key code that stores the correct button sequence, and key remaining that stores the remaining correct button sequence (the same as the code to begin with).

名前の登録に成功すると、新しい gen_statem プロセスがコールバック関数 `code_lock:init(Code)` を呼び出します。この関数は `{ok, State, Data}` を返すことが期待されます。ここで State は gen_statem の初期状態です(この場合はロックされます)。ドアが最初にロックされていると仮定します。データは、 gen_statem の内部サーバーデータです。ここで、サーバーデータは、正しいボタンシーケンスを格納する キーコードを持つマップであり、


```erlang
init(Code) ->
    do_lock(),
    Data = #{code => Code, remaining => Code},
    {ok, locked, Data}.
```

Function gen_statem:start_link is synchronous. It does not return until the gen_statem is initialized and is ready to receive events.

関数 `gen_statem:start_link` は同期です。 gen_statem が初期化され、イベントを受け取る準備が整うまでは戻らない。

Function gen_statem:start_link must be used if the gen_statem is part of a supervision tree, that is, started by a supervisor. Another function, gen_statem:start can be used to start a standalone gen_statem, that is, a gen_statem that is not part of a supervision tree.

`gen_statem:start_link` は gen_statem がスーパバイザに管理されている場合に使われる。
`gen_statem:start` は、スタンドアローンの gen_statem を起動するのに使う。


```erlang
callback_mode() ->
    state_functions.
```

Function Module:callback_mode/0 selects the CallbackMode for the callback module, in this case state_functions. That is, each state has got its own handler function.

`Module:callback_mode/0` は コールバックモジュールの CallbackMode を選択し ます。この場合は `state_functions` です。つまり、各状態には独自のハンドラ関数があります。


## 4.8  Handling Events

The function notifying the code lock about a button event is implemented using gen_statem:cast/2:

ボタンイベントをコードロックに通知する関数は、 `gen_statem:cast/2` で実装される。

```erlang
button(Digit) ->
    gen_statem:cast(?NAME, {button, Digit}).
```


The first argument is the name of the gen_statem and must agree with the name used to start it. So, we use the same macro ?NAME as when starting. {button,Digit} is the event content.

最初の引数は gen_statem の名前であり、それを開始するために使用される名前と一致しなければなりません。したがって、起動時と同じマクロ `?NAME` を使用します。 `{button, Digit}` はイベントの内容です。

The event is made into a message and sent to the gen_statem. When the event is received, the gen_statem calls StateName(cast, Event, Data), which is expected to return a tuple {next_state, NewStateName, NewData}, or {next_state, NewStateName, NewData, Actions}. StateName is the name of the current state and NewStateName is the name of the next state to go to. NewData is a new value for the server data of the gen_statem, and Actions is a list of actions on the gen_statem engine.

このイベントはメッセージとして作成され、 gen_statem に送信されます。
イベントが受信されると、 gen_statem は `{next_state, NewStateName, NewData}` か `{next_state, NewStateName, NewData, Actions}` を返す `StateName(cast, Event, Data)` を呼び出します。
`StateName` は現在の状態の名前であり `NewStateName` は次の状態の名前です。
`NewData` は gen_statem のサーバデータの新しい値で、 `Actions` は gen_statem エンジンのアクションのリストである。


```erlang
locked(
  cast, {button,Digit},
  #{code := Code, remaining := Remaining} = Data) ->
    case Remaining of
        [Digit] -> % Complete
            do_unlock(),
            {next_state, open, Data#{remaining := Code},
             [{state_timeout,10000,lock}]};
        [Digit|Rest] -> % Incomplete
            {next_state, locked, Data#{remaining := Rest}};
        [_|_] -> % Wrong
            {next_state, locked, Data#{remaining := Code}}
    end.

open(state_timeout, lock, Data) ->
    do_lock(),
    {next_state, locked, Data};
open(cast, {button,_}, Data) ->
    {next_state, open, Data}.
```

If the door is locked and a button is pressed, the pressed button is compared with the next correct button. Depending on the result, the door is either unlocked and the gen_statem goes to state open, or the door remains in state locked.

ドアがロックされてボタンが押されると、押されたボタンは次の正しいボタンと比較されます。その結果に応じて、ドアはロック解除され gen_statem はオープン状態になるか、またはドアがロック状態のままになる。


If the pressed button is incorrect, the server data restarts from the start of the code sequence.

押されたボタンが間違っていると、サーバデータはコードシーケンスの開始から再開します。


If the whole code is correct, the server changes states to open.

コード全体が正しい場合、サーバは状態を open に変更します。


In state open, a button event is ignored by staying in the same state. This can also be done by returning {keep_state, Data} or in this case since Data unchanged even by returning keep_state_and_data.

Open 状態の場合、ボタンイベントは同じ状態にとどまることによって無視されます。これは、 `{keep_state, Data}` を返す、またはデータが不変の場合は `keep_state_and_data` を返すことでもできます。


## 4.9  State Time-Outs

When a correct code has been given, the door is unlocked and the following tuple is returned from locked/2:

正しいコードが与えられると、ドアはロック解除され `locked/2` から次のタプルが返されます。


```erlang
{next_state, open, Data#{remaining := Code}, [{state_timeout, 10000, lock}]};
```

10,000 is a time-out value in milliseconds. After this time (10 seconds), a time-out occurs. Then, StateName(state_timeout, lock, Data) is called. The time-out occurs when the door has been in state open for 10 seconds. After that the door is locked again:

10,000 はミリ秒単位のタイムアウト値です。この時間(10 秒)後、タイムアウトが発生します。次に、 `StateName(state_timeout, lock, Data)` が呼び出されます。タイムアウトは、ドアが 10 秒間 open 状態になったあとで発生します。その後、ドアは再びロックされます。


```erlang
open(state_timeout, lock,  Data) ->
    do_lock(),
    {next_state, locked, Data};
```

The timer for a state time-out is automatically cancelled when the state machine changes states. You can restart a state time-out by setting it to a new time, which cancels the running timer and starts a new. This implies that you can cancel a state time-out by restarting it with time infinity.

ステートマシンがステートを変更すると、ステートタイムアウトのタイマーは自動的にキャンセルされます。ステートタイムアウトを新しい時間に設定すると、実行中のタイマーをキャンセルして新しいタイマーを開始することができます。これは、無限に時間を戻して状態のタイムアウトをキャンセルできることを意味します。


## 4.10  All State Events

Sometimes events can arrive in any state of the gen_statem. It is convenient to handle these in a common state handler function that all state functions call for events not specific to the state.

場合によっては、 gen_statem のどの状態でもイベントが到着することがあります。すべての状態関数が状態に固有でないイベントを呼び出す共通の状態ハンドラ関数でこれらを処理すると便利です。

Consider a code_length/0 function that returns the length of the correct code (that should not be sensitive to reveal). We dispatch all events that are not state-specific to the common function handle_event/3:

正確なコードの長さを返す `code_length/0` 関数を考えてみましょう。状態固有でないすべてのイベントを共通関数 `handle_event/3` にディスパッチします。


```erlang
...
-export([button/1,code_length/0]).
...

code_length() ->
    gen_statem:call(?NAME, code_length).

...
locked(...) -> ... ;
locked(EventType, EventContent, Data) ->
    handle_event(EventType, EventContent, Data).

...
open(...) -> ... ;
open(EventType, EventContent, Data) ->
    handle_event(EventType, EventContent, Data).

handle_event({call,From}, code_length, #{code := Code} = Data) ->
    {keep_state, Data, [{reply,From,length(Code)}]}.
```

This example uses gen_statem:call/2, which waits for a reply from the server. The reply is sent with a {reply,From,Reply} tuple in an action list in the {keep_state, ...} tuple that retains the current state. This return form is convenient when you want to stay in the current state but do not know or care about what it is.

この例では、 `gen_statem:call/2` を使用し て、サーバーからの応答を待ちます。返信は、現在の状態を保持する`{keep_state, ...}` タプルのアクションリストの `{reply, From, Reply}` タプルで送信されます。この応答フォームは、現在の状態にとどまりたいが、それが何であるかを知らないか気にしないときに便利です。


## 4.11  One Event Handler

If mode handle_event_function is used, all events are handled in Module:handle_event/4 and we can (but do not have to) use an event-centered approach where we first branch depending on event and then depending on state:

モード handle_event_function が使用されている場合、すべてのイベントは `Module:handle_event/4` で処理され 、イベントに応じて最初に分岐し、次に状態に応じて分岐するイベント中心のアプローチを使用できます(ただし、そうする必要はありません)。


```erlang
...
-export([handle_event/4]).

...
callback_mode() ->
    handle_event_function.

handle_event(cast, {button,Digit}, State, #{code := Code} = Data) ->
    case State of
        locked ->
            case maps:get(remaining, Data) of
                [Digit] -> % Complete
                    do_unlock(),
                    {next_state, open, Data#{remaining := Code},
                     [{state_timeout,10000,lock}};
                [Digit|Rest] -> % Incomplete
                    {keep_state, Data#{remaining := Rest}};
                [_|_] -> % Wrong
                    {keep_state, Data#{remaining := Code}}
            end;
        open ->
            keep_state_and_data
    end;
handle_event(state_timeout, lock, open, Data) ->
    do_lock(),
    {next_state, locked, Data}.

...
```

## 4.12  Stopping

### In a Supervision Tree

If the gen_statem is part of a supervision tree, no stop function is needed. The gen_statem is automatically terminated by its supervisor. Exactly how this is done is defined by a shutdown strategy set in the supervisor.

場合 gen_statem が supervision tree の一部であり、 stop 関数が不要な場合。 gen_statem は自動的に supervisor に終了されます。これがどのように行われるかは、 supervisor に設定された シャットダウン戦略によって決まります。

If it is necessary to clean up before termination, the shutdown strategy must be a time-out value and the gen_statem must in function init/1 set itself to trap exit signals by calling process_flag(trap_exit, true):

終了前にクリーンアップする必要がある場合、シャットダウンストラテジはタイムアウト値でなければならず、 gen_statem は `init/1` 関数で `process_flag(trap_exit , true)` を呼び出して終了信号をトラップするように設定する 必要があります。


```erlang
init(Args) ->
    process_flag(trap_exit, true),
    do_lock(),
    ...
```

When ordered to shut down, the gen_statem then calls callback function terminate(shutdown, State, Data).

シャットダウンするように指示されると、 gen_statem はコールバック関数 `terminate(shutdown, State, Data)` を呼び出します。

In this example, function terminate/3 locks the door if it is open, so we do not accidentally leave the door open when the supervision tree terminates:

この例では、 terminate/3 はドアが開いている場合にロックします。したがって、 supervision tree が terminate したときに誤ってドアを開いたままにしません。


```erlang
terminate(_Reason, State, _Data) ->
    State =/= locked andalso do_lock(),
    ok.
```


### Standalone gen_statem

If the gen_statem is not part of a supervision tree, it can be stopped using gen_statem:stop, preferably through an API function:

gen_statem が supervision tree の一部ではない場合、 gen_statem:stop を利用して停止することもできる。好ましくは API 関数を介し:

```erlang
...
-export([start_link/1,stop/0]).

...
stop() ->
    gen_statem:stop(?NAME).
```

This makes the gen_statem call callback function terminate/3 just like for a supervised server and waits for the process to terminate.

これにより、 gen_statem はコールコールバック関数 teminate/3 を呼び出し、監視対象サーバと同様にプロセスが終了するのを待ちます。


## 4.13  Event Time-Outs

A timeout feature inherited from gen_statem's predecessor gen_fsm, is an event time-out, that is, if an event arrives the timer is cancelled. You get either an event or a time-out, but not both.

gen_statem の前身である gen_fsm から継承したタイムアウト機能は、タイマーがキャンセルするとイベントが到着するタイムアウト機能です。
イベントかタイムアウトのどちらかを受け取り、両方ではありません。

It is ordered by the state transition action {timeout,Time,EventContent}, or just Time, or even just Time instead of an action list (the latter is a form inherited from gen_fsm.

これは、状態遷移アクション `{timeout, Time, EventContent}`、または単に Time 、またはアクションリストの代わりに Time だけで順序付けられ ます(後者は gen_fsm から継承されたフォームです)。

This type of time-out is useful to for example act on inactivity. Let us restart the code sequence if no button is pressed for say 30 seconds:

このタイプのタイムアウトは、例えば、非アクティブに対処するのに便利です。たとえば、 30 秒間ボタンを押さなかった場合は、コードシーケンスを再起動します。


```erlang
...

locked(
  timeout, _,
  #{code := Code, remaining := Remaining} = Data) ->
    {next_state, locked, Data#{remaining := Code}};
locked(
  cast, {button,Digit},
  #{code := Code, remaining := Remaining} = Data) ->
...
        [Digit|Rest] -> % Incomplete
            {next_state, locked, Data#{remaining := Rest}, 30000};
...
```


Whenever we receive a button event we start an event timeout of 30 seconds, and if we get an event type timeout we reset the remaining code sequence.

ボタンイベントを受信するたびに、 30 秒のイベントタイムアウトが開始され、イベントタイプのタイムアウトが発生すると、残りのコードシーケンスがリセットされます。

An event timeout is cancelled by any other event so you either get some other event or the timeout event. It is therefore not possible nor needed to cancel or restart an event timeout. Whatever event you act on has already cancelled the event timeout...

イベントのタイムアウトは他のイベントによってキャンセルされ、他のイベントやタイムアウトイベントが発生します。したがって、イベント・タイムアウトを取り消したり、再始動することは不可能でもありません。どのようなイベントを行っても、イベントのタイムアウトは既にキャンセルされています...


## 4.14  Erlang Timers

The previous example of state time-outs only work if the state machine stays in the same state during the time-out time. And event time-outs only work if no disturbing unrelated events occur.

前述の状態タイムアウトの例は、タイムアウト時間中に状態マシンが同じ状態にとどまる場合にのみ機能します。また、イベントのタイムアウトは、無関係なイベントが発生しない場合にのみ機能します。

You may want to start a timer in one state and respond to the time-out in another, maybe cancel the time-out without changing states, or perhaps run multiple time-outs in parallel. All this can be accomplished with Erlang Timers: erlang:start_timer3,4.

1 つの状態でタイマーを開始し、別のタイムアウトに応答することもできます。状態を変更せずにタイムアウトをキャンセルするか、複数のタイムアウトを並行して実行することができます。これはすべて Erlang Timer `erlang:start_timer/3,4` で行うことができます。

Here is how to accomplish the state time-out in the previous example by insted using an Erlang Timer:

代わりに Erlang Timer を使用して前の例の状態タイムアウトを達成する方法は次のとおりです。


```erlang
...
locked(cast, {button,Digit}, #{code := Code, remaining := Remaining} = Data) ->
    case Remaining of
        [Digit] ->
            do_unlock(),
            Tref = erlang:start_timer(10000, self(), lock),
            {next_state, open, Data#{remaining := Code, timer => Tref}};
        ...

open(info, {timeout,Tref,lock}, #{timer := Tref} = Data) ->
    do_lock(),
    {next_state,locked,maps:remove(timer, Data)};
open(cast, {button,_}, Data) ->
    {keep_state,Data};
...
```

Removing the timer key from the map when we change to state locked is not strictly necessary since we can only get into state open with an updated timer map value. But it can be nice to not have outdated values in the state Data!

状態ロックに変更したときにマップからタイマーキーを削除することは、更新されたタイマーマップ値で状態を開くことしかできないため、厳密には必要ではありません。しかし、状態データに期限切れの値を持たないのは良いことです!

If you need to cancel a timer because of some other event, you can use erlang:cancel_timer(Tref). Note that a time-out message cannot arrive after this, unless you have postponed it before (see the next section), so ensure that you do not accidentally postpone such messages. Also note that a time-out message may have arrived just before you cancelling it, so you may have to read out such a message from the process mailbox depending on the return value from erlang:cancel_timer(Tref).

他のイベントのためにタイマーをキャンセルする必要がある場合は、 `erlang:cancel_timer(Tref)` を使用できます。タイムアウト・メッセージは、これを延期した場合(次のセクションを参照)は、誤ってそのようなメッセージを延期しないようにしてください。また、キャンセルする直前にタイムアウト・メッセージが到着した可能性があるので、 `erlang:cancel_timer(Tref)` の戻り値に応じてプロセス・メールボックスからそのようなメッセージを読み取る必要があるかもしれません。

Another way to handle a late time-out can be to not cancel it, but to ignore it if it arrives in a state where it is known to be late.

遅いタイムアウトを処理するもう 1 つの方法は、それを取り消すことではなく、それが遅れていることが分かっている状態に到着した場合には無視することです。


## 4.15  Postponing Events

If you want to ignore a particular event in the current state and handle it in a future state, you can postpone the event. A postponed event is retried after the state has changed, that is, OldState =/= NewState.

現在の状態で特定のイベントを無視し、それを将来の状態で処理したい場合は、そのイベントを延期することができます。延期されたイベントは、状態が変更された後に再試行されます。つまり、 `OldState =/= NewState` です。

Postponing is ordered by the state transition action postpone.

延期は、状態遷移の postpone で行います。

In this example, instead of ignoring button events while in the open state, we can postpone them and they are queued and later handled in the locked state:

この例では、 Open 状態でボタンイベントを無視するのではなく、それらを延期することができ、それらはキューに入れられ、後で locked 状態で処理されます。

```erlang
...
open(cast, {button, _}, Data) ->
    {keep_state, Data, [postpone]};
...
```

Since a postponed event is only retried after a state change, you have to think about where to keep a state data item. You can keep it in the server Data or in the State itself, for example by having two more or less identical states to keep a boolean value, or by using a complex state with callback mode handle_event_function. If a change in the value changes the set of events that is handled, then the value should be kept in the State. Otherwise no postponed events will be retried since only the server Data changes.

延期されたイベントは状態の変更後にのみ再試行されるため、状態データをどこに保持するかについて考える必要があります。ブール値を保持するために、 2 つの多かれ少なかれ同じ状態を持つか、またはコールバックモード handle_event_function で複雑な状態を使用するなどして、サーバーのデータ または状態自体に 保持することができます。値の変更によって処理されるイベントのセットが変更された場合、値は状態に保持されます。そうでなければ、延期されたイベントはサーバデータだけが変更されるので再試行されません。

This is not important if you do not postpone events. But if you later decide to start postponing some events, then the design flaw of not having separate states when they should be, might become a hard to find bug.

イベントを延期しない場合、これは重要ではありません。しかし、後にいくつかのイベントを延期することにした場合、別の状態を持たないという設計上の欠陥が、バグを見つけにくくなる可能性があります。


### Fuzzy State Diagrams

It is not uncommon that a state diagram does not specify how to handle events that are not illustrated in a particular state in the diagram. Hopefully this is described in an associated text or from the context.

状態図では、図の特定の状態には示されていないイベントをどのように処理するかを指定していることは珍しいことではありません。うまくいけば、これは関連するテキストまたは文脈で記述されているといいでしょう。

Possible actions: ignore as in drop the event (maybe log it) or deal with the event in some other state as in postpone it.

取りえる方法は、イベントをドロップする(無視する)ように無視するか、イベントを延期するときと同じように他の状態で処理します。


### Selective Receive

Erlang's selective receive statement is often used to describe simple state machine examples in straightforward Erlang code. The following is a possible implementation of the first example:

Erlang の選択受信文は、単純なステートマシンの例を簡単な Erlang コードで記述するためによく使用されます。以下は、最初の例の実装です。


```erlang
-module(code_lock).
-define(NAME, code_lock_1).
-export([start_link/1, button/1]).

start_link(Code) ->
    spawn(fun() ->
                  true = register(?NAME, self()),
                  do_lock(),
                  locked(Code, Code)
          end).

button(Digit) ->
    ?NAME ! {button, Digit}.

locked(Code, [Digit|Remaining]) ->
    receive
        {button, Digit} when Remaining =:= [] ->
            do_unlock(),
            open(Code);
        {button, Digit} ->
            locked(Code, Remaining);
        {button, _} ->
            locked(Code, Code)
    end.

open(Code) ->
    receive
    after 10000 ->
              do_lock(),
              locked(Code, Code)
    end.

do_lock() ->
    io:format("Locked~n", []).
do_unlock() ->
    io:format("Open~n", []).
```

The selective receive in this case causes implicitly open to postpone any events to the locked state.

この場合の選択的受信は、暗黙的に open て、すべてのイベントを locked 状態に延期させる。

A selective receive cannot be used from a gen_statem behavior as for any gen_* behavior, as the receive statement is within the gen_* engine itself. It must be there because all sys compatible behaviors must respond to system messages and therefore do that in their engine receive loop, passing non-system messages to the callback module.

受信文が gen_* エンジン自体の中にあるので 、 gen_statem ビヘイビアからは、任意の gen_* ビヘイビアのように選択受信を使用することはできません。すべての sys 互換動作がシステムメッセージに応答しなければならないため、非システムメッセージをコールバックモジュールに渡して、エンジン受信ループ内でそれを行う必要があるからです。

The state transition action postpone is designed to model selective receives. A selective receive implicitly postpones any not received events, but the postpone state transition action explicitly postpones one received event.

状態遷移アクションの延期は、選択受信をモデル化するように設計されています。選択的受信は、受信されなかったイベントを暗黙的に延期するが、延期された状態遷移アクションは、受信した 1 つのイベントを明示的に延期する。

Both mechanisms have the same theoretical time and memory complexity, while the selective receive language construct has smaller constant factors.

どちらのメカニズムも理論的な時間とメモリの複雑さは同じですが、選択受信言語構造はより小さい一定の要素を持っています。


## 4.16  State Entry Actions

Say you have a state machine specification that uses state entry actions. Allthough you can code this using self-generated events (described in the next section), especially if just one or a few states has got state entry actions, this is a perfect use case for the built in state enter calls.

状態入力アクションを使用するステートマシン仕様があるとします。これは、自己生成イベント(次のセクションで説明します)を使用してコード化することはできますが、特に 1 つまたは少数の state で state 入力アクションがある場合は、組み込みの状態入力呼び出しの完璧な使用例です。

You return a list containing state_enter from your callback_mode/0 function and the gen_statem engine will call your state callback once with the arguments (enter, OldState, ...) whenever the state changes. Then you just need to handle these event-like calls in all states.

`callback_mode/0` 関数から state_enter を 含むリストを返すと、 gen_statem エンジンは、状態が変わるたびに引数(enter, OldState, ...)で状態コールバックを 1 回呼び出します 。次に、これらのイベントのような呼び出しをすべての状態で処理するだけです。


```erlang
...
init(Code) ->
    process_flag(trap_exit, true),
    Data = #{code => Code},
    {ok, locked, Data}.

callback_mode() ->
    [state_functions,state_enter].

locked(enter, _OldState, Data) ->
    do_lock(),
    {keep_state,Data#{remaining => Code}};
locked(cast, {button,Digit}, #{code := Code, remaining := Remaining} = Data) ->
    case Remaining of
        [Digit] ->
            {next_state, open, Data};
        ...

open(enter, _OldState, _Data) ->
    do_unlock(),
    {keep_state_and_data, [{state_timeout,10000,lock}]};
open(state_timeout, lock, Data) ->
    {next_state, locked, Data};
...
```

You can repeat the state entry code by returning one of {repeat_state, ...}, {repeat_state_and_data,_} or repeat_state_and_data that otherwise behaves exactly like their keep_state siblings. See the type state_callback_result() in the reference manual.

`{repeat_state, ...}`、 `{repeat_state_and_data, _}` または repeat_state_and_data の いずれかを返すことで状態エントリーコードを繰り返すことができます。 それ以外の場合は、 `keep_state` の兄弟とまったく同じように動作します。リファレンスマニュアルの `state_callback_result()` のタイプを参照してください。


### 4.17  Self-Generated Events

It can sometimes be beneficial to be able to generate events to your own state machine. This can be done with the state transition action {next_event,EventType,EventContent}.

自分のステートマシンにイベントを生成できることが有益な場合もあります。これは状態遷移アクション `{next_event, EventType, EventContent}` で行うことができます。

You can generate events of any existing type, but the internal type can only be generated through action next_event. Hence, it cannot come from an external source, so you can be certain that an internal event is an event from your state machine to itself.

既存のタイプのイベントを生成することはできますが、内部タイプはアクション next_event によってのみ生成できます。したがって、外部ソースから来ることはできません。したがって、内部イベントは、自分のステートマシンからそれ自体へのイベントであることが確実になります。

One example for this is to pre-process incoming data, for example decrypting chunks or collecting characters up to a line break. Purists may argue that this should be modelled with a separate state machine that sends pre-processed events to the main state machine. But to decrease overhead the small pre-processing state machine can be implemented in the common state event handling of the main state machine using a few state data variables that then sends the pre-processed events as internal events to the main state machine.

これの 1 つの例は、受信データを前処理することです(例えば、チャンクを解読するか、改行まで文字を収集するなど)。純粋主義者は、前処理されたイベントをメインステートマシンに送信する別のステートマシンでモデル化する必要があると主張するかもしれません。しかし、オーバーヘッドを減少させるために、少量の前処理ステートマシンを、いくつかの状態データ変数を使用して主ステートマシンの共通ステートイベント処理で実装することができ、その後、前処理されたイベントを内部イベントとして主ステートマシンに送信する。

The following example uses an input model where you give the lock characters with put_chars(Chars) and then call enter() to finish the input.

次の例では、ロック文字に put_chars(Chars)を指定し、次に enter()を呼び出して 入力を終了する入力モデルを使用します。


```erlang
...
-export(put_chars/1, enter/0).
...
put_chars(Chars) when is_binary(Chars) ->
    gen_statem:call(?NAME, {chars, Chars}).

enter() ->
    gen_statem:call(?NAME, enter).

...

locked(enter, _OldState, Data) ->
    do_lock(),
    {keep_state, Data#{remaining => Code, buf => []}};
...

handle_event({call, From}, {chars, Chars}, #{buf := Buf} = Data) ->
    {keep_state, Data#{buf := [Chars|Buf], [{reply, From, ok}]};
handle_event({call, From}, enter, #{buf := Buf} = Data) ->
    Chars = unicode:characters_to_binary(lists:reverse(Buf)),
    try binary_to_integer(Chars) of
        Digit ->
            {keep_state, Data#{buf := []}, [{reply, From, ok}, {next_event, internal, {button, Chars}}]}
    catch
        error:badarg ->
            {keep_state, Data#{buf := []}, [{reply, From, {error, not_an_integer}}]}
    end;
...
```

If you start this program with code_lock:start([17]) you can unlock with code_lock:put_chars(<<"001">>), code_lock:put_chars(<<"7">>), code_lock:enter().

このプログラムを `code_lock:start([17])` で 起動すると、 `code_lock:put_chars(<<"001">>)`、 `code_lock:put_chars(<<"7">>)`、 `code_lock:enter()` でロックを解除できます。


## 4.18  Example Revisited

This section includes the example after most of the mentioned modifications and some more using state enter calls, which deserves a new state diagram:

このセクションには、前述の変更のほとんどの例と、いくつかの状態入力コールを使用した新しい状態図が必要な例が含まれています。

![Figure 4.2:   Code Lock State Diagram Revisited](http://erlang.org/doc/design_principles/code_lock_2.png)


Notice that this state diagram does not specify how to handle a button event in the state open. So, you need to read somewhere else that unspecified events must be ignored as in not consumed but handled in some other state. Also, the state diagram does not show that the code_length/0 call must be handled in every state.

この状態図では、 open 状態でボタンイベントを処理する方法は指定されていません。したがって、特定されていないイベントは、消費されずに他の state で処理されなければならないものとして無視する必要があります。また、状態図では 、すべての状態で `code_length/0` コールを処理する必要があることは示されていません。


### Callback Mode: state_functions

Using state functions:

```erlang
-module(code_lock).
-behaviour(gen_statem).
-define(NAME, code_lock_2).

-export([start_link/1, stop/0]).
-export([button/1, code_length/0]).
-export([init/1, callback_mode/0, terminate/3, code_change/4]).
-export([locked/3, open/3]).

start_link(Code) ->
    gen_statem:start_link({local, ?NAME}, ?MODULE, Code, []).
stop() ->
    gen_statem:stop(?NAME).

button(Digit) ->
    gen_statem:cast(?NAME, {button, Digit}).
code_length() ->
    gen_statem:call(?NAME, code_length).

init(Code) ->
    process_flag(trap_exit, true),
    Data = #{code => Code},
    {ok, locked, Data}.

callback_mode() ->
    [state_functions, state_enter].

locked(enter, _OldState, #{code := Code} = Data) ->
    do_lock(),
    {keep_state, Data#{remaining => Code}};
locked(timeout, _, #{code := Code, remaining := Remaining} = Data) ->
    {keep_state, Data#{remaining := Code}};
locked(cast, {button, Digit}, #{code := Code, remaining := Remaining} = Data) ->
    case Remaining of
        [Digit] -> % Complete
            {next_state, open, Data};
        [Digit|Rest] -> % Incomplete
            {keep_state, Data#{remaining := Rest}, 30000};
        [_|_] -> % Wrong
            {keep_state, Data#{remaining := Code}}
    end;
locked(EventType, EventContent, Data) ->
    handle_event(EventType, EventContent, Data).

open(enter, _OldState, _Data) ->
    do_unlock(),
    {keep_state_and_data, [{state_timeout, 10000, lock}]};
open(state_timeout, lock, Data) ->
    {next_state, locked, Data};
open(cast, {button, _}, _) ->
    {keep_state_and_data, [postpone]};
open(EventType, EventContent, Data) ->
    handle_event(EventType, EventContent, Data).

handle_event({call, From}, code_length, #{code := Code}) ->
    {keep_state_and_data, [{reply, From, length(Code)}]}.

do_lock() ->
    io:format("Locked~n", []).
do_unlock() ->
    io:format("Open~n", []).

terminate(_Reason, State, _Data) ->
    State =/= locked andalso do_lock(),
    ok.
code_change(_Vsn, State, Data, _Extra) ->
    {ok, State, Data}.
```

### Callback Mode: handle_event_function

This section describes what to change in the example to use one handle_event/4 function. The previously used approach to first branch depending on event does not work that well here because of the state enter calls, so this example first branches depending on state:

この節では、 `handle_event/4` 関数を 1 つ使用する例で変更する内容について説明します。以前に使用された、イベントに応じた最初の分岐へのアプローチは、状態入力呼び出しのためにここでうまくいきません。したがって、この例は最初に状態によって分岐します。


```erlang
...
-export([handle_event/4]).

...
callback_mode() ->
    [handle_event_function,state_enter].

%% State: locked
handle_event(enter, _OldState, locked, #{code := Code} = Data) ->
    do_lock(),
    {keep_state, Data#{remaining => Code}};
handle_event(timeout, _, locked, #{code := Code, remaining := Remaining} = Data) ->
    {keep_state, Data#{remaining := Code}};
handle_event(cast, {button,Digit}, locked, #{code := Code, remaining := Remaining} = Data) ->
    case Remaining of
        [Digit] -> % Complete
            {next_state, open, Data};
        [Digit|Rest] -> % Incomplete
            {keep_state, Data#{remaining := Rest}, 30000};
        [_|_] -> % Wrong
            {keep_state, Data#{remaining := Code}}
    end;
%%
%% State: open
handle_event(enter, _OldState, open, _Data) ->
    do_unlock(),
    {keep_state_and_data, [{state_timeout,10000,lock}]};
handle_event(state_timeout, lock, open, Data) ->
    {next_state, locked, Data};
handle_event(cast, {button,_}, open, _) ->
    {keep_state_and_data,[postpone]};
%%
%% Any state
handle_event({call,From}, code_length, _State, #{code := Code}) ->
    {keep_state_and_data, [{reply,From,length(Code)}]}.

...
```

Notice that postponing buttons from the locked state to the open state feels like a strange thing to do for a code lock, but it at least illustrates event postponing.

ロック状態からオープン状態への ボタンの延期は、コードロックのためには奇妙なことだと感じますが、少なくともイベントの延期を示しています。


## 4.19  Filter the State

The example servers so far in this chapter print the full internal state in the error log, for example, when killed by an exit signal or because of an internal error. This state contains both the code lock code and which digits that remain to unlock.

この章のこれまでのサンプルサーバーでは、エラーログに完全な内部状態を表示しています(たとえば、終了信号で終了した場合や内部エラーが原因で発生した場合など)。この状態には、コードロックコードとロック解除するために残っている数字の両方が含まれます。


This state data can be regarded as sensitive, and maybe not what you want in the error log because of some unpredictable event.

この状態データは機密と見なすことができ、予測できないイベントのためにエラーログに必要なものではない場合もあります。


Another reason to filter the state can be that the state is too large to print, as it fills the error log with uninteresting details.

状態をフィルタリングするもう 1 つの理由は、エラーログに不都合な詳細が含まれているため、状態が大きすぎて印刷できないことがあります。


To avoid this, you can format the internal state that gets in the error log and gets returned from sys:get_status/1,2 by implementing function Module:format_status/2, for example like this:

これを避けるには、エラーログに 取り込まれ、関数 `Module:format_status/2` を実装して `sys:get_status/1,2` から返される内部状態をフォーマットすることができます。


```erlang
...
-export([init/1,terminate/3,code_change/4,format_status/2]).
...

format_status(Opt, [_PDict,State,Data]) ->
    StateData = {State, maps:filter(fun (code, _) -> false;
                                        (remaining, _) -> false;
                                        (_, _) -> true
                                    end, Data)},
    case Opt of
        terminate ->
            StateData;
        normal ->
            [{data,[{"State",StateData}]}]
    end.
```

It is not mandatory to implement a Module:format_status/2 function. If you do not, a default implementation is used that does the same as this example function without filtering the Data term, that is, StateData = {State,Data}, in this example containing sensitive information.

`Module:format_status/2` 関数を実装することは必須ではありません。そうでない場合は、 Data 項をフィルタリングせずにこの例の関数と同じ、つまり `StateData = {State, Data}` というこの例では機密情報を含むデフォルトの実装が使用されます。


## 4.20  Complex State

The callback mode handle_event_function enables using a non-atom state as described in section Callback Modes, for example, a complex state term like a tuple.

コールバックモード handle_event_function は、コールバックモード、例えばタプルのような複雑な状態の項のように、非アトム状態を使用することを可能にし ます。


One reason to use this is when you have a state item that affects the event handling, in particular in combination with postponing events. We complicate the previous example by introducing a configurable lock button (this is the state item in question), which in the open state immediately locks the door, and an API function set_lock_button/1 to set the lock button.

これを使用する 1 つの理由は、イベント処理に影響を与える状態項目、特に延期イベントとの組み合わせがある場合です。前の例では、設定可能なロックボタン(これは問題の状態アイテム)を導入することによって複雑になりました。これは、開いた状態ですぐにドアをロックし、ロックボタンを設定する API 関数 `set_lock_button/1` を導入します。


Suppose now that we call set_lock_button while the door is open, and have already postponed a button event that until now was not the lock button. The sensible thing can be to say that the button was pressed too early so it is not to be recognized as the lock button. However, then it can be surprising that a button event that now is the lock button event arrives (as retried postponed) immediately after the state transits to locked.

ドアが開いている ときに set_lock_button を呼び出すと、今までロックボタンではなかったボタンイベントが既に延期されているとします。賢明なことは、ボタンが早すぎるため、ロックボタンとして認識されないと言うことができます。しかし、今、ロックボタンイベントでボタンのイベントがすぐに状態遷移した後に(延期再試行のように)到着したことは驚くべきことができますロック。


So we make the button/1 function synchronous by using gen_statem:call and still postpone its events in the open state. Then a call to button/1 during the open state does not return until the state transits to locked, as it is there the event is handled and the reply is sent.

したがって、 gen_statem:call を使用して `button/1` 関数を同期させ 、そのイベントを開いた状態で延期します。次に、開いている 状態の間にボタン/ 1 の呼び出しは、イベントが処理されて応答が送信されるため、状態が locked に遷移するまで戻りません。


If a process now calls set_lock_button/1 to change the lock button while another process hangs in button/1 with the new lock button, it can be expected that the hanging lock button call immediately takes effect and locks the lock. Therefore, we make the current lock button a part of the state, so that when we change the lock button, the state changes and all postponed events are retried.

プロセスが `set_lock_button/1` を呼び出してロックボタンを変更すると、新しいロックボタンで `button/1` に別のプロセスがハングアップしているときに、ハンギングロックボタンの呼び出しがすぐに有効になり、ロックがロックされることが期待できます。したがって、現在のロックボタンを状態の一部にして、ロックボタンを変更すると状態が変わり、すべての延期されたイベントが再試行されます。


We define the state as {StateName,LockButton}, where StateName is as before and LockButton is the current lock button:
状態を `{StateName, LockButton}` と定義します。ここで、 StateName は以前と同じで、 LockButton は現在のロックボタンです。

```erlang
-module(code_lock).
-behaviour(gen_statem).
-define(NAME, code_lock_3).

-export([start_link/2, stop/0]).
-export([button/1, code_length/0, set_lock_button/1]).
-export([init/1, callback_mode/0, terminate/3, code_change/4, format_status/2]).
-export([handle_event/4]).

start_link(Code, LockButton) ->
    gen_statem:start_link({local, ?NAME}, ?MODULE, {Code, LockButton}, []).
stop() ->
    gen_statem:stop(?NAME).

button(Digit) ->
    gen_statem:call(?NAME, {button, Digit}).
code_length() ->
    gen_statem:call(?NAME, code_length).
set_lock_button(LockButton) ->
    gen_statem:call(?NAME, {set_lock_button, LockButton}).

init({Code, LockButton}) ->
    process_flag(trap_exit, true),
    Data = #{code => Code, remaining => undefined},
    {ok, {locked, LockButton}, Data}.

callback_mode() ->
    [handle_event_function, state_enter].

handle_event({call, From}, {set_lock_button, NewLockButton}, {StateName, OldLockButton}, Data) ->
    {next_state, {StateName, NewLockButton}, Data, [{reply, From, OldLockButton}]};
handle_event({call, From}, code_length, {_StateName, _LockButton}, #{code := Code}) ->
    {keep_state_and_data, [{reply, From, length(Code)}]};
%%
%% State: locked
handle_event(EventType, EventContent, {locked, LockButton}, #{code := Code, remaining := Remaining} = Data) ->
    case {EventType, EventContent} of
        {enter, _OldState} ->
            do_lock(),
            {keep_state, Data#{remaining := Code}};
        {timeout, _} ->
            {keep_state, Data#{remaining := Code}};
        {{call, From}, {button, Digit}} ->
            case Remaining of
                [Digit] -> % Complete
                    {next_state, {open, LockButton}, Data, [{reply, From, ok}]};
                [Digit|Rest] -> % Incomplete
                    {keep_state, Data#{remaining := Rest, 30000}, [{reply, From, ok}]};
                [_|_] -> % Wrong
                    {keep_state, Data#{remaining := Code}, [{reply, From, ok}]}
            end
    end;
%%
%% State: open
handle_event(EventType, EventContent, {open, LockButton}, Data) ->
    case {EventType, EventContent} of
        {enter, _OldState} ->
            do_unlock(),
            {keep_state_and_data, [{state_timeout, 10000, lock}]};
        {state_timeout, lock} ->
            {next_state, {locked, LockButton}, Data};
        {{call, From}, {button, Digit}} ->
            if
                Digit =:= LockButton ->
                    {next_state, {locked, LockButton}, Data, [{reply, From, locked}]};
                true ->
                    {keep_state_and_data, [postpone]}
            end
    end.

do_lock() ->
    io:format("Locked~n", []).
do_unlock() ->
    io:format("Open~n", []).

terminate(_Reason, State, _Data) ->
    State =/= locked andalso do_lock(),
    ok.
code_change(_Vsn, State, Data, _Extra) ->
    {ok, State, Data}.
format_status(Opt, [_PDict, State, Data]) ->
    StateData = {State, maps:filter(
                          fun (code, _) -> false;
                              (remaining, _) -> false;
                              (_, _) -> true
                          end,
                          Data)},
    case Opt of
        terminate ->
            StateData;
        normal ->
            [{data, [{"State", StateData}]}]
    end.
```

It can be an ill-fitting model for a physical code lock that the button/1 call can hang until the lock is locked. But for an API in general it is not that strange.
ロックが locked になるまで button/1 コールがハングアップする可能性があるのは、物理モデルからみると不自然かもしれません。しかし、一般的に API にとってはそれほど奇妙ではありません。


## 4.21  Hibernation

If you have many servers in one node and they have some state(s) in their lifetime in which the servers can be expected to idle for a while, and the amount of heap memory all these servers need is a problem, then the memory footprint of a server can be mimimized by hibernating it through proc_lib:hibernate/3.

1 つのノードに多数のサーバーがあり、それらのサーバーがしばらくアイドル状態になると予想される寿命があり、これらのサーバーが必要とするヒープメモリーの量に問題がある場合は、メモリー占有量 `proc_lib:hibernate/3` を使って hibernate することで、サーバの最小化を図ることができ ます。


## Note

It is rather costly to hibernate a process; see erlang:hibernate/3. It is not something you want to do after every event.

プロセスを休止するにはかなりコストがかかります。 `erlang:hibernate/3` を参照してください。すべてのイベントの後にあなたがしたいことではありません。

We can in this example hibernate in the {open,_} state, because what normally occurs in that state is that the state time-out after a while triggers a transition to {locked,_}:

この例では、 `{open, _}` 状態で冬眠することができます。なぜなら、その状態で通常起こるのは、しばらくしてからの状態タイムアウトが `{locked, _}` への遷移を引き起こすからです。

```erlang
...
%% State: open
handle_event(EventType, EventContent, {open, LockButton}, Data) ->
    case {EventType, EventContent} of
        {enter, _OldState} ->
            do_unlock(),
            {keep_state_and_data, [{state_timeout, 10000, lock}, hibernate]};
        ...
```

The atom hibernate in the action list on the last line when entering the {open,_} state is the only change. If any event arrives in the {open,_}, state, we do not bother to rehibernate, so the server stays awake after any event.
`{open, _}` 状態に入るときの最後の行のアクションリスト内の hibernate アトムは唯一の変更です。 `{open, _}` 状態にイベントが到着した場合は、再起動する必要はありません。そのため、サーバーはイベント発生後も起きています。


To change that we would need to insert action hibernate in more places. For example, for the state-independent set_lock_button and code_length operations that then would have to be aware of using hibernate while in the {open,_} state, which would clutter the code.

これを変更するには、より多くの場所に休止状態のアクションを挿入する必要があります。たとえば、状態に依存しない set_lock_button と code_length の操作では、 `{open, _}` 状態で hibernate を 使用することを認識しなければならず、コードが乱雑になります。

Another not uncommon scenario is to use the event time-out to triger hibernation after a certain time of inactivity.

もう 1 つの珍しいシナリオでは、一定時間休止した後にトリガー・ハイバネーションにイベント・タイムアウトを使用することです。

This server probably does not use heap memory worth hibernating for. To gain anything from hibernation, your server would have to produce some garbage during callback execution, for which this example server can serve as a bad example.

このサーバーは、おそらく休止状態の価値のあるヒープメモリーを使用しません。休止状態から何かを得るために、サーバはコールバック実行中にいくつかのガベージを生成する必要があります。そのため、このサンプルサーバは悪い例として役立ちます。
