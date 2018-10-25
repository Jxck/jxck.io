#!/usr/bin/env escript
-module(code_lock).

-mode(compile).
-compile(export_all).
-behaviour(gen_statem).
-include("../logger.hrl").

start(Code) ->
    ?Log(Code),
    ?Log(gen_statem:start({local, ?MODULE}, ?MODULE, Code, [])).

stop() ->
    ?Log(stop),
    gen_statem:stop(?MODULE).

init(Code) ->
    ?Log(Code),
    process_flag(trap_exit, true), % これでエラーを terminate で受け取れるようになる
    {ok, locked, #{code => Code, buf => []}}.

callback_mode() ->
    [
     state_functions, % 状態を atom で表し、対応する関数を定義
     state_enter % 各イベントへの遷移の最初に enter を実行
    ].


%% state enter のハンドラ
locked(enter, _OldState, #{code := Code} = Data) ->
    ?Log(locked, enter),
    do_lock(),
    {keep_state, Data#{remaining => Code, buf => []}};

%% timeout イベントのハンドラ
locked(timeout, expired, #{code := Code, remaining := _Remaining} = Data) ->
    ?Log(locked, timeout),
    {keep_state, Data#{remaining := Code}};

%% button のハンドラ
locked(cast, {button, Digit}, #{code := Code, remaining := Remaining} = Data) ->
    ?Log(locked, cast, {button, Digit}, Remaining),
    case Remaining of
        [Digit] ->
            {next_state, open, Data};
        [Digit | Rest] ->
            % locked で 1s 経つと timeout イベントが上がる
            {keep_state, Data#{remaining := Rest}, [{timeout, 1000, expired}]};
        [_ | _] ->
            {keep_state, Data#{remaining := Code}}
    end;

%% internal のハンドラ
locked(internal, EventContent, Data) ->
    ?Log(locked, internal, EventContent, Data),
    locked(cast, EventContent, Data);

%% それ以外、ここでは code_length のハンドラ
locked(EventType, EventContent, Data) ->
    ?Log(locked, EventType, EventContent, Data),
    handle_event(EventType, EventContent, Data).



%% state enter のハンドラ
open(enter, _OldState, _Data) ->
    ?Log(open, enter),
    do_unlock(),
    % open に 3s とどまると state_timeout イベントが上がる
    {keep_state_and_data, [{state_timeout, 3000, lock}]};

%% state_timeout イベントのハンドラ
open(state_timeout, lock, Data) ->
    ?Log(open, state_timeout),
    {next_state, locked, Data};

%% button のハンドラ
open(cast, {button, _}, _) ->
    ?Log(open, cast),
    {keep_state_and_data, [postpone]};

%% それ以外、ここでは code_length のハンドラ
open(EventType, EventContent, Data) ->
    ?Log(open, EventType, EventContent, Data),
    handle_event(EventType, EventContent, Data).


%% locked/open のハンドラから code_length が移譲される
handle_event({call, From}, {chars, Chars}, #{buf := Buf} = Data) ->
    ?Log(Chars, Buf),
    {keep_state, Data#{buf := [Chars|Buf]}, [{reply, From, ok}]};

handle_event({call, From}, enter, #{buf := Buf} = Data) ->
    ?Log(Buf),
    Chars = unicode:characters_to_binary(lists:reverse(Buf)),
    ?Log(Chars),
    Digit = binary_to_integer(Chars),
    ?Log(Digit),
    {keep_state, Data#{buf := []}, [{reply, From, ok}, {next_event, cast, {button, Digit}}]};

handle_event({call, From}, code_length, #{code := Code}) ->
    ?Log(code_length, {call, From}),
    {keep_state_and_data, [{reply, From, length(Code)}]}.


button(Digit) ->
    ?Log(Digit),
    gen_statem:cast(?MODULE, {button, Digit}).

code_length() ->
    ?Log(gen_statem:call(?MODULE, code_length)).

do_lock() ->
    ?Log("Locked").

do_unlock() ->
    ?Log("Open").

terminate(Reason, State, Data) ->
    ?Log(terminate, Reason, State, Data),
    State =/= locked andalso do_lock(),
    ok.

code_change(_Vsn, State, Data, _Extra) ->
    {ok, State, Data}.



main(_) ->
    main().

main() ->
    start([1, 2, 3]),
    code_length(),
    button(1),
    timer:sleep(4000),
    button(1),
    button(0),
    timer:sleep(4000),
    button(1),
    button(2),
    code_length(),
    button(3),
    timer:sleep(6000),
    stop(),
    ok.

%main() ->
%    start([17]),
%    put_chars(<<"001">>),
%    put_chars(<<"7">>),
%    enter().


put_chars(Chars) when is_binary(Chars) ->
    ?Log(Chars),
    gen_statem:call(?MODULE, {chars, Chars}).

enter() ->
    ?Log(enter),
    gen_statem:call(?MODULE, enter).
