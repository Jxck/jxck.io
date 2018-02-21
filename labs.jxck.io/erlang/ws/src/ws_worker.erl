%%%-------------------------------------------------------------------
%% @doc ws connection worker
%% @end
%%%-------------------------------------------------------------------
-module(ws_worker).
-behaviour(gen_statem).
-include("logger.hrl").

%% Supervisor callbacks
-export([
         start_link/1
        ]).

%% Gen Statem callbacks
-export([
         init/1,
         callback_mode/0,
         code_change/4,
         terminate/3,

         first/3,
         second/3,
         ext_len/3,
         mask/3,
         payload/3
        ]).


%%====================================================================
%% Gen Statem callbacks
%%====================================================================
start_link(Socket) ->
    ?Log(Socket),
    Log = {},
    gen_statem:start_link(?MODULE, Socket, [Log]).


%% Callback
% gen_statem module            Callback module
% -----------------            ---------------
% gen_statem:start
% gen_statem:start_link -----> Module:init/1
%
% Server start or code change
%                       -----> Module:callback_mode/0
%
% gen_statem:stop       -----> Module:terminate/3
%
% gen_statem:call
% gen_statem:cast
% erlang:send
% erlang:'!'            -----> Module:StateName/3
%                              Module:handle_event/4
%
% -                     -----> Module:terminate/3
%
% -                     -----> Module:code_change/4
callback_mode() ->
    state_functions.

