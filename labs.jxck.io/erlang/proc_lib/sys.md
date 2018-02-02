# sys

## Module

sys


## Module Summary

A functional interface to system messages.

システムメッセージへの機能的なインターフェース。


## Description

This module contains functions for sending system messages used by programs, and messages used for debugging purposes.

このモジュールには、プログラムによって使用されるシステムメッセージと、デバッグ目的で使用されるメッセージを送信するための関数が含まれています。

Functions used for implementation of processes are also expected to understand system messages, such as debug messages and code change. These functions must be used to implement the use of system messages for a process; either directly, or through standard behaviors, such as gen_server.

プロセスを実装するための関数は、デバッグメッセージやコード変更などのシステムメッセージを理解することが期待されます。これらの関数は、プロセスのシステムメッセージをハンドリングするために、直接、または gen_server などの behavior を介して実行されます。

The default time-out is 5000 ms, unless otherwise specified. timeout defines the time to wait for the process to respond to a request. If the process does not respond, the function evaluates exit({timeout, {M, F, A}}).

特に指定がない限り、デフォルトのタイムアウトは 5000ms です。 timeout は、プロセスがリクエストに答えるのを待つ時間を定義します。プロセスが応答しない場合、関数は `exit({timeout, {M, F, A}})` を評価します。

The functions make references to a debug structure. The debug structure is a list of dbg_opt(), which is an internal data type used by function handle_system_msg/6. No debugging is performed if it is an empty list.

この関数は、デバッグ構造を参照します。デバッグ構造体は `dbg_opt()` のリストで、 `handle_system_msg/6` で使用される内部データ型です。空のリストの場合、デバッグは実行されません。


## System Messages

Processes that are not implemented as one of the standard behaviour must still understand system messages. The following three messages must be understood:

標準 behaviour として実装されていないプロセスでも、システムメッセージを理解する必要があります。次の 3 つのメッセージは理解必須です。

Plain system messages. These are received as {system, From, Msg}. The content and meaning of this message are not interpreted by the receiving process module. When a system message is received, function handle_system_msg/6 is called to handle the request.

Plain system messages. これらは `{system, From, Msg}` として受信されます。このメッセージの内容と意味は、受信プロセスモジュールによって解釈されません。システムメッセージが受信されると、 `handle_system_msg/6` が呼び出されて要求を処理します。

Shutdown messages. If the process traps exits, it must be able to handle a shutdown request from its parent, the supervisor. The message {'EXIT', Parent, Reason} from the parent is an order to terminate. The process must terminate when this message is received, normally with the same Reason as Parent.

Shutdown messages. プロセストラップが終了する場合、その親である supervisor からの `shutdown` 要求を処理できなければなりません。親からのメッセージ `{'EXIT', Parent, Reason}` は、 terminate するための命令です。このメッセージが受信された場合、プロセスは終了しなければなりません。通常、親の Reason と同じです。

If the modules used to implement the process change dynamically during runtime, the process must understand one more message. An example is the gen_event processes. The message is {_Label, {From, Ref}, get_modules}. The reply to this message is From ! {Ref, Modules}, where Modules is a list of the currently active modules in the process.

プロセスを実装するために使用されるモジュールが実行時に動的に変更される場合、プロセスはもう 1 つのメッセージを理解する必要があります。一例は gen_event プロセスです。メッセージは `{_Label, {From, Ref}, get_modules}` です。このメッセージへの返信は `From ! {Ref, Modules}`、ここで Modules はプロセス内の現在アクティブなモジュールのリストです。

This message is used by the release handler to find which processes that execute a certain module. The process can later be suspended and ordered to perform a code change for one of its modules.

このメッセージは、リリース・ハンドラによって、特定のモジュールを実行するプロセスを検出するために使用されます。プロセスは後で suspend され、そのモジュールの 1 つの code change を実行するように指示されます。


## System Events

When debugging a process with the functions of this module, the process generates system_events, which are then treated in the debug function. For example, trace formats the system events to the terminal.

このモジュールの機能を使用してプロセスをデバッグする場合、プロセスは `system_events` を生成し、デバッグ関数で処理されます。例えば、 trace はシステムイベントを端末にフォーマットします。

Three predefined system events are used when a process receives or sends a message. The process can also define its own system events. It is always up to the process itself to format these events.

