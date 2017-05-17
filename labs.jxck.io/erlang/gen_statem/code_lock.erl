%#!/usr/bin/env escript

-module(code_lock).
-behaviour(gen_statem).

-include("../logger.hrl").

-compile(export_all).

main(_) ->
    start([1,2,3]),
    button(1),
    button(2),
    button(3),
    stop(),
    ok.


callback_mode() ->
    state_functions.

start(Code) ->
    ?Log(Code),
    gen_statem:start_link({local, ?MODULE}, ?MODULE, Code, []).

stop() ->
    ?Log(stop),
    gen_statem:stop(?MODULE).

button(Digit) ->
    ?Log(Digit),
    gen_statem:cast(?MODULE, {button, Digit}).

init(Code) ->
    ?Log(Code),
    %% これをするとエラーを terminate で受け取れる
    process_flag(trap_exit, true),
    do_lock(),
    Data = #{code => Code, remaining => Code},
    {ok, locked, Data}.

locked(timeout, Content, #{code := Code, remaining := Remaining} = Data) ->
    {next_state, locked, Data#{remaining := Code}};
locked(cast, {button, Digit} = Input, #{code := Code, remaining := Remaining} = Data) ->
    ?Log(Input),
    case Remaining of
        [Digit] ->
            do_unlock(),
            % 状態を open に変更してから 3000 秒経つと lock に変更する
            {next_state, open, Data#{remaining := Code}, [{state_timeout, 3000, lock}]};
        [Digit|Rest] -> % Incomplete
            % locked のままだが 1000 秒経つと timeout イベントが上がる
            % 状態が変わるとキャンセルされる
            {next_state, locked, Data#{remaining := Rest}, 1000};
        _Wrong ->
            {next_state, locked, Data#{remaining := Code}}
    end.

open(state_timeout, lock, Data) ->
    do_lock(),
    {next_state, locked, Data};
open(cast, {button, _}, Data) ->
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
