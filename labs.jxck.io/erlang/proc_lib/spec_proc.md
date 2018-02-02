# 6 sys and proc_lib

## 6 sys and proc_lib

The sys module has functions for simple debugging of processes implemented using behaviours. It also has functions that, together with functions in the proc_lib module, can be used to implement a special process that complies to the OTP design principles without using a standard behaviour. These functions can also be used to implement user-defined (non-standard) behaviours.

SYS のモジュールは、 behaviour で実装されるプロセスの簡単なデバッグのための機能を持っています。また、 proc_lib モジュールの関数とともに、標準 behaviour を使用せずに OTP の設計原則に準拠する special プロセスを実装するために使用できる関数もあります。これらの関数は、ユーザー定義の(非標準) behaviour を実装するためにも使用できます。

Both sys and proc_lib belong to the STDLIB application.

sys と proc_lib はどちらも STDLIB アプリケーションに属します。


### 6.1  Simple Debugging

The sys module has functions for simple debugging of processes implemented using behaviours. The code_lock example from gen_statem Behaviour is used to illustrate this:

SYS のモジュールは、 behaviour を使用して実施されるプロセスの簡単なデバッグのための機能を持っています。 gen_statem behaviour の code_lock の 例を使ってこれを説明します:


```
Erlang/OTP 20 [DEVELOPMENT] [erts-9.0] [source-5ace45e] [64-bit] [smp:8:8] [ds:8:8:10] [async-threads:10] [hipe] [kernel-poll:false]

Eshell V9.0  (abort with ^G)
1>  code_lock:start_link([1,2,3,4]).
Lock
{ok,<0.63.0>}
2> sys:statistics(code_lock, true).
ok
3>  sys:trace(code_lock, true).
ok
4>  code_lock:button(1).
*DBG* code_lock receive cast {button,1} in state locked
ok
*DBG* code_lock consume cast {button,1} in state locked
5>  code_lock:button(2).
*DBG* code_lock receive cast {button,2} in state locked
ok
*DBG* code_lock consume cast {button,2} in state locked
6>  code_lock:button(3).
*DBG* code_lock receive cast {button,3} in state locked
ok
*DBG* code_lock consume cast {button,3} in state locked
7>  code_lock:button(4).
*DBG* code_lock receive cast {button,4} in state locked
ok
Unlock
*DBG* code_lock consume cast {button,4} in state locked
*DBG* code_lock receive state_timeout lock in state open
Lock
*DBG* code_lock consume state_timeout lock in state open
8> sys:statistics(code_lock, get).
{ok,[{start_time,{{2017,4,21},{16,8,7}}},
     {current_time,{{2017,4,21},{16,9,42}}},
     {reductions,2973},
     {messages_in,5},
     {messages_out,0}]}
9> sys:statistics(code_lock, false).
ok
10> sys:trace(code_lock, false).
ok
11> sys:get_status(code_lock).
{status,<0.63.0>,
        {module,gen_statem},
        [[{'$initial_call',{code_lock,init,1}},
          {'$ancestors',[<0.61.0>]}],
         running,<0.61.0>,[],
         [{header,"Status for state machine code_lock"},
          {data,[{"Status",running},
                 {"Parent",<0.61.0>},
                 {"Logged Events",[]},
                 {"Postponed",[]}]},
          {data,[{"State",
                  {locked,#{code => [1,2,3,4],remaining => [1,2,3,4]}}}]}]]}
```


## 6.2  Special Processes

This section describes how to write a process that complies to the OTP design principles, without using a standard behaviour. Such a process is to:

このセクションでは、標準 behaviour を使用せずに、 OTP 設計原則に準拠するプロセスを記述する方法について説明します。そのようなプロセスは、

- Be started in a way that makes the process fit into a supervision tree
- Support the sys debug facilities
- Take care of system messages.


- プロセスが監視ツリーに沿うように開始する
- sys デバッグ機能をサポートする
- システムメッセージを処理する