プロセスがメッセージを受信または送信する場合、 3 つの定義済みのシステムイベントが使用されます。このプロセスでは、独自のシステムイベントを定義することもできます。これらのイベントのフォーマットは、プロセス自体に依存します。


### Exports


```
change_code(Name, Module, OldVsn, Extra) -> ok | {error, Reason}
change_code(Name, Module, OldVsn, Extra, Timeout) -> ok | {error, Reason}
```

Tells the process to change code. The process must be suspended to handle this message. Argument Extra is reserved for each process to use as its own. Function Module:system_code_change/4 is called. OldVsn is the old version of the Module.

プロセスにコードを変更するよう指示します。このメッセージを処理するには、プロセスを中断する必要があります。引数 Extra は、各プロセスが独自のものとして使用するために予約されています。関数 `Module:system_code_change/4` が呼ばれます。 OldVsn は旧バージョンのモジュールです。


```
get_state(Name) -> State
get_state(Name, Timeout) -> State
```

プロセスの状態を取得します。

These functions are intended only to help with debugging. They are provided for convenience, allowing developers to avoid having to create their own state extraction functions and also avoid having to interactively extract the state from the return values of get_status/1 or get_status/2 while debugging.

これらの関数は、デバッグに役立つだけのものです。これらは便宜のために提供されているため、開発者は独自の状態抽出関数を作成する必要がなくなり 、またデバッグ中に `get_status/1` または `get_status/2` の戻り値から状態をインタラクティブに抽出する必要もありません。

The value of State varies for different types of processes, as follows:

State の値は、次のようにプロセスのタイプによって異なります。

- For a gen_server process, the returned State is the state of the callback module.

- gen_server の場合、返された状態は、コールバックモジュールの状態です。

- For a gen_statem process, State is the tuple {CurrentState,CurrentData}.

- gen_statem の場合、 `{CurrentState,CurrentData}` のタプルです.

- For a gen_event process, State is a list of tuples, where each tuple corresponds to an event handler registered in the process and contains {Module, Id, HandlerState}, as follows:

- gen_event の場合、状態は、タプルのリストです。各タプルは、プロセスに登録されたイベントハンドラに対応し、 `{Module, Id, HandlerState}` です。

- Module
  - The module name of the event handler.
  - イベントハンドラのモジュール名

- Id
  - The ID of the handler (which is false if it was registered without an ID).
  - ハンドラの ID(ID なしで登録された場合は false)

- HandlerState
  - The state of the handler.
  - ハンドラの状態

If the callback module exports a function system_get_state/1, it is called in the target process to get its state. Its argument is the same as the Misc value returned by get_status/1,2, and function Module:system_get_state/1 is expected to extract the state of the callback module from it. Function system_get_state/1 must return {ok, State}, where State is the state of the callback module.

コールバック・モジュールが関数 `system_get_state/1` をエクスポートする場合、状態を取得するためターゲットプロセスで呼び出されます。その引数は `get_status/1,2` によって返された Misc の値と同じであり、 `Module:system_get_state/1` は、そこからコールバックモジュールの状態を抽出することが期待されます。`system_get_state/1` は `{ok, State}` を返さなければなりません。ここで State はコールバックモジュールの状態です。

If the callback module does not export a system_get_state/1 function, get_state/1,2 assumes that the Misc value is the state of the callback module and returns it directly instead.

コールバックモジュールが `system_get_state/1` 関数をエクスポートしない場合、 `get_state/1,2` は、 Misc 値がコールバックモジュールの状態であるとみなし、代わりに直接戻します。

If the callback module's system_get_state/1 function crashes or throws an exception, the caller exits with error {callback_failed, {Module, system_get_state}, {Class, Reason}}, where Module is the name of the callback module and Class and Reason indicate details of the exception.

コールバックモジュールの場合 `system_get_state/1` がクラッシュまたは例外をあげる場合、 caller は `{callback_failed, {Module, system_get_state}, {Class, Reason}}` で終了する。 (Module は callback module の名前)

Function system_get_state/1 is primarily useful for user-defined behaviors and modules that implement OTP special processes. The gen_server, gen_statem, and gen_event OTP behavior modules export this function, so callback modules for those behaviors need not to supply their own.

