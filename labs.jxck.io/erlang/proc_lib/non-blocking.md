# NonBlockgin

## Intro

<https://erlangcentral.org/wiki/Building_a_Non-blocking_TCP_server_using_OTP_principles>

## Overview

A reader of this tutorial is assumed to be familiar with gen_server and gen_fsm behaviours, TCP socket communications using gen_tcp module, active and passive socket modes, and OTP supervision principles.

このチュートリアルの読者は、 gen_server および gen_fsm の動作、 gen_tcp モジュールを使用した TCP ソケット通信、アクティブおよびパッシブソケットモード、 OTP 監督の原則に精通していると想定しています。

OTP provides a convenient framework for building reliable applications. This is in part accomplished by abstracting common functionality into a set of reusable behaviours such as gen_server and gen_fsm that are linked to OTP's supervision hierarchy.

OTP は、信頼性の高いアプリケーションを構築するための便利なフレームワークを提供します。これは、一般的な機能を、 OTP の監督階層にリンクされている gen_server や gen_fsm などの再利用可能な一連の動作に抽象化することによって部分的に達成されます。

There are several known TCP server designs. The one we are going to cover involves one process listening for client connections and spawning an FSM process per connecting client. While there is support for TCP communications available in OTP through the gen_tcp module, there is no standard behavior for building non-blocking TCP servers using OTP standard guidelines. By non-blocking we imply that the listening process and the client-handling FSMs should not make any blocking calls and be readily responsive to incoming control messages (such as changes in system configuration, restart requests, etc.) without causing timeouts. Note that blocking in the context of Erlang means blocking an Erlang process rather than the emulator's OS process(es).

いくつかの既知の TCP サーバーの設計があります。ここでは、クライアント接続をリッスンし、接続クライアントごとに FSM プロセスを作成するプロセスを 1 つ取り上げます。 gen_tcp モジュールを介して OTP で利用できる TCP 通信をサポートしていますが、 OTP 標準ガイドラインを使用して非ブロッキング TCP サーバーを構築するための標準的な動作はありません。することにより、非ブロッキング我々はリスニング・プロセスとクライアント・ハンドリングの FSM は、任意のブロック呼び出しを行うとタイムアウトを引き起こすことなく(このようなシステム構成、再起動要求などの変更など)、着信制御メッセージに容易に対応してはならないことを示唆しています。ことに留意されたいブロッキングアーランの文脈では、エミュレータの OS プロセス(ES)のではなく、 Erlang のプロセスをブロックします。

In this tutorial we will show how to build a non-blocking TCP server using gen_server and gen_fsm behaviours that offers flow control and is fully compliant with OTP application design principles.

このチュートリアルでは、フロー制御を提供し、 OTP アプリケーション設計の原則に完全に準拠している gen_server および gen_fsm の動作を使用して、非ブロッキング TCP サーバーを構築する方法を示します。

A reader who is new to the OTP framework is encouraged to read Joe Armstrong's tutorial on how to build A Fault-tolerant Server using blocking gen_tcp:connect/3 and gen_tcp:accept/1 calls without involving OTP.

OTP フレームワークに慣れていない読者は、 OTP を使わずに gen_tcp:connect/3 と gen_tcp:accept/1 の呼び出しをブロックしてフォールト・トレラント・サーバを構築する方法に関する Joe Armstrong のチュートリアルを読むことをお勧めします。

This tutorial was inspired by several threads (e.g. one, two) on the Erlang Questions mailing list mentioning an approach to building non-blocking asynchronous TCP servers.

このチュートリアルでは、(例えば、複数のスレッドに触発された 1 、 2 、ノンブロッキングの非同期 TCP サーバを構築するためのアプローチを言及メーリングリスト Erlang の質問に)。


## Server Design

The design of our server will include the main application's supervisor tcp_server_app process with one_for_one restart strategy and two child specifications. The first one being a listening process implemented as a gen_server behaviour that will wait for asynchronous notifications of client socket connections. The second one is another supervisor tcp_client_sup responsible for starting client handling FSMs and logging abnormal disconnects via standard SASL error reports.

私たちのサーバーの設計には、 one_for_one 再起動戦略と 2 つの子仕様を持つメインアプリケーションのスーパーバイザ tcp_server_app プロセスが含まれます。最初は、クライアントソケット接続の非同期通知を待つ gen_server ビヘイビアとして実装されたリスニングプロセスです。もう 1 つは、クライアントが FSM を処理するのを開始し、標準の SASL エラーレポートを使用して異常切断を記録する、別のスーパーバイザ tcp_client_sup です。

For the sake of simplicity of this tutorial, the client handling FSM (tcp_echo_fsm) will implement an echo server that will echo client's requests back to the client.

このチュートリアルを簡単にするために、 FSM(tcp_echo_fsm)を処理するクライアントは、クライアントの要求をクライアントに返すエコーサーバーを実装します。