System messages are messages with a special meaning, used in the supervision tree. Typical system messages are requests for trace output, and requests to suspend or resume process execution (used during release handling). Processes implemented using standard behaviours automatically understand these messages.

システムメッセージは、特別な意味を持つメッセージであり、監視ツリーで使用されます。典型的なシステムメッセージは、トレース出力の要求とプロセス実行の中断または再開要求(リリース処理中に使用される)です。標準 behaviour を使って実装されたプロセスは、これらのメッセージを自動的に理解します。


### Example

The simple server from Overview, implemented using sys and proc_lib so it fits into a supervision tree:

sys と proc_lib を使用して実装されたシンプルなサーバーなので、監視ツリーで扱えます:


```erlang
-module(ch4).
-export([start_link/0]).
-export([alloc/0, free/1]).
-export([init/1]).
-export([system_continue/3,
         system_terminate/4,
         write_debug/3,
         system_get_state/1,
         system_replace_state/2]).

start_link() ->
    proc_lib:start_link(ch4, init, [self()]).

alloc() ->
    ch4 ! {self(), alloc},
    receive
        {ch4, Res} ->
            Res
    end.

free(Ch) ->
    ch4 ! {free, Ch},
    ok.

init(Parent) ->
    register(ch4, self()),
    Chs = channels(),
    Deb = sys:debug_options([]),
    proc_lib:init_ack(Parent, {ok, self()}),
    loop(Chs, Parent, Deb).

loop(Chs, Parent, Deb) ->
    receive
        {From, alloc} ->
            Deb2 = sys:handle_debug(Deb, fun ch4:write_debug/3, ch4, {in, alloc, From}),
            {Ch, Chs2} = alloc(Chs),
            From ! {ch4, Ch},
            Deb3 = sys:handle_debug(Deb2, fun ch4:write_debug/3, ch4, {out, {ch4, Ch}, From}),
            loop(Chs2, Parent, Deb3);
        {free, Ch} ->
            Deb2 = sys:handle_debug(Deb, fun ch4:write_debug/3, ch4, {in, {free, Ch}}),
            Chs2 = free(Ch, Chs),
            loop(Chs2, Parent, Deb2);
        {system, From, Request} ->
            sys:handle_system_msg(Request, From, Parent, ch4, Deb, Chs)
    end.

system_continue(Parent, Deb, Chs) ->
    loop(Chs, Parent, Deb).

system_terminate(Reason, _Parent, _Deb, _Chs) ->
    exit(Reason).

system_get_state(Chs) ->
    {ok, Chs}.

system_replace_state(StateFun, Chs) ->
    NChs = StateFun(Chs),
    {ok, NChs, NChs}.

write_debug(Dev, Event, Name) ->
    io:format(Dev, "~p event = ~p~n", [Name, Event]).
```

Example on how the simple debugging functions in the sys module can also be used for ch4:

sys モジュールの単純なデバッグ機能を ch4 でどのように使用できるかの例:


```erlang
% erl
Erlang (BEAM) emulator version 5.2.3.6 [hipe] [threads:0]

Eshell V5.2.3.6  (abort with ^G)
1> ch4:start_link().
{ok,<0.30.0>}
2> sys:statistics(ch4, true).
ok
3> sys:trace(ch4, true).
ok
4> ch4:alloc().
ch4 event = {in,alloc,<0.25.0>}
ch4 event = {out,{ch4,ch1},<0.25.0>}
ch1
5> ch4:free(ch1).
ch4 event = {in,{free,ch1}}
ok
6> sys:statistics(ch4, get).
{ok,[{start_time,{{2003,6,13},{9,47,5}}},
     {current_time,{{2003,6,13},{9,47,56}}},
     {reductions,109},
     {messages_in,2},
     {messages_out,1}]}
7> sys:statistics(ch4, false).
ok
8> sys:trace(ch4, false).
ok
9> sys:get_status(ch4).
{status,<0.30.0>,
        {module,ch4},
        [[{'$ancestors',[<0.25.0>]},{'$initial_call',{ch4,init,[<0.25.0>]}}],
         running,<0.25.0>,[],
         [ch1,ch2,ch3]]}
```


