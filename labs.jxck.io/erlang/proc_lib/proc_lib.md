# proc_lib

## Module

proc_lib


## Module Summary

Functions for asynchronous and synchronous start of processes adhering to the OTP design principles.

OTP 設計原則に準拠したプロセスの非同期および同期起動のための関数


## Description

This module is used to start processes adhering to the OTP Design Principles. Specifically, the functions in this module are used by the OTP standard behaviors (for example, gen_server and gen_statem) when starting new processes. The functions can also be used to start special processes, user-defined processes that comply to the OTP design principles. For an example, see section sys and proc_lib in OTP Design Principles.

このモジュールは、 OTP 設計原則に準拠したプロセスを開始するために使用されます。特に、このモジュールの関数は、新しいプロセスを開始するときに OTP 標準動作(gen_server や gen_statem など)によって使用されます。この機能は、 OTP の設計原則に準拠した特別なプロセス、ユーザー定義のプロセスを開始するためにも使用できます。例については、 "OTP 設計原則" の sys と proc_lib の節を参照してください。

Some useful information is initialized when a process starts. The registered names, or the process identifiers, of the parent process, and the parent ancestors, are stored together with information about the function initially called in the process.

いくつかの有益な情報は、プロセスの開始時に初期化されます。親プロセスおよび親祖先の登録された名前またはプロセス識別子は、そのプロセスで最初に呼び出された関数に関する情報とともに格納されます。

While in "plain Erlang", a process is said to terminate normally only for exit reason normal, a process started using proc_lib is also said to terminate normally if it exits with reason shutdown or {shutdown,Term}. shutdown is the reason used when an application (supervision tree) is stopped.

"Plain Erlang" において、プロセスは exit reason normal のみ正常に終了すると言われているが、 proc_lib で起動されたプロセスも、 `shutdown` または `{shutdown,Term}` で正常に終了します。 shutdown は、アプリケーション(監視ツリー)が停止したときに使用される reason です。

When a process that is started using proc_lib terminates abnormally (that is, with another exit reason than normal, shutdown, or {shutdown,Term}), a crash report is generated, which is written to terminal by the default SASL event handler. That is, the crash report is normally only visible if the SASL application is started; see sasl(6) and section SASL Error Logging in the SASL User's Guide.

proc_lib を使用して起動されたプロセスが異常終了すると(つまり、 normal 、 shutdown 、{shutdown 、 Term}以外の終了理由がある)、クラッシュレポート が生成され、デフォルトの SASL イベントハンドラによって端末に書き込まれます。つまり、通常、クラッシュレポートは SASL アプリケーションが起動されている場合にのみ表示されます。「SASL ユーザーズガイド」の sasl(6)と「SASL エラーログ」を参照してください。

When a process that is started using proc_lib terminates abnormally (that is, with another exit reason than normal, shutdown, or {shutdown,Term}),

proc_lib を用いてスタートしたプロセスが、異常終了する場合 (normal, shutdown, {shutdown, Term} 以外で終了した場合),

クラッシュレポートが生成され、ターミナルにデフォルト SASL ハンドラを使って書き出されます。

That is, the crash report is normally only visible if the SASL application is started; see sasl(6) and section SASL Error Logging in the SASL User's Guide.

つまり、クラッシュレポートは、 SASL アプリケーションがスタートしている場合のみ正常に表示されます。 sasl(6) と SASL Error Logging を確認してください。

Unlike in "plain Erlang", proc_lib processes will not generate error reports, which are written to the terminal by the emulator and do not require SASL to be started. All exceptions are converted to exits which are ignored by the default error_logger handler.

"plain Erlang" とは異なり、 proc_lib プロセスは、エミュレータによって端末に書き込まれ SASL の起動を必要としないエラーレポートは、生成しません。すべての例外は、デフォルトの error_logger ハンドラによって無視される終了(exits)に変換されます。

The crash report contains the previously stored information, such as ancestors and initial function, the termination reason, and information about other processes that terminate as a result of this process terminating.

クラッシュレポートには、祖先、初期関数、終了理由、このプロセスが終了した結果として終了する他のプロセスに関する情報など、以前に格納された情報が含まれています。


## Data Types