関数 `system_get_state/1` は、ユーザ定義の behavior や、 OTP special process を実装するモジュールで有効です。 gen_server, gen_statem, gen_event など OTP の behavior モジュールはこれを提供するので、そのためのコールバックモジュールは自分で実装する必要はない。

For more information about a process, including its state, see get_status/1 and get_status/2.

プロセスの情報(状態を含む)の詳細については、 `get_status/1` と `get_status/2` を参照してください。


```
get_status(Name) -> Status
get_status(Name, Timeout) -> Status
```

Gets the status of the process.

プロセスのステータスを取得します。

The value of Misc varies for different types of processes, for example:

Misc の値はプロセスのタイプによって異なります。たとえば、次のようになります。

- A gen_server process returns the state of the callback module.
- gen_server の プロセスは、コールバックモジュールの状態を返します。

- A gen_statem process returns information, such as its current state name and state data.
- gen_statem の プロセスは、現在の状態名と状態データなどの情報を返します。

- A gen_event process returns information about each of its registered handlers.
- gen_event の プロセスは、その登録されたハンドラの各々に関する情報を返します。

Callback modules for gen_server, gen_statem, and gen_event can also change the value of Misc by exporting a function format_status/2, which contributes module-specific information. For details, see gen_server:format_status/2, gen_statem:format_status/2, and gen_event:format_status/2.

gen_server, gen_statem, gen_event のコールバックモジュールは、 モジュール固有の情報を提供する関数 `format_status/2` をエクスポートすることによって、 Misc の値を変更することもできます。詳細については、 `gen_server:format_status/2`, `gen_statem:format_status/2`, および `gen_event:format_status/2` を参照してください。


```
install(Name, FuncSpec) -> ok
install(Name, FuncSpec, Timeout) -> ok
```

Enables installation of alternative debug functions. An example of such a function is a trigger, a function that waits for some special event and performs some action when the event is generated. For example, turning on low-level tracing.

代替のデバッグ機能のインストールを有効にします。このような関数の例としては、 special event を待ってイベントが生成されたときに何らかのアクションを実行するトリガーがあります。たとえば、低レベルのトレースをオンにします。

Func is called whenever a system event is generated. This function is to return done, or a new Func state. In the first case, the function is removed. It is also removed if the function fails.

Func は、システムイベントが生成されるたびに呼び出されます。この関数は、 done または新しい Func state を返します。最初のケースでは、関数は削除されます。関数が失敗した場合にも削除されます。


```
log(Name, Flag) -> ok | {ok, [system_event()]}
log(Name, Flag, Timeout) -> ok | {ok, [system_event()]}
```

Turns the logging of system events on or off. If on, a maximum of N events are kept in the debug structure (default is 10).

システムイベントのロギングをオンまたはオフにします。オンの場合、デバッグ構造に最大 N 個のイベントが保持されます(デフォルトは 10)。

If Flag is get, a list of all logged events is returned.

Flag が get の場合、すべてのイベントの log のリストが返されます。

If Flag is print, the logged events are printed to standard_io.

Flag が print の場合、 log は standard_io に出力されます。

The events are formatted with a function that is defined by the process that generated the event (with a call to handle_debug/4).

イベントは、イベントを生成したプロセスによって定義された関数でフォーマットされます(`handle_debug/4` を呼び出して)。


```
log_to_file(Name, Flag) -> ok | {error, open_file}
log_to_file(Name, Flag, Timeout) -> ok | {error, open_file}
```

Enables or disables the logging of all system events in text format to the file. The events are formatted with a function that is defined by the process that generated the event (with a call to handle_debug/4). The file is opened with encoding UTF-8.

テキスト形式のすべてのシステムイベントのファイルへの記録を有効または無効にします。イベントは、イベントを生成したプロセスによって定義された関数でフォーマットされます(`handle_debug/4` を呼び出して )。このファイルは UTF-8 エンコードで開きます。


```
no_debug(Name) -> ok
no_debug(Name, Timeout) -> ok
```

Turns off all debugging for the process. This includes functions that are installed explicitly with function install/2,3, for example, triggers.

プロセスのすべてのデバッグを無効にします。これには、関数 `install/2,3` で明示的にインストールされた関数(トリガーなど)が含まれます。


```
remove(Name, Func) -> ok
remove(Name, Func, Timeout) -> ok
```

Removes an installed debug function from the process. Func must be the same as previously installed.