## Starting the Process

A function in the proc_lib module is to be used to start the process. Several functions are available, for example, spawn_link/3,4 for asynchronous start and start_link/3,4,5 for synchronous start.

proc_lib モジュール内の関数を使用してプロセスを開始します。たとえば、非同期開始の場合は `spawn_link/3,4` 、同期開始の場合は `start_link/3,4,5` など、いくつかの関数を使用できます。

A process started using one of these functions stores information (for example, about the ancestors and initial call) that is needed for a process in a supervision tree.

これらの関数の 1 つを使用して開始されたプロセスは、監視ツリーにあるプロセスが必要とする情報(たとえば、祖先と初期呼び出しに関する情報)を格納します。

If the process terminates with another reason than normal or shutdown, a crash report is generated. For more information about the crash report, see the SASL User's Guide.

normal or shutdown 以外の理由でプロセスが終了すると 、クラッシュレポートが生成されます。クラッシュレポートの詳細については、「SASL ユーザーズガイド」を参照してください。

In the example, synchronous start is used. The process starts by calling ch4:start_link():

この例では、同期起動が使用されています。プロセスは、 `ch4:start_link()` を呼び出して開始します。


```erlang
start_link() ->
    proc_lib:start_link(ch4, init, [self()]).
```

ch4:start_link calls the function proc_lib:start_link. This function takes a module name, a function name, and an argument list as arguments, spawns, and links to a new process. The new process starts by executing the given function, here ch4:init(Pid), where Pid is the pid (self()) of the first process, which is the parent process.

`ch4:start_link` は、関数 `proc_lib:start_link` を呼び出します。この関数は、モジュール名、関数名、および引数リストを引数として取り込み、新しいプロセスへのリンクを生成します。新しいプロセスは、与えられた関数、ここでは `ch4:init(Pid)` を実行することから始まります。ここで、 Pid は親プロセスである最初のプロセスの `pid(self())` です。

All initialization, including name registration, is done in init. The new process must also acknowledge that it has been started to the parent:

初期化処理(名前の登録を含む)は init で行われます。新しいプロセスは、開始処理を行った親プロセスに ACK を返さなければなりません。


```erlang
init(Parent) ->
    ...
    proc_lib:init_ack(Parent, {ok, self()}),
    loop(...).
```

proc_lib:start_link is synchronous and does not return until proc_lib:init_ack has been called.

`proc_lib:start_link` は同期的で、 `proc_lib:init_ack` が呼び出されるまで戻りません。


### Debugging

To support the debug facilites in sys, a debug structure is needed. The Deb term is initialized using sys:debug_options/1:

sys のデバッグ機能をサポートするには、  debug structure が必要です。 Deb が `sys:debug_options/1` を利用して初期化されます。


```erlang
init(Parent) ->
    ...
    Deb = sys:debug_options([]),
    ...
    loop(Chs, Parent, Deb).
```

sys:debug_options/1 takes a list of options as argument. Here the list is empty, which means no debugging is enabled initially. For information about the possible options, see the sys(3) manual page in STDLIB.

`sys:debug_options/1` はオプションのリストを引数として取ります。ここでは、リストは空です。つまり、最初にデバッグは有効になっていません。可能なオプションについては 、 STDLIB の sys(3) マニュアルページを参照してください。

Then, for each system event to be logged or traced, the following function is to be called.

次に、ログまたはトレースされるシステムイベントごとに、以下の関数が呼び出されます。


```erlang
sys:handle_debug(Deb, Func, Info, Event) => Deb1
```

Here:

