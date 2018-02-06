# OTP Design Principle

## special process

OTP の design principles に準拠したプロセスを書く一番簡単な方法は、標準 behavior を実装することだ。

しかし、 gen_server/gen_statem/gen_event の設計となじまない要件もある。(init でブロックしたい場合 etc)

標準 behavior を使わず独自にプロセスを実装する場合は、それを Special Process として実装する。

Special Proces は、 OTP の design principles に準拠しているため、 OTP の持つエコシステム(debugging etc)の恩恵を受けられる。

Special Process は STDLIB にある sys/proc_lib を用い、いくつかのルールに乗っ取り実装する。

この手法は、独自の behaviour を提供する場合にも応用できる。


## Acceptor Process

例として、 gen_tcp を用いたサーバで、クライアントからの接続を Accept し、専用のワーカを起動する処理を考えてみる。

Accept は Listener Socket を `gen_tcp:accept()` でブロックするループとなる。

(prim_inet もあるが、 un-documented な API なため、ここでは扱わない)

Accept に成功したら、 Worker を Spown し、ソケットの制御を移譲したら再起する。

つまり以下のような処理となる。

```erlang
% gen_tcp:listen() した Listening Socket を受け取る
accept_loop(Listen) ->
    % Accept でブロック
    {ok, Socket} = gen_tcp:accept(Listen),

    % Accept した Socket 専用のワーカを起動
    PID = socket_worker_sup:start_child(Socket),

    % Socket の制御を移譲
    gen_tcp:controlling_process(Socket, PID),

    % ループ
    accept_loop(Listen).
```

このプロセス自体は単純なループで構成され、メッセージングではなく同期 API を呼んでいるため、 gen_server などとは相性が悪い。


```erlang
-behavior(gen_server).

init(Listen) ->
  accept_loop(Listen).
  % 本来は {ok, State} を返す必要が有る


accept_loop(Listen) ->
    % ...
    % ループ
    accept_loop(Listen).
```

gen_server の場合は init の中で再起することになるが、これでは init を終わらせることができない。

これは gen_server の実装として不適切だ。

無理やり timeout させるというハックも有るが、 gen_server でありながら特にイベントを受けるわけでもないのであまり意味がない。

Accept のように、 Pull 型のインタフェースの場合は、 gen_server は相性が悪い。

単純なループを管理する gen_loop 的なものがありそうでないため、自分で Special Proces にすることになる。




## Special Process

Special Proces とは、以下のような条件を満たす

- supervisor の監視対象として適した形で実行される
- sys デバッグ機能をサポートする
- システムメッセージ(suspend/resume etc)を処理する


これを満たすためには、 proc_lib を用いて起動し、いくつかのコールバックを実装すれば良い。

前述の Accepter をこれに対応する。


## proc_lib:init_ack

まず、起動時にコールバックとして呼ばれる init について考える。

init は、 start_link などで spawn される際に呼び出される関数だが、ここでループするため値を返せない。

そこで、親側はこのプロセスを `proc_lib:start_link` で起動し、起動された子プロセスは `proc_lib:init_ack` で応答するという流れをとる。

ACK は init が正常に終了し、プロセスが開始されることを親に伝えるのが目的なので、初期化処理が終わりループに入る直前に返すのが妥当だろう。

親は、自分の PID を伝えておき、 ACK が帰るまでブロックする。



```erlang
% 親プロセス(supervisor など)が呼び出す API
start_link(Listen) ->
    % self() は親の PID であり ACK の変換先
    proc_lib:start_link(?MODULE, init, [self(), Listen]).


% 子プロセスの初期化処理
init(Parent, Listen) ->
    % 諸々必要な初期化処理を行う
    true = register(?MODULE, self()),

    % 初期化処理が終わったら非同期に ACK を親に返す
    proc_lib:init_ack(Parent, {ok, self()}),

    % loop に入る
    accept_loop(Listen).
```

初期化で失敗した場合は `exit()` すれば親にもそれが伝わる。


## System Message

標準 behaviour は system message のハンドリング実装が含まれている。

Special Process を実装する場合は、同等のコードを実装し、 system message をきちんとハンドリングする必要が有る。

plain system message は `{system, From, Msg}` として受信する。

このイベントは、直接処理を行うのではなく `sys:handle_system_msg/6` に処理を移譲する。

```erlang
loop(State, Parent) ->
    receive
        {system, From, Request} ->
            Debug = [],
            sys:handle_system_msg(Request, From, Parent, ?MODULE, Debug, State);
    end.
```

この関数は戻らないため、例えばここで sys 側がブロックすることで suspend ができる。

resume など、ループに戻る/継続する場合は `system_continue/3` が呼ばれるため、ここにループを再開する処理を書く。

terminate する場合は `system_terminate/4` が呼ばれるため、ここに終了処理を書く。


```erlang
system_continue(Parent, Debug, State) ->
    cleanup(State),
    loop(Parent, Debug, State).

system_terminate(Reason, _Parent, _Debug, _State) ->
    exit(Reason).
```


`trap_exit` している場合は、 shutdown message である `{'EXIT', Parent, Reason}` が supervisor から送られるため、これも対応する必要がある。

通常親と同じ Reason で、自身を terminate する。


```erlang
receive
  {'EXIT', Parent, Reason} ->
    cleanup(State),
    exit(Reason);
end
```


他にも `get_state`, `replace_state`, `code_change` に対応するコールバックも実装する。


```erlang
system_get_state(State) ->
    {ok, State}.

system_replace_state(StateFun, Misc) ->
    {ok, StateFun(Misc), Misc}.

system_code_change(State, _Module, _OldVsn, _Extra) ->
    {ok, State}.
```



## Debugging

sys は標準デバッグ機能を持っており、対象の Pid や registered name がわかれば、外から情報を取り出せる。

```erlang
sys:trace(Pid, true). % trace を有効にする

sys:statistics(Pid, true). % statistics を有効にする
% ...しばらく処理
sys:statistics(Pid, get).
% {ok, [{start_time,   {{2003,6,13},{9,47,5}}},
%       {current_time, {{2003,6,13},{9,47,56}}},
%       {reductions,   109},
%       {messages_in,  2},
%       {messages_out, 1}]}

sys:get_status(Pid).
{status,<0.30.0>,
        {module,ch4},
        [[{'$ancestors',[<0.25.0>]},{'$initial_call',{ch4,init,[<0.25.0>]}}],
         running,<0.25.0>,[],
         [ch1,ch2,ch3]]}
```





これに対応するためには `sys:debug_options/1` と `sys:handle_debug/3` を使います。