インストールされているデバッグ機能をプロセスから削除します。 Func は、以前にインストールされたものと同じでなければなりません。


```
replace_state(Name, StateFun) -> NewState
replace_state(Name, StateFun, Timeout) -> NewState
```

Replaces the state of the process, and returns the new state.

プロセスの状態を置き換え、新しい状態を返します。

These functions are intended only to help with debugging, and are not to be called from normal code. They are provided for convenience, allowing developers to avoid having to create their own custom state replacement functions.

これらの関数はデバッグに役立つだけのもので、通常のコードからは呼び出されません。これらは便宜のために提供されているため、開発者は独自の状態置換機能を作成する必要がありません。

Function StateFun provides a new state for the process. Argument State and the NewState return value of StateFun vary for different types of processes as follows:

StateFun は、プロセスの新しい状態を提供します。 StateFun の Argument State および NewState 戻り値は、次のようにプロセスのタイプによって異なります。

- For a gen_server process, State is the state of the callback module and NewState is a new instance of that state.
- gen_server の場合、状態は、コールバックモジュールの状態であり、 NewState には、その状態の新しいインスタンスです。

- For a gen_statem process, State is the tuple {CurrentState,CurrentData}, and NewState is a similar tuple, which can contain a new current state, new state data, or both.
- gen_statem の場合、状態はタプル `{CurrentState,CurrentData}` 、および NewState には、新しい現在の状態は、新しい状態データ、またはその両方を含むことができる同様のタプルです。

- For a gen_event process, State is the tuple {Module, Id, HandlerState} as follows:
- gen_event の場合、状態はタプル `{Module, Id, HandlerState}` 次のように

- Module
  - The module name of the event handler.
  - イベントハンドラのモジュール名。

- Id
  - The ID of the handler (which is false if it was registered without an ID).
  - ハンドラの ID(ID なしで登録された場合は false)。

- HandlerState
  - The state of the handler.
  - ハンドラの状態。

NewState is a similar tuple where Module and Id are to have the same values as in State, but the value of HandlerState can be different. Returning a NewState, whose Module or Id values differ from those of State, leaves the state of the event handler unchanged. For a gen_event process, StateFun is called once for each event handler registered in the gen_event process.

NewState は、 Module と Id が State と同じ値を持つ類似のタプルですが、 HandlerState の値は異なる場合があります。戻る NewState にその、 モジュールまたは同上の値と異なる 状態を、イベントハンドラの状態は変更されません。 gen_event プロセス、 StateFun はに登録された各イベントハンドラに 1 回呼び出され gen_event のプロセス。

If a StateFun function decides not to effect any change in process state, then regardless of process type, it can return its State argument.

StateFun 関数がプロセス状態の変更を行わないことを決定した場合、プロセスのタイプにかかわらず、 State 引数を返すことができます。

If a StateFun function crashes or throws an exception, the original state of the process is unchanged for gen_server, and gen_statem processes. For gen_event processes, a crashing or failing StateFun function means that only the state of the particular event handler it was working on when it failed or crashed is unchanged; it can still succeed in changing the states of other event handlers registered in the same gen_event process.

場合 StateFun の機能がクラッシュまたは例外をスローし、プロセスの元の状態は変化しないため gen_server 、及び gen_statem プロセス。 gen_event プロセス、クラッシュまたは失敗 StateFun の機能は、それが失敗したか、クラッシュしたときに取り組んでいた特定のイベントハンドラの状態のみが変更されていないことを意味します。同じ gen_event プロセスに登録されている他のイベントハンドラの状態を変更することはできます。

If the callback module exports a system_replace_state/2 function, it is called in the target process to replace its state using StateFun. Its two arguments are StateFun and Misc, where Misc is the same as the Misc value returned by get_status/1,2. A system_replace_state/2 function is expected to return {ok, NewState, NewMisc}, where NewState is the new state of the callback module, obtained by calling StateFun, and NewMisc is a possibly new value used to replace the original Misc (required as Misc often contains the state of the callback module within it).