- Deb is the debug structure.
- Func is a fun specifying a (user-defined) function used to format trace output. For each system event, the format function is called as Func(Dev, Event, Info), where:
  - Dev is the I/O device to which the output is to be printed. See the io(3) manual page in STDLIB.
  - Event and Info are passed as is from handle_debug.
- Info is used to pass more information to Func. It can be any term and is passed as is.
- Event is the system event. It is up to the user to define what a system event is and how it is to be represented. Typically at least incoming and outgoing messages are considered system events and represented by the tuples {in,Msg[,From]} and {out,Msg,To}, respectively.

- Deb はデバッグ構造です。
- Func は、トレース出力のフォーマットに使用される(ユーザー定義の)関数です。各システムイベントについて、フォーマット関数は `Func(Dev, Event, Info)` として呼び出されます。
  - Dev は、出力を印刷する I/O デバイスです。 STDLIB の `io(3)` マニュアルページを参照してください。
  - Event と Info は、`handle_debug` からそのまま渡されます。
- Info は Func により多くの情報を渡すために使用されます。それはどんな値でもよく、そのまま渡されます。
- Event はシステムイベントです。システムイベントが何であるか、どのように表現されるかを定義するのは、ユーザーの責任です。通常、少なくとも受信メッセージと発信メッセージはシステムイベントとみなされ、タプル `{in,Msg[,From]} and {out,Msg,To}` でそれぞれ表されます。

handle_debug returns an updated debug structure Deb1.

handle_debug が更新したデバッグ構造 Deb1 を返します。

In the example, handle_debug is called for each incoming and outgoing message. The format function Func is the function `ch4:write_debug/3`, which prints the message using `io:format/3`.

この例では、着信/発信メッセージごとに `handle_debug` が呼び出されます。フォーマット関数 Func は関数 `ch4:write_debug/3` で、 `io:format/3` を使ってメッセージを出力します。


```erlang
loop(Chs, Parent, Deb) ->
    receive
        {From, alloc} ->
            Deb2 = sys:handle_debug(Deb, fun ch4:write_debug/3, ch4, {in, alloc, From}),
            {Ch, Chs2} = alloc(Chs),
            From ! {ch4, Ch},
            Deb3 = sys:handle_debug(Deb2, fun ch4:write_debug/3, ch4, {out, {ch4, Ch}, From}),
            loop(Chs2, Parent, Deb3);
        {free, Ch} ->
            Deb2 = sys:handle_debug(Deb, fun ch4:write_debug/3, ch4, {in, {free, Ch}}),
            Chs2 = free(Ch, Chs),
            loop(Chs2, Parent, Deb2);
        ...
    end.

write_debug(Dev, Event, Name) ->
    io:format(Dev, "~p event = ~p~n", [Name, Event]).
```


## Handling System Messages

System messages are received as:

システムメッセージは次のように受信されます。


```
{system, From, Request}
```

The content and meaning of these messages do not need to be interpreted by the process. Instead the following function is to be called:

これらのメッセージの内容と意味は、プロセスによって解釈される必要はありません。代わりに、次の関数を呼び出す必要があります。


```
sys:handle_system_msg(Request, From, Parent, Module, Deb, State)
```

This function does not return. It handles the system message and then either calls the following if process execution is to continue:

この関数は戻りません。システムメッセージを処理し、プロセスの実行を続行する場合は、次のいずれかを呼び出します。


```
Module:system_continue(Parent, Deb, State)
```

Or calls the following if the process is to terminate:

プロセスが終了する場合は、次のように呼び出します。


```
Module:system_terminate(Reason, Parent, Deb, State)
```

A process in a supervision tree is expected to terminate with the same reason as its parent.

監視ツリー内のプロセスは、親プロセスと同じ理由で終了することが予想されます。

- Request and From are to be passed as is from the system message to the call to handle_system_msg.
- Parent is the pid of the parent.
- Module is the name of the module.
- Deb is the debug structure.
- State is a term describing the internal state and is passed to system_continue/system_terminate/ system_get_state/system_replace_state.