```

                    +----------------+
                    | tcp_server_app |
                    +--------+-------+
                             | (one_for_one)
            +----------------+---------+
            |                          |
    +-------+------+           +-------+--------+
    | tcp_listener |           + tcp_client_sup |
    +--------------+           +-------+--------+
                                       | (simple_one_for_one)
                                 +-----|---------+
                               +-------|--------+|
                              +--------+-------+|+
                              |  tcp_echo_fsm  |+
                              +----------------+
```


## Application and Supervisor behaviours

In order to build an OTP application we need to construct modules implementing an application and supervisor behaviour callback functions. While traditionally these functionalities are implemented in separate modules, given their succinctness we'll combine them in one module.

OTP アプリケーションを構築するには、アプリケーションとスーパーバイザの動作コールバック関数を実装するモジュールを構築する必要があります。伝統的にこれらの機能は別々のモジュールで実装されていますが、それらの簡潔さを考慮して、それらを 1 つのモジュールで組み合わせます。

The two instances of init/1 function are for two tiers of supervision hierarchy. Since two different restart strategies for each supervisor are needed, we implement them at different tiers.

init/1 関数の 2 つのインスタンスは、 2 階層の監視階層用です。スーパーバイザごとに 2 つの異なる再起動戦略が必要なため、異なる階層で実装します。

Upon application's startup the tcp_server_app:start/2 callback function calls supervisor:start_link/2 that creates main application's supervisor calling tcp_server_app:init([Port, Module]) callback. This supervisor creates a tcp_listener process and a child supervisor tcp_client_sup responsible for spawning client connections. The Module argument in the init function is the name of client-connection handling FSM (in this case tcp_echo_fsm).

アプリケーションの起動時に、 tcp_server_app:start/2 コールバック関数は、 tcp_server_app:init([Port 、 Module])コールバックを呼び出すメインアプリケーションのスーパーバイザを作成する supervisor:start_link/2 を呼び出します。このスーパバイザは、 tcp_listener プロセスと、 クライアント接続を生成する子スーパバイザ tcp_client_sup を作成します。 init 関数の Module 引数は、 クライアント接続処理 FSM(この場合は tcp_echo_fsm)の名前です。


## Listener Process

One of the shortcomings of the gen_tcp module is that it only exports interface to a blocking accept call. This leads most of developers working on an implementation of a TCP server build a custom process linked to a supervisor using proc_lib or come up with some other proprietary design.

gen_tcp モジュールの欠点の 1 つは、インターフェイスがブロッキング受け入れ呼び出しにのみエクスポートされることです。これは、 TCP サーバーの実装に取り組んでいる開発者のほとんどが、 proc_lib を使用してスーパーバイザにリンクされたカスタムプロセスを構築するか、他の独自の設計を思いつくことにつながります。

Examining prim_inet module reveals an interesting fact that the actual call to inet driver to accept a client socket is asynchronous. While this is a non-documented property, which means that the OTP team is free to change this implementation, we will exploit this functionality in the construction of our server.

prim_inet モジュールを調べると、クライアントソケットを受け入れる inet ドライバへの実際の呼び出しが非同期であるという興味深い事実が明らかになります。これは文書化されていないプロパティですが、 OTP チームがこの実装を自由に変更できることを意味します。この機能をサーバーの構築に活用します。

The listener process is implemented as a gen_server behaviour:

リスナプロセスは、 gen_server の動作として実装されています。


```
```

In this module init/1 call takes two parameters - the port number that the TCP listener should be started on and the name of a protocol handling module for client connections. The initialization function opens a listening socket in passive {active, false} mode. This is done so that we have flow control of the data received on the connected client sockets that will inherit this option from the listening socket.

このモジュールでは、 init/1 呼び出しには、 TCP リスナーを開始するポート番号とクライアント接続用のプロトコル処理モジュールの名前の 2 つのパラメータが必要です。初期化機能は受動的な `{active, false}` モードのリスニングソケットを開きます。これは、リスンソケットからこのオプションを継承する、接続されたクライアントソケットで受信したデータのフロー制御を行うために行われます。

The most interesting part of this code is the prim_inet:async_accept/2 call as well as the handling of asynchronous inet_async messages. In order to get this working we also needed to copy some of the internal OTP code encapsulated in the set_sockopt/2 function that handles socket registration with inet database and copying some options to the client socket.

このコードの最も興味深い部分は、 `prim_inet:async_accept/2` 呼び出しと、非同期 inet_async メッセージの処理です。これを実現するために、ソケットの登録を処理する `set_sockopt/2` 関数にカプセル化された内部 OTP コードを inet データベースでコピーし、いくつかのオプションをクライアントソケットにコピーする必要がありました。

As soon as a client socket is connected inet driver will notify the listening process using {inet_async, ListSock, Ref, {ok, CliSocket}} message. At this point we'll instantiate a new client socket handling process and set its ownership of the CliSocket.