コールバックモジュールが `system_replace_state/2` 関数をエクスポートすると、それはターゲットプロセスで呼び出され、 StateFun を使用して状態を置き換えます。その 2 つの引数は StateFun と Misc です。ここで Misc は `get_status/1,2` によって返される Misc 値と同じです。 `system_replace_state/2` 関数は返すことが期待され `{ok, NewState, NewMisc}` NewState には呼び出すことによって取得コールバックモジュールの新しい状態である StateFun を、そして NewMisc を元の Misc (Misc はしばしばその中のコールバックモジュールの状態を含んでいる必要があります)を置き換えるために使用される可能性のある新しい値です。

If the callback module does not export a system_replace_state/2 function, replace_state/2,3 assumes that Misc is the state of the callback module, passes it to StateFun and uses the return value as both the new state and as the new value of Misc.

コールバックモジュールが `system_replace_state/2` 関数をエクスポートしない場合 、 `replace_state/2,3` は Misc がコールバックモジュールの状態であるとみなし、 StateFun に渡し、戻り値を新しい状態と Misc の新しい値の両方として使用します。

If the callback module's function system_replace_state/2 crashes or throws an exception, the caller exits with error {callback_failed, {Module, system_replace_state}, {Class, Reason}}, where Module is the name of the callback module and Class and Reason indicate details of the exception. If the callback module does not provide a system_replace_state/2 function and StateFun crashes or throws an exception, the caller exits with error {callback_failed, StateFun, {Class, Reason}}.

コールバックモジュールの機能場合 `system_replace_state/2` クラッシュまたは例外をスロー、発呼者はエラーで終了 `{callback_failed, {Module, system_replace_state}, {Class, Reason}}`、モジュールは、コールバックモジュールの名前であり、クラス及び理由は詳細を示します例外の コールバックモジュールが `system_replace_state/2` 関数を提供せず 、 StateFun がクラッシュしたり例外をスローすると、呼び出し元はエラー `{callback_failed, StateFun, {Class, Reason}}` で終了します 。

Function system_replace_state/2 is primarily useful for user-defined behaviors and modules that implement OTP special processes. The OTP behavior modules gen_server, gen_statem, and gen_event export this function, so callback modules for those behaviors need not to supply their own.

関数 `system_replace_state/2` は、主に OTP special process を実装するユーザ定義のビヘイビアとモジュールに役立ちます。 OTP ビヘイビアモジュール gen_server, gen_statem, および gen_event は この関数をエキスポートするので、それらのビヘイビアのコールバックモジュールは独自のものを提供する必要はありません。


```
resume(Name) -> ok
resume(Name, Timeout) -> ok
```

Resumes a suspended process.


```
statistics(Name, Flag) -> ok | {ok, Statistics}
statistics(Name, Flag, Timeout) -> ok | {ok, Statistics}
```

Enables or disables the collection of statistics. If Flag is get, the statistical collection is returned.


```
suspend(Name) -> ok
suspend(Name, Timeout) -> ok
```

Suspends the process. When the process is suspended, it only responds to other system messages, but not other messages.


```
terminate(Name, Reason) -> ok
terminate(Name, Reason, Timeout) -> ok
```

Orders the process to terminate with the specified Reason. The termination is done asynchronously, so it is not guaranteed that the process is terminated when the function returns.


```
trace(Name, Flag) -> ok
trace(Name, Flag, Timeout) -> ok
```

Prints all system events on standard_io. The events are formatted with a function that is defined by the process that generated the event (with a call to handle_debug/4).


## Process Implementation Functions

The following functions are used when implementing a special process. This is an ordinary process, which does not use a standard behavior, but a process that understands the standard system messages.

以下の関数は、 special process を実装するときに使用されます。これは標準 behaviour を用いないが、システムメッセージに対応するための、標準的なプロセスです。


### Exports


```
debug_options(Options) -> [dbg_opt()]
```

Can be used by a process that initiates a debug structure from a list of options. The values of argument Opt are the same as for the corresponding functions.

オプションのリストからデバッグ構造を生成します。引数 Opt の値は、対応する関数の値と同じです。


```
get_debug(Item, Debug, Default) -> term()
```

Gets the data associated with a debug option. Default is returned if Item is not found. Can be used by the process to retrieve debug data for printing before it terminates.

デバッグオプションに関連付けられたデータを取得します。 Item が見つからない場合デフォルト値が返されます。プロセスが終了する前にデバッグデータを表示するためにプロセスで使用できます。


```
handle_debug(Debug, FormFunc, Extra, Event) -> [dbg_opt()]
```