- Request および From はそのままシステムメッセージから handle_system_msg の呼び出しに渡されます。
- Parent は親の PID です。
- Module はモジュールの名前です。
- Deb はデバッグ構造です。
- State は内部状態を記述する用語で、 `system_continue/system_terminate/system_get_state/system_replace_state` に渡されます。

If the process is to return its state, handle_system_msg calls:

プロセスが状態を返すことになっている場合、 `handle_system_msg` は以下を呼び出します。


```
Module:system_get_state(State)
```

If the process is to replace its state using the fun StateFun, handle_system_msg calls:

プロセスが fun StateFun を使用して状態を置き換えることになっている場合、 `handle_system_msg` は次の呼び出しを行います。


```
Module:system_replace_state(StateFun, State)
```

In the example:


```erlang
loop(Chs, Parent, Deb) ->
    receive
        ...

        {system, From, Request} ->
            sys:handle_system_msg(Request, From, Parent, ch4, Deb, Chs)
    end.

system_continue(Parent, Deb, Chs) ->
    loop(Chs, Parent, Deb).

system_terminate(Reason, Parent, Deb, Chs) ->
    exit(Reason).

system_get_state(Chs) ->
    {ok, Chs, Chs}.

system_replace_state(StateFun, Chs) ->
    NChs = StateFun(Chs),
    {ok, NChs, NChs}.
```

If the special process is set to trap exits and if the parent process terminates, the expected behavior is to terminate with the same reason:

special process が exit をトラップするように設定されていて、親プロセスが終了した場合、期待される動作は同じ理由での終了です。


```erlang
init(...) ->
    ...,
    process_flag(trap_exit, true),
    ...,
    loop(...).

loop(...) ->
    receive
        ...

        {'EXIT', Parent, Reason} ->
            ..maybe some cleaning up here..
            exit(Reason);
        ...
    end.
```


### 6.3  User-Defined Behaviours

To implement a user-defined behaviour, write code similar to code for a special process, but call functions in a callback module for handling specific tasks.

ユーザー定義の behaviour を実装するには、 special process のコードと同様のコードを記述しますが、特定のタスクを処理するコールバックモジュールの関数を呼び出します。

If the compiler is to warn for missing callback functions, as it does for the OTP behaviours, add -callback attributes in the behaviour module to describe the expected callbacks:

コンパイラが欠落しているコールバック関数を警告する場合は、 OTP behaviour の場合と同様に、 behaviour モジュールに`-callback` 属性を追加して、予期されるコールバックを記述します。


```erlang
-callback Name1(Arg1_1, Arg1_2, ..., Arg1_N1) -> Res1.
-callback Name2(Arg2_1, Arg2_2, ..., Arg2_N2) -> Res2.
...
-callback NameM(ArgM_1, ArgM_2, ..., ArgM_NM) -> ResM.
```

NameX are the names of the expected callbacks. ArgX_Y and ResX are types as they are described in Types and Function Specifications. The whole syntax of the -spec attribute is supported by the -callback attribute.

NameX は、予想されるコールバックの名前です。 ArgX_Y と ResX は型と関数の仕様で説明されている型です。`-spec` 属性の構文全体は、`-callback` 属性でサポートされています。

Callback functions that are optional for the user of the behaviour to implement are specified by use of the -optional_callbacks attribute:

behaviour の実装者がオプションとするコールバック関数は、 `-optional_callbacks` 属性を使用して指定します。


```
-optional_callbacks([OptName1/OptArity1, ..., OptNameK/OptArityK]).
```

where each OptName/OptArity specifies the name and arity of a callback function. Note that the -optional_callbacks attribute is to be used together with the -callback attribute; it cannot be combined with the behaviour_info() function described below.

各 OptName/OptArity は、コールバック関数の名前とアリティを指定します。 `-optional_callbacks` の属性は `-callback` 属性とともに利用されることに注意してください。後述の `behaviour_info()` 関数と組み合わせることはできません 。