init(Socket) ->
    ok = inet:setopts(Socket, [{packet, raw}, {active, once}]),
    NextState = {<<>>, #{}, Socket},
    {ok, first, NextState}.


first(info, {tcp_closed, Socket}, {_, _, Socket}) ->
    ?Log(tcp_closed),
    {stop, normal};

first(info, {tcp, Socket, Packet}, {Buffer, Acc, Socket}) ->
    ?Log(Acc, Packet),
    case <<Buffer/binary, Packet/binary>> of
        <<Fin:1, 0:1, 0:1, 0:1, Opcode:4, Rest/binary>> ->
            NextState = {Rest, Acc#{fin => Fin, opcode => opcode(Opcode)}, Socket},
            {next_state, second, NextState, [{next_event, info, {tcp, Socket, <<>>}}]};
        B ->
            ?Log(B),
            ok = inet:setopts(Socket, [{active, once}]),
            {keep_state, {B, Acc, Socket}}
    end.


second(info, {tcp_closed, Socket}, {_, _, Socket}) ->
    ?Log(tcp_closed),
    {stop, normal};

second(info, {tcp, Socket, Packet}, {Buffer, Acc, Socket}) ->
    ?Log(Acc, Packet),
    case <<Buffer/binary, Packet/binary>> of
        <<Mask:1, Length:7, Rest/binary>> ->
            NextState = {Rest, Acc#{length => Length, mask => Mask}, Socket},
            {next_state, ext_len, NextState, [{next_event, info, {tcp, Socket, <<>>}}]};
        B ->
            ok = inet:setopts(Socket, [{active, once}]),
            {keep_state, {B, Acc, Socket}}
    end.


ext_len(info, {tcp_closed, Socket}, {_, _, Socket}) ->
    ?Log(tcp_closed),
    {stop, normal};

ext_len(info, {tcp, Socket, Packet}, {Buffer, #{length := 126}=Acc, Socket}) ->
    ?Log(Acc, Packet),
    case <<Buffer/binary, Packet/binary>> of
        <<Length:16, Rest/binary>> ->
            NextState = {Rest, Acc#{length => Length}, Socket},
            {next_state, mask, NextState, [{next_event, info, {tcp, Socket, <<>>}}]};
        B ->
            ok = inet:setopts(Socket, [{active, once}]),
            {keep_state, {B, Acc, Socket}}
    end;

ext_len(info, {tcp, Socket, Packet}, {Buffer, #{length := 127}=Acc, Socket}) ->
    ?Log(Acc, Packet),
    case <<Buffer/binary, Packet/binary>> of
        <<Length:64, Rest/binary>> ->
            NextState = {Rest, Acc#{length => Length}, Socket},
            {next_state, mask, NextState, [{next_event, info, {tcp, Socket, <<>>}}]};
        B ->
            ok = inet:setopts(Socket, [{active, once}]),
            {keep_state, {B, Acc, Socket}}
    end;

ext_len(info, {tcp, Socket, Packet}, {Buffer, Acc, Socket}=NextState) ->
    ?Log(Acc, Packet),
    {next_state, mask, NextState, [{next_event, info, {tcp, Socket, <<>>}}]}.


mask(info, {tcp_closed, Socket}, {_, _, Socket}) ->
    ?Log(tcp_closed),
    {stop, normal};

mask(info, {tcp, Socket, Packet}, {Buffer, #{mask := 1}=Acc, Socket}) ->
    ?Log(Acc, Packet),
    case <<Buffer/binary, Packet/binary>> of
        <<MaskingKey:4/binary, Rest/binary>> ->
            NextState = {Rest, Acc#{masking_key => MaskingKey}, Socket},
            {next_state, payload, NextState, [{next_event, info, {tcp, Socket, <<>>}}]};
        B ->
            ok = inet:setopts(Socket, [{active, once}]),
            {keep_state, {B, Acc, Socket}}
    end;

mask(info, {tcp, Socket, Packet}, {Buffer, #{mask := 0}=Acc, Socket}) ->
    ?Log(Acc, Packet),
    NextState = {Buffer, Acc#{masking_key => <<>>}, Socket},
    {next_state, payload, NextState, [{next_event, info, {tcp, Socket, <<>>}}]}.


payload(info, {tcp_closed, Socket}, {_, _, Socket}) ->
    ?Log(tcp_closed),
    {stop, normal};

payload(info, {tcp, Socket, Packet}, {Buffer, #{length := Length, masking_key := MaskingKey}=Acc, Socket}) ->
    ?Log(Acc, Packet),
    case <<Buffer/binary, Packet/binary>> of
        <<Payload:Length/binary, Rest/binary>> ->
            Plain = unmask(Payload, MaskingKey),
            case Acc of
                #{opcode := connection_close} ->
                    ok = ?Log(gen_tcp:close(Socket)),
                    {stop, normal};
                #{opcode := ping} ->
                    pong(Socket),
                    NextState = {Rest, #{}, Socket},
                    {next_state, first, NextState, [{next_event, info, {tcp, Socket, <<>>}}]};
                _ ->
                    ok = handle(Acc, Plain, Socket),
                    NextState = {Rest, #{}, Socket},
                    {next_state, first, NextState, [{next_event, info, {tcp, Socket, <<>>}}]}
            end;
        B ->
            ok = inet:setopts(Socket, [{active, once}]),
            {keep_state, {B, Acc, Socket}}
    end.


terminate(Reason, State, Data) ->
    ?Log(terminate, Reason, State, Data),
    ok.

code_change(_Vsn, State, Data, _Extra) ->
    {ok, State, Data}.


%%====================================================================
%% Internal functions
%%====================================================================
pong(Socket) ->
    ?Log("Pong"),
    gen_tcp:send(Socket, <<16#8a, 16#00>>).

handle(Acc, Plain, Socket) ->
    ?Log("============================"),
    ?Log(handle, Acc, (Plain)), % handle !!

    Res = encode(Acc#{payload => Plain}),
    ?Log(Res),
    gen_tcp:send(Socket, Res).

encode(#{opcode := Opcode, payload := Payload}) ->
    Fin = 1,
    Mask = 0,

    Length = case byte_size(Payload) of
                 Len when Len =< 125     -> <<Mask:1, Len:7>>;
                 Len when Len =< 16#FFFF -> <<Mask:1, 126:7, Len:16>>;
                 Len                     -> <<Mask:1, 127:7, Len:64>>
             end,

    <<Fin:1, 0:3, (opcode(Opcode)):4, Length/binary, Payload/binary>>.



opcode(16#00) -> continuation_frame;
opcode(16#01) -> text_frame;
opcode(16#02) -> binary_frame;
opcode(16#03) -> reserved_non_control1;
opcode(16#04) -> reserved_non_control2;
opcode(16#05) -> reserved_non_control3;
opcode(16#06) -> reserved_non_control4;
opcode(16#07) -> reserved_non_control5;
opcode(16#08) -> connection_close;
opcode(16#09) -> ping;
opcode(16#0A) -> pong;
opcode(16#0B) -> reserved_control_frames1;
opcode(16#0C) -> reserved_control_frames2;
opcode(16#0D) -> reserved_control_frames3;
opcode(16#0E) -> reserved_control_frames4;
opcode(16#0F) -> reserved_control_frames5;
opcode(continuation_frame)       -> 16#00;
opcode(text_frame)               -> 16#01;
opcode(binary_frame)             -> 16#02;
opcode(reserved_non_control1)    -> 16#03;
opcode(reserved_non_control2)    -> 16#04;
opcode(reserved_non_control3)    -> 16#05;
opcode(reserved_non_control4)    -> 16#06;
opcode(reserved_non_control5)    -> 16#07;
opcode(connection_close)         -> 16#08;
opcode(ping)                     -> 16#09;
opcode(pong)                     -> 16#0A;
opcode(reserved_control_frames1) -> 16#0B;
opcode(reserved_control_frames2) -> 16#0C;
opcode(reserved_control_frames3) -> 16#0D;
opcode(reserved_control_frames4) -> 16#0E;
opcode(reserved_control_frames5) -> 16#0F;
opcode(Unknown) -> Unknown.


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