```
spawn_option() = link |
                 monitor |
                 {priority, priority_level()} |
                 {max_heap_size, max_heap_size()} |
                 {min_heap_size, integer() >= 0} |
                 {min_bin_vheap_size, integer() >= 0} |
                 {fullsweep_after, integer() >= 0} |
                 {message_queue_data, off_heap | on_heap | mixed}
```

See `erlang:spawn_opt/2,3,4,5`.


## Exports


```
format(CrashReport) -> string()
```

Equivalent to format(CrashReport, latin1).


```
format(CrashReport, Encoding) -> string()
```

This function can be used by a user-defined event handler to format a crash report. The crash report is sent using error_logger:error_report(crash_report,CrashReport). That is, the event to be handled is of the format {error_report, GL, {Pid, crash_report, CrashReport}}, where GL is the group leader pid of process Pid that sent the crash report.

この関数は、ユーザ定義のイベントハンドラがクラッシュレポートをフォーマットするために使用できます。クラッシュレポートは、 `error_logger:error_report(crash_report,CrashReport)` を使用して送信され ます。すなわち、処理されるイベントの形式のものである `{error_report, GL, {Pid, crash_report, CrashReport}}` ここで、 GL は、プロセスのグループリーダ PID で は Pid クラッシュレポートを送信しました。


```
format(CrashReport, Encoding, Depth) -> string()
```

This function can be used by a user-defined event handler to format a crash report. When Depth is specified as a positive integer, it is used in the format string to limit the output as follows: io_lib:format("~P", [Term,Depth]).

この関数は、ユーザ定義のイベントハンドラがクラッシュレポートをフォーマットするために使用できます。 Depth を正の整数で指定すると、フォーマット文字列で次のように出力を制限するために使用されます。`io_lib:format("~P", [Term,Depth])`。


```
hibernate(Module, Function, Args) -> no_return()
```

This function does the same as (and does call) the hibernate/3 BIF, but ensures that exception handling and logging continues to work as expected when the process wakes up.

Always use this function instead of the BIF for processes started using proc_lib functions.

この関数は、 `hibernate/3` BIF と同じ動作をします が、プロセスが起動するときに例外処理とロギングが期待どおりに機能するようにします。

proc_lib 関数を使用して開始されたプロセスには、常に BIF ではなくこの関数を使用してください。


```
init_ack(Ret) -> ok
init_ack(Parent, Ret) -> ok
```

This function must be used by a process that has been started by a start[_link]/3,4,5 function. It tells Parent that the process has initialized itself, has started, or has failed to initialize itself.

この関数は、 `start[_link]/3,4,5` 関数によって開始されたプロセスによって使用されなければなりません。プロセスが自身を初期化したか、開始したか、または初期化に失敗したことを Parent に通知します。

Function init_ack/1 uses the parent value previously stored by the start function used.

関数 `init_ack/1` は、使用された開始関数によって以前に格納された親値を使用します。

If this function is not called, the start function returns an error tuple (if a link and/or a time-out is used) or hang otherwise.

この関数が呼び出されない場合、 start 関数はエラータプル(リンクやタイムアウトが使用されている場合)を返します。そうでない場合はハングします。

The following example illustrates how this function and proc_lib:start_link/3 are used:

次の例は、この関数と `proc_lib:start_link/3` の使い方を示しています 。


```erlang
-module(my_proc).
-export([start_link/0]).
-export([init/1]).

start_link() ->
    proc_lib:start_link(my_proc, init, [self()]).

init(Parent) ->
    case do_initialization() of
        ok ->
            proc_lib:init_ack(Parent, {ok, self()});
        {error, Reason} ->
            exit(Reason)
    end,
    loop().
```


```
initial_call(Process) -> {Module, Function, Args} | false
```

Extracts the initial call of a process that was started using one of the spawn or start functions in this module. Process can either be a pid, an integer tuple (from which a pid can be created), or the process information of a process Pid fetched through an erlang:process_info(Pid) function call.

このモジュールの spawn 関数または start 関数のいずれかを使用して開始されたプロセスの最初の呼び出しを抽出します。 プロセスは、 pid 、整数タプル(pid を作成することができる)、または `erlang:process_info(Pid)` 関数呼び出しによってフェッチされ たプロセス Pid のプロセス情報のいずれかです。

