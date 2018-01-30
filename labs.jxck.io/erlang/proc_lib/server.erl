%%% OTP デザインに準拠した設計
-module(server).

% API
-export([
         start_link/0,
         init/1,
         debug/3
        ]).

% sys callback
-export([
         system_code_change/4,
         system_continue/3,
         system_get_state/1,
         system_replace_state/2,
         system_terminate/4
        ]).

-include("../logger.hrl").

main(_) ->
    start_link().

%% 同期でプロセスを spawn し ack を待つ
start_link() ->
    ?Log(),
    proc_lib:start_link(?MODULE, init, [self()]).

%% ack を非同期に返しつつ loop を回す
init(Parent) ->
    ?Log(Parent, self()),
    register(?MODULE, self()),
    Debug = sys:debug_options([]),
    ?Log(Debug),
    proc_lib:init_ack(Parent, {ok, self()}),
    loop(Parent, Debug, []).

%% main loop, system message も処理する。
loop(Parent, Debug, State) ->
    ?Log(Parent, Debug, State),
    receive
        {system, From, Request} ->
            ?Log({system, From, Request}),
            sys:handle_system_msg(Request, From, Parent, ?MODULE, Debug, State);
        Msg ->
            ?Log(Msg),
            sys:handle_debug(Debug, fun ?MODULE:debug/3, ?MODULE, {in, Msg}),
            loop(Parent, Debug, State)
    end.

%% sys:handle_debug() が呼ぶコールバック
debug(Device, Event, Extra) ->
    io:format(Device, "[~p] ~p~n", [Event, Extra]).

%% http://erlang.org/doc/man/sys.html#Module:system_code_change-4
system_code_change(State, _Module, _OldVsn, _Extra) ->
    ?Log(State, _Module, _OldVsn, _Extra),
    {ok, State}.

%% http://erlang.org/doc/man/sys.html#Module:system_continue-3
system_continue(Parent, Debug, State) ->
    ?Log(Parent, Debug, State),
    loop(Parent, Debug, State).

%% http://erlang.org/doc/man/sys.html#Module:system_code_change-4
system_get_state(State) ->
    ?Log(State),
    {ok, State}.

%% http://erlang.org/doc/man/sys.html#Module:system_replace_state-2
system_replace_state(StateFun, Misc) ->
    ?Log(StateFun, Misc),
    {ok, NState, NMisc}.

%% http://erlang.org/doc/man/sys.html#Module:system_terminate-4
system_terminate(Reason, _Parent, _Debug, _State) ->
    ?Log(Reason, _Parent, _Debug, _State),
    exit(Reason).
