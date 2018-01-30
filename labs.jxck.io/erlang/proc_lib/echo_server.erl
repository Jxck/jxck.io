%% OTP デザインに準拠した設計
-module(echo_server).

%%-------------------------------------------------------------------
%% API Function Exports
%%-------------------------------------------------------------------
-export([
         start_link/0,
         init/1,
         stop/0
        ]).

%%-------------------------------------------------------------------
%% Required OTP Exports
%%-------------------------------------------------------------------
-export([
         accept/1,
         handle_connection/1,
         recv_loop/1
        ]).

main(_) ->
    start_link().

start_link() ->
    proc_lib:start_link(?MODULE, init, [self()]).

stop() ->
    case whereis(?MODULE) of
        Pid when is_pid(Pid) ->
            exit(Pid, shutdown),
            ok;
        _ ->
            not_started
    end.

init(Parent) ->
    register(?MODULE, self()),
    case gen_tcp:listen(8080, [{active, false}, binary, {packet, line}, {reuseaddr, true}]) of
        {ok, ListenSocket} ->
            proc_lib:init_ack(Parent, {ok, self()}),
            accept(ListenSocket);
        {error, Reason} ->
            proc_lib:init_ack(Parent, {error, Reason}),
            error
    end.

accept(ListenSocket) ->
    {ok, Socket} = gen_tcp:accept(ListenSocket),
    spawn_link(?MODULE, handle_connection, [Socket]),
    accept(ListenSocket).

handle_connection(Socket) ->
    gen_tcp:send(Socket, <<"hello\r\n">>),
    recv_loop(Socket).

recv_loop(Socket) ->
    case gen_tcp:recv(Socket, 0) of
        {ok, B} ->
            case B of
                <<"bye\r\n">> ->
                    gen_tcp:send(Socket, <<"cya\r\n">>),
                    gen_tcp:close(Socket);
                Other ->
                    gen_tcp:send(Socket, Other),
                    recv_loop(Socket)
            end;
        {error, closed} ->
            ok
    end.