The list Args no longer contains the arguments, but the same number of atoms as the number of arguments; the first atom is 'Argument__1', the second 'Argument__2', and so on. The reason is that the argument list could waste a significant amount of memory, and if the argument list contained funs, it could be impossible to upgrade the code for the module.

リスト Args には引数はなく、引数の数と同じ数のアトムが含まれています。最初のアトムは `'Argument__1'`、 2 番目の `'Argument__2'`などです。その理由は、引数リストがかなりの量のメモリを浪費し、引数リストに fun が含まれていると、モジュールのコードをアップグレードすることができない可能性があるからです。

If the process was spawned using a fun, initial_call/1 no longer returns the fun, but the module, function for the local function implementing the fun, and the arity, for example, {some_module,-work/3-fun-0-,0} (meaning that the fun was created in function some_module:work/3). The reason is that keeping the fun would prevent code upgrade for the module, and that a significant amount of memory could be wasted.

プロセスが fun を使って生成された場合、`initial_call/1` は fun を返さなくなりましたが、モジュール、 fun を実装するローカル関数の関数、および `{some_module,-work/3-fun-0-,0}` (fun は関数 `some_module:work/3` で作成されたことを意味します)。その理由は、楽しいままにすると、モジュールのコードのアップグレードが妨げられ、大量のメモリが無駄になるからです。


```
spawn(Fun) -> pid()
spawn(Node, Fun) -> pid()
spawn(Module, Function, Args) -> pid()
spawn(Node, Module, Function, Args) -> pid()
```

Spawns a new process and initializes it as described in the beginning of this manual page. The process is spawned using the spawn BIFs.

このマニュアルページの冒頭で説明したように、新しいプロセスを生成して初期化します。プロセスはスポーン BIF を使用して 生成されます。


```
spawn_link(Fun) -> pid()
spawn_link(Node, Fun) -> pid()
spawn_link(Module, Function, Args) -> pid()
spawn_link(Node, Module, Function, Args) -> pid()
```

Spawns a new process and initializes it as described in the beginning of this manual page. The process is spawned using the spawn_link BIFs.

このマニュアルページの冒頭で説明したように、新しいプロセスを生成して初期化します。プロセスは spawn_link BIF を使用して生成され ます。


```
spawn_opt(Fun, SpawnOpts) -> pid()
spawn_opt(Node, Function, SpawnOpts) -> pid()
spawn_opt(Module, Function, Args, SpawnOpts) -> pid()
spawn_opt(Node, Module, Function, Args, SpawnOpts) -> pid()
```

Spawns a new process and initializes it as described in the beginning of this manual page. The process is spawned using the spawn_opt BIFs.

このマニュアルページの冒頭で説明したように、新しいプロセスを生成して初期化します。プロセスは spawn_opt BIF を使用して生成され ます。

Using spawn option monitor is not allowed. It causes the function to fail with reason badarg.

スポーンオプションモニタを使用することはできません。それは理由 badarg で機能を失敗させ ます。


```
start(Module, Function, Args) -> Ret
start(Module, Function, Args, Time) -> Ret
start(Module, Function, Args, Time, SpawnOpts) -> Ret
start_link(Module, Function, Args) -> Ret
start_link(Module, Function, Args, Time) -> Ret
start_link(Module, Function, Args, Time, SpawnOpts) -> Ret
```

Starts a new process synchronously. Spawns the process and waits for it to start. When the process has started, it must call init_ack(Parent, Ret) or init_ack(Ret), where Parent is the process that evaluates this function. At this time, Ret is returned.

新しいプロセスを同期して開始します。プロセスを開始し、開始するのを待ちます。プロセスが開始されたとき、それが なければなりません呼び出す `init_ack(Parent, Ret)` または `init_ack(Ret)`、親はこの機能を評価するプロセスです。この時点で Ret が返されます。

If function start_link/3,4,5 is used and the process crashes before it has called init_ack/1,2, {error, Reason} is returned if the calling process traps exits.

関数場合 `start_link/3,4,5` は、それが呼び出される前に使用され、プロセスがクラッシュしている `init_ack/1,2`, `{error, Reason}` 呼び出しプロセストラップ終了場合に返されます。