Tools that need to know about optional callback functions can call Behaviour:behaviour_info(optional_callbacks) to get a list of all optional callback functions.

オプションのコールバック関数について知る必要があるツールは、 `Behavior:behaviour_info(optional_callbacks)` を呼び出して、すべてのオプションのコールバック関数のリストを取得できます。

We recommend using the -callback attribute rather than the behaviour_info() function. The reason is that the extra type information can be used by tools to produce documentation or find discrepancies.

`behaviour_info()` 関数ではなく `-callback` 属性を使用することをお勧めします。その理由は、追加のタイプ情報をツールで使用してドキュメントを作成したり、矛盾を見つけたりするためです。

As an alternative to the -callback and -optional_callbacks attributes you may directly implement and export behaviour_info():

`-callback` と `-optional_callbacks` 要素の代わりとして、 `behaviour_info()` を直接実装し export することもできます。


```erlang
behaviour_info(callbacks) ->
    [{Name1, Arity1},...,{NameN, ArityN}].
```

where each {Name, Arity} specifies the name and arity of a callback function. This function is otherwise automatically generated by the compiler using the -callback attributes.

各 `{Name, Arity}` は、コールバック関数の名前とアリティを指定します。この関数は、`-callback` 属性を使用してコンパイラによって自動的に生成されます。

When the compiler encounters the module attribute -behaviour(Behaviour). in a module Mod, it calls Behaviour:behaviour_info(callbacks) and compares the result with the set of functions actually exported from Mod, and issues a warning if any callback function is missing.

コンパイラがモジュール属性 `-behaviour(Behaviour)` を検出したとき。モジュール Mod では `Behaviour:behaviour_info(callbacks)` を呼び出し、その結果を Mod から実際にエクスポートされた関数のセットと比較し、コールバック関数がない場合に警告を出します。


```erlang
%% User-defined behaviour module
-module(simple_server).
-export([start_link/2, init/3, ...]).

-callback init(State :: term()) -> 'ok'.
-callback handle_req(Req :: term(), State :: term()) -> {'ok', Reply :: term()}.
-callback terminate() -> 'ok'.
-callback format_state(State :: term()) -> term().

-optional_callbacks([format_state/1]).

%% Alternatively you may define:
%%
%% -export([behaviour_info/1]).
%% behaviour_info(callbacks) ->
%%     [{init,1},
%%      {handle_req,2},
%%      {terminate,0}].

start_link(Name, Module) ->
    proc_lib:start_link(?MODULE, init, [self(), Name, Module]).

init(Parent, Name, Module) ->
    register(Name, self()),
    ...,
    Dbg = sys:debug_options([]),
    proc_lib:init_ack(Parent, {ok, self()}),
    loop(Parent, Module, Deb, ...).

...
```

In a callback module:


```erlang
-module(db).
-behaviour(simple_server).

-export([init/1, handle_req/2, terminate/0]).

...
```

The contracts specified with -callback attributes in behaviour modules can be further refined by adding -spec attributes in callback modules. This can be useful as -callback contracts are usually generic. The same callback module with contracts for the callbacks:

behaviour モジュールの `-callback` 属性で指定されたコントラクトは、コールバックモジュールに `-spec` 属性を追加することでさらに洗練されます。これは、`-callback` コントラクトが通常は一般的なので便利です。コールバックの契約を持つ同じコールバックモジュール:


```erlang
-module(db).
-behaviour(simple_server).

-export([init/1, handle_req/2, terminate/0]).

-record(state, {field1 :: [atom()], field2 :: integer()}).

-type state()   :: #state{}.
-type request() :: {'store', term(), term()};
                   {'lookup', term()}.

...

-spec handle_req(request(), state()) -> {'ok', term()}.

...
```

Each -spec contract is to be a subtype of the respective -callback contract.

各 `-spec` は、それぞれの `-callback` のサブタイプになります 。
