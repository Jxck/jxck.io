#!/usr/bin/env escript
-module(main).
-behaviour(gen_statem).

-export([
         start_link/1,
         stop/0,
         button/1,
         init/1,
         callback_mode/0,
         terminate/3,
         code_change/4,
         locked/3,
         open/3,
         main/1,
         format_status/2
        ]).

-define(NAME, code_lock).
-define(STATE_TIMEOUT, 1000).
-define(TIMEOUT, 3000).

-define(Log(A), (fun(P) -> io:format("[~p:~p#~p] ~p~n", [?MODULE, ?FUNCTION_NAME, ?LINE, P]), P end)(A)).

main(_) ->
    start_link([1, 2, 3, 4]),
    button(1),
    button(2),
    button(3),
    button(4),
    button(1),
    button(2),
    button(3),
    button(4),
    ?Log(ok).

start_link(Code) ->
    ?Log(Code),
    gen_statem:start_link({local, ?NAME}, ?MODULE, Code, []).

stop() ->
    gen_statem:stop(?NAME).

button(Digit) ->
    ?Log(Digit),
    gen_statem:cast(?NAME, {button, Digit}).

init(Code) ->
    ?Log(Code),
    process_flag(trap_exit, true),
    Data = #{code => Code, remaining => Code},
    {ok, locked, Data}.

callback_mode() ->
    [state_functions, state_enter].

locked(enter, _OldState, #{code := Code} = Data) ->
    ?Log(enter_locked),
    do_lock(),
    {keep_state, Data#{remaining => Code}};
locked(timeout, _, #{code := Code, remaining := _} = Data) ->
    ?Log(timeout),
    {next_state, locked, Data#{remaining := Code}};
locked(cast, {button, Digit}, #{code := Code, remaining := Remaining} = Data) ->
    ?Log(Digit),
    case Remaining of
        [Digit] ->
            {next_state, open, Data#{remaining := Code}, [{state_timeout, ?STATE_TIMEOUT, lock}]};
        [Digit|Rest] -> % Incomplete
            {next_state, locked, Data#{remaining := Rest}, ?TIMEOUT};
        _Wrong ->
            {next_state, locked, Data#{remaining := Code}}
    end.

open(enter, _OldState, _Data) ->
    ?Log(enter_open),
    do_unlock(),
    {keep_state_and_data, [{state_timeout, 10000, lock}]};
open(state_timeout, lock,  Data) ->
    ?Log(state_timeout),
    {next_state, locked, Data};
open(cast, {button, _}, Data) ->
    ?Log(cast),
    {keep_state, Data, [postpone]}.

do_lock() ->
    ?Log("Lock").
do_unlock() ->
    ?Log("UnLock").

terminate(_Reason, State, _Data) ->
    State =/= locked andalso do_lock(),
    ok.
code_change(_Vsn, State, Data, _Extra) ->
    {ok, State, Data}.
format_status(Opt, [_PDict, State, Data]) ->
    ?Log(_PDict),
    StateData = {State, maps:filter(fun (code, _) -> false;
                                        (remaining, _) -> false;
                                        (_, _) -> true
                                    end, Data)},
    case Opt of
        terminate ->
            StateData;
        normal ->
            [{data, [{"State", StateData}]}]
    end.