This function is called by a process when it generates a system event. FormFunc is a formatting function, called as FormFunc(Device, Event, Extra) to print the events, which is necessary if tracing is activated. Extra is any extra information that the process needs in the format function, for example, the process name.

この関数は、システムイベントを生成するときにプロセスによって呼び出されます。 FormFunc は、イベントを出力するために `FormFunc(Device, Event, Extra)` と呼ばれるフォーマット関数です。トレースがアクティブな場合に必要です。 Extra は任意の追加情報 (ex プロセス名) です。


```
handle_system_msg(Msg, From, Parent, Module, Debug, Misc) -> no_return()
```

This function is used by a process module to take care of system messages. The process receives a {system, From, Msg} message and passes Msg and From to this function.

この関数は、システムメッセージを処理するためにプロセスモジュールによって使用されます。プロセスは `{system, From, Msg}` メッセージを受け取り、 Msg と From をこの関数に渡します。

This function never returns. It calls either of the following functions:

この関数は決して戻りません。次のいずれかの関数を呼び出します。

- `Module:system_continue(Parent, NDebug, Misc)`, where the process continues the execution. プロセスが実行を継続します
- `Module:system_terminate(Reason, Parent, Debug, Misc)`, if the process is to terminate. プロセスが終了する場合

Module must export the following:

モジュールは以下をエクスポートする必要があります:


```
system_continue/3
system_terminate/4
system_code_change/4
system_get_state/1
system_replace_state/2
```

Argument Misc can be used to save internal data in a process, for example, its state. It is sent to Module:system_continue/3 or Module:system_terminate/4.

引数 Misc は、プロセスの内部データ(例えば、その状態)を保存するために使用できます。 `Module:system_continue/3` or `Module:system_terminate/4` に送信されます。


```
print_log(Debug) -> ok
```

Prints the logged system events in the debug structure, using FormFunc as defined when the event was generated by a call to handle_debug/4.

`handle_debug/4` の呼び出しによってイベントが生成されたときに定義された FormFunc を使用して、記録されたシステムイベントをデバッグ構造体に出力し ます。


```
Module:system_code_change(Misc, Module, OldVsn, Extra) -> {ok, NMisc}
```

Called from handle_system_msg/6 when the process is to perform a code change. The code change is used when the internal data structure has changed. This function converts argument Misc to the new data structure. OldVsn is attribute vsn of the old version of the Module. If no such attribute is defined, the atom undefined is sent.

プロセスがコード変更を実行するときに `handle_system_msg/6` から呼び出されます。コードの変更は、内部データ構造が変更されたときに使用されます。この関数は、引数 Misc を新しいデータ構造に変換します。 OldVsn は古いバージョンのモジュールの属性 vsn です。そのような属性が定義されていない場合、未定義の atom が送信されます。


```
Module:system_continue(Parent, Debug, Misc) -> none()
```

Called from handle_system_msg/6 when the process is to continue its execution (for example, after it has been suspended). This function never returns.

プロセスが実行を継続するとき(たとえば、中断された後など)に `handle_system_msg/6` から呼び出されます。この関数は決して戻りません。


```
Module:system_get_state(Misc) -> {ok, State}
```

Called from handle_system_msg/6 when the process is to return a term that reflects its current state. State is the value returned by get_state/2.

プロセスが現在の状態を反映する用語を返すことになっているときに `handle_system_msg/6` から呼び出されます。 State は `get_state/2` が返す値 です。


```
Module:system_replace_state(StateFun, Misc) -> {ok, NState, NMisc}
```

Called from handle_system_msg/6 when the process is to replace its current state. NState is the value returned by replace_state/3.

プロセスが現在の状態を置き換えるときに `handle_system_msg/6` から呼び出されます。 NState は、 `replace_state/3` によって返される値 です。


```
Module:system_terminate(Reason, Parent, Debug, Misc) -> none()
```

Called from handle_system_msg/6 when the process is to terminate. For example, this function is called when the process is suspended and its parent orders shutdown. It gives the process a chance to do a cleanup. This function never returns.

プロセスが終了するときに `handle_system_msg/6` から呼び出されます。たとえば、この関数は、プロセスが中断され親プロセスが停止したときに呼び出されます。これは、プロセスにクリーンアップを実行する機会を与えます。この関数は決して戻りません。