クライアントソケットが inet ドライバに接続されるとすぐに{inet_async 、 ListSock 、 Ref 、{ok 、 CliSocket}}メッセージを使用してリスンプロセスに通知します。この時点で、新しいクライアントソケット処理プロセスをインスタンス化し、 CliSocket の所有権を設定します。


## Client Socket Handling Process

While tcp_listener is a generic implementation, tcp_echo_fsm is a mere stub FSM for illustrating how to write TCP servers. This modules needs to export two functions - one start_link/0 for a tcp_client_sup supervisor and another set_socket/2 for the listener process to notify the client connection handling FSM process that it is now the owner of the socket, and can begin receiving messages by setting the {active, once} or {active, true} option.

一方で tcp_listener は一般的な実装である、 tcp_echo_fsm は、 TCP サーバーを作成する方法を説明するための単なるスタブ FSM です。このモジュールは、 2 つの機能エクスポートする必要があります- 1 は START_LINK/0 をため tcp_client_sup の 監督及び他の set_socket/2 、それは今のソケットの所有者である FSM プロセスを扱うクライアント接続を通知するリスナー・プロセスのために、と設定することで、メッセージの受信を開始することができます `{active, once}` または `{active, true}` オプション。

We would like to highlight the synchronization pattern used between the listening process and client connection-handling FSM to avoid possible message loss due to dispatching some messages from the socket to the wrong (listening) process. The process owning the listening socket has it open with {active, false}.

After accepting the client's socket that socket inherits its socket options (including {active, false}) from the listener,

transfers ownership of the socket to the newly spawned client connection-handling FSM by calling gen_tcp:controlling_process/2 and calls Module:set_socket/2 to notify the FSM that it can start receiving messages from the socket.

Until the FSM process enables message delivery by setting the active mode on the socket by calling inet:setopts(Socket, [{active, once}]), the data sent by the TCP sender stays in the socket buffer.

listening process と client fsm の間でのメッセージロスを防ぐ方法。
listening では `{active, false}` で、開く。
アクセプトすると、 `{active, false}` を含め、 listener の設定を継承する。
制御は `gen_tcp:controlling_process` で移し `Module:set_socket/2` で FSM に通知する。
FSM では `{active, once}` に戻すとメッセージを受け取れる、そこまでは socket buffer に入る。


When socket ownership is transfered to FSM in the 'WAIT_FOR_SOCKET' state the FSM sets {active, once} option to let inet driver send it one TCP message at a time. This is the OTP way of preserving flow control and avoiding process message queue flooding with TCP data and crashing the system in case of a fast-producer-slow-consumer case.


ソケットの所有権が'WAIT_FOR_SOCKET' 状態の FSM に転送されると、 FSM は{active 、 once}オプションを設定して、 inet ドライバが一度に 1 つの TCP メッセージを送信できるようにします。これは、フロー制御を維持し、 TCP データによるプロセスメッセージキューフラッディングを回避し、高速プロデューサ - スローコンシューマの場合にシステムをクラッシュさせる OTP の方法です。

The FSM states are implemented by special functions in the tcp_echo_fsm module that use a naming convention with capital case state names enclosed in single quotes. The FSM consists of two states. 'WAIT_FOR_SOCKET' is the initial state in which the FSM is waiting for assignment of socket ownership, and 'WAIT_FOR_DATA' is the state that represents awaiting for TCP message from a client. In this state FSM also handles a special 'timeout' message that signifies no activity from a client and causes the process to stop and close client connection.

FSM 状態は、 tcp_echo_fsm モジュールの特殊関数によって実装されます。この関数は、大文字小文字のステート名を一重引用符で囲んだ命名規則を使用します。 FSM は 2 つの状態で構成されています。 'WAIT_FOR_SOCKET'は、 FSM がソケット所有権の割り当てを待っている初期状態であり、'WAIT_FOR_DATA'は、クライアントからの TCP メッセージを待っている状態を表します。この状態では、 FSM はクライアントからのアクティビティがないことを示す特別な「タイムアウト」メッセージを処理し、プロセスを停止させてクライアント接続を終了させます。


```
TCP Client Socket Handling FSM (tcp_echo_fsm.erl)
```


## Application File

Another required part of building an OTP application is creation of an application file that includes application name, version, startup module and environment.

OTP アプリケーションを構築するために必要なもう 1 つの要素は、アプリケーション名、バージョン、起動モジュール、および環境を含むアプリケーションファイルの作成です。


```
Application File (tcp_server.app)
```


## Conclusion

OTP provides building blocks for constructing non-blocking TCP servers. This tutorial showed how to create a simple TCP server with flow control using standard OTP behaviours. As an exercise the reader is encouraged to try abstracting generic non-blocking TCP server functionality into a stand-along behaviour.

OTP は、非ブロッキング TCP サーバーを構築するビルディングブロックを提供します。このチュートリアルでは、標準の OTP 動作を使用してフロー制御を使用して単純な TCP サーバーを作成する方法を示しました。練習として、一般的な非ブロッキング TCP サーバー機能を抽象的なスタンドアロンの動作に抽象化することをお勧めします。