If Time is specified as an integer, this function waits for Time milliseconds for the new process to call init_ack, or {error, timeout} is returned, and the process is killed.

場合時間を整数として指定され、この関数は待つ時間新しいプロセスがコールするためミリ秒 init_ack 、または `{error, timeout}` 戻され、プロセスが殺されます。

Argument SpawnOpts, if specified, is passed as the last argument to the spawn_opt/2,3,4,5 BIF.

引数 SpawnOpts(指定されている場合)は、最後の引数として`spawn_opt/2,3,4,5` BIF に渡されます。

Using spawn option monitor is not allowed. It causes the function to fail with reason badarg.

スポーンオプションモニタを使用することはできません。それは理由 badarg で機能を失敗させ ます。


```
stop(Process) -> ok
```

Equivalent to `stop(Process, normal, infinity)`.

`stop(Process, normal, infinity)` と等価です。


```
stop(Process, Reason, Timeout) -> ok
```

Orders the process to exit with the specified Reason and waits for it to terminate.

指定された理由でプロセスを終了し、終了するのを待ちます。

Returns ok if the process exits with the specified Reason within Timeout milliseconds.

返し OK プロセスが指定されて終了した場合の理由の中のタイムアウト(ミリ秒)。

If the call times out, a timeout exception is raised.

呼び出しがタイムアウトすると、タイムアウト例外が発生します。

If the process does not exist, a noproc exception is raised.

プロセスが存在しない場合、 noproc 例外が発生します。

The implementation of this function is based on the terminate system message, and requires that the process handles system messages correctly. For information about system messages, see `sys(3)` and section sys and proc_lib in OTP Design Principles.

この関数の実装は、システム終了メッセージに基づいており 、プロセスがシステムメッセージを正しく処理することが必要です。システムメッセージについては、「OTP 設計原則」の sys(3)および sys および proc_lib を参照してください 。


```
translate_initial_call(Process) -> {Module, Function, Arity}
```

This function is used by functions c:i/0 and c:regs/0 to present process information.

この関数は、関数 `c:i/0` と `c:regs/0` によってプロセス情報を表示するために使用されます 。

This function extracts the initial call of a process that was started using one of the spawn or start functions in this module, and translates it to more useful information. Process can either be a pid, an integer tuple (from which a pid can be created), or the process information of a process Pid fetched through an erlang:process_info(Pid) function call.

この関数は、このモジュールの spawn 関数または start 関数の 1 つを使用して開始されたプロセスの最初の呼び出しを抽出し、より有用な情報に変換します。 プロセス は、 pid 、整数タプル(pid を作成することができる)、または `erlang:process_info(Pid)` 関数呼び出しによってフェッチされたプロセス Pid のプロセス情報のいずれかです。

If the initial call is to one of the system-defined behaviors such as gen_server or gen_event, it is translated to more useful information. If a gen_server is spawned, the returned Module is the name of the callback module and Function is init (the function that initiates the new server).

最初の呼び出しが gen_server や gen_event などのシステム定義のビヘイビアの 1 つになっている場合は、より有用な情報に変換されます。場合 gen_server が 起動され、返されたモジュールは、コールバックモジュールの名前である機能があるの init (新しいサーバを起動する機能)。

A supervisor and a supervisor_bridge are also gen_server processes. To return information that this process is a supervisor and the name of the callback module, Module is supervisor and Function is the name of the supervisor callback module. Arity is 1, as the init/1 function is called initially in the callback module.

スーパーバイザーと supervisor_bridge はまたある gen_server プロセス。このプロセスがスーパーバイザであるという情報とコールバックモジュールの名前を返すために、 Module はスーパーバイザであり、 Function はスーパーバイザコールバックモジュールの名前です。 初期状態でコールバックモジュールで `init/1` 関数が呼び出されるため、 Arity は 1 です。

By default, `{proc_lib,init_p,5}` is returned if no information about the initial call can be found. It is assumed that the caller knows that the process has been spawned with the proc_lib module.

最初の呼び出しに関する情報が見つからない場合、デフォルトで `{proc_lib,init_p,5}` が返されます。プロセスが proc_lib モジュールで生成されたことを呼び出し側が知っていると仮定します。
