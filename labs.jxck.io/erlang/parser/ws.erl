#!/usr/bin/env escript
-module(ws).

-mode(compile).
-compile(export_all).
-behaviour(gen_statem).
-include("../logger.hrl").

init([]) ->
    State = {<<>>, #{}},
    {ok, first, State}.


first(cast, Packet, {Buffer, Acc}) ->
    case <<Buffer/binary, Packet/binary>> of
        <<Fin:1, 0:1, 0:1, 0:1, Opcode:4, Rest/binary>> ->
            NextState = {Rest, Acc#{fin => Fin, opcode => Opcode}},
            {next_state, second, NextState};
        B ->
            {keep_state, {B, Acc}}
    end.


second(cast, Packet, {Buffer, Acc}) ->
    case <<Buffer/binary, Packet/binary>> of
        <<1:1, Length:7, Rest/binary>> ->
            NextState = {Rest, Acc#{length => Length}},
            {next_state, mask, NextState};
        <<0:1, Length:7, Rest/binary>> ->
            NextState = {Rest, Acc#{length => Length, masking_key => <<>>}},
            {next_state, payload, NextState};
        B ->
            {keep_state, {B, Acc}}
    end.


mask(cast, Packet, {Buffer, Acc}) ->
    case <<Buffer/binary, Packet/binary>> of
        <<MaskingKey:4/binary, Rest/binary>> ->
            NextState = {Rest, Acc#{masking_key => MaskingKey}},
            {next_state, payload, NextState};
        B ->
            {keep_state, {B, Acc}}
    end.


payload(cast, Packet, {Buffer, #{length := Length, masking_key := MaskingKey}=Acc}) ->
    case <<Buffer/binary, Packet/binary>> of
        <<Payload:Length/binary, Rest/binary>> ->
            NextState = {Rest, Acc#{payload => (unmask(Payload, MaskingKey))}},
            ?Log(NextState),
            {next_state, first, {Rest, #{}}};
        B ->
            {keep_state, {B, Acc}}
    end.


callback_mode() -> state_functions.
terminate(_Reason, _State, _Data) -> void.
code_change(_Vsn, State, Data, _Extra) -> {ok, State, Data}.


%% private
unmask(Payload, <<>>) ->
    Payload;

unmask(Payload, MaskingKey) ->
    unmask(Payload, MaskingKey, <<>>).

unmask(<<Head:32, Rest/binary>>, <<Key:32>>=MaskingKey, Acc) ->
    Unmask = Head bxor Key,
    unmask(Rest, MaskingKey, <<Acc/binary, Unmask:32>>);

unmask(<<Head:24, Rest/binary>>, <<Key:24, _/binary>>=MaskingKey, Acc) ->
    Unmask = Head bxor Key,
    unmask(Rest, MaskingKey, <<Acc/binary, Unmask:24>>);

unmask(<<Head:16, Rest/binary>>, <<Key:16, _/binary>>=MaskingKey, Acc) ->
    Unmask = Head bxor Key,
    unmask(Rest, MaskingKey, <<Acc/binary, Unmask:16>>);

unmask(<<Head:8, Rest/binary>>, <<Key:8, _/binary>>=MaskingKey, Acc) ->
    Unmask = Head bxor Key,
    unmask(Rest, MaskingKey, <<Acc/binary, Unmask:8>>);

unmask(<<>>, _, Acc) ->
    Acc.


%% Public
start() ->
    gen_statem:start({local, ?MODULE}, ?MODULE, [], []).

send(Packet) ->
    gen_statem:cast(?MODULE, Packet).

stop() ->
    gen_statem:stop(?MODULE).


main(_) ->
    ?Log(start()),
    [send(<<P>>) || P <- [
                          16#81, 16#84, 16#0c, 16#6f, 16#a3, 16#d7,
                          16#78, 16#0a, 16#db, 16#a3
                         ]],


    [send(<<P>>) || P <- [
                          16#81, 16#04,
                          16#74, 16#65, 16#78, 16#74
                         ]],

    ok = stop().

