

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

このプロセス自体は単純なループで構成でき、 gen_server などにしようとしてもうまくいかない。


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

むりやり timeout させるというハックも有るが、 gen_server でありながら特にイベントを受けるわけでもないのであまり意味がない。

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

まず起動だが、コールバックとして呼ばれる init について考える。

init は、 start_link などで spawn される際に呼び出される関数だが、ここでループをしたいため値を返せない。

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



## Debugging

sys は標準デバッグ機能を持っており、対象の Pid や registered name がわかれば、外から情報を取り出せる。

```erlang
sys:trace(Pid, true). % trace を有効にする



sys:statistics(Pid, true). % statistics を有効にする
% ...しばらく処理
sys:statistics(Pid, get).
% {ok,[{start_time,{{2003,6,13},{9,47,5}}},
%      {current_time,{{2003,6,13},{9,47,56}}},
%      {reductions,109},
%      {messages_in,2},
%      {messages_out,1}]}
```
