%%%-------------------------------------------------------------------
%% @doc ws connection worker
%% @end
%%%-------------------------------------------------------------------

-module(ws_worker).

-include("logger.hrl").

%% Supervisor callbacks
-export([
         start_link/1
        ]).

-export([
         init/1,
         callback_mode/0,

         header/3,
         extended_length/3,
         mask/3,
         body/3,

         code_change/4,
         terminate/3
        ]).


%%====================================================================
%% API functions
%%====================================================================
start_link(Socket) ->
    ?Log(Socket),
    Debug = {},
    %Debug = {debug, [trace]},
    gen_statem:start_link(?MODULE, Socket, [Debug]).

%%====================================================================
%% Internal functions
%%====================================================================

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
    [state_functions, state_enter].


% State#{
%   socket,
%   ref,
%   fin,
%   rsv1,
%   rsv2,
%   rsv3,
%   opcode,
%   mask,
%   masking_key,
%   length
%  }.
init(Socket) ->
    ?Log(Socket),
    process_flag(trap_exit, true),
    % change to active false
    ok = inet:setopts(Socket, [{packet, raw}, {active, false}]),
    State = #{socket => Socket, ref => undefined},
    {ok, header, State}.

header(enter, _HeaderOrBody, #{socket := Socket}=State) ->
    ?Log(enter, header, Socket),
    {ok, Ref} = (prim_inet:async_recv(Socket, 2, -1)),
    {keep_state, State#{ref := Ref}};

header(info, {inet_async, Socket, Ref, {error, closed}}, #{socket := Socket, ref := Ref}=State) ->
    ok = gen_tcp:close(Socket),
    {stop, normal};

% Length with 7bit
header(info, {inet_async, Socket, Ref, {ok, <<FIN:1, RSV1:1, RSV2:1, RSV3:1, OP:4, Mask:1, Len:7>>}}, #{socket := Socket, ref := Ref}=State) ->
    ?Log(State),
    NextState = State#{
                  fin         => FIN,
                  rsv1        => RSV1,
                  rsv2        => RSV2,
                  rsv3        => RSV3,
                  opcode      => opcode(OP),
                  mask        => Mask,
                  length      => Len,
                  masking_key => <<>>
                 },
    ?Log(NextState),

    case Len of
        126 ->
            {ok, NextRef} = (prim_inet:async_recv(Socket, 2, -1)),
            {next_state, extended_length, NextState#{ref :=NextRef}};
        127 ->
            {ok, NextRef} = (prim_inet:async_recv(Socket, 8, -1)),
            {next_state, extended_length, NextState#{ref :=NextRef}};
        _ ->
            {next_state, mask, NextState}
    end.


extended_length(enter, header, State) ->
    keep_state_and_data;

extended_length(info, {inet_async, Socket, Ref, {error, closed}}, #{socket := Socket, ref := Ref}=State) ->
    {stop, normal};

extended_length(info, {inet_async, Socket, Ref, {ok, <<Len:16>>}}, #{socket := Socket, ref := Ref, length := 126}=State) ->
    {next_state, mask, State#{length := Len}};

extended_length(info, {inet_async, Socket, Ref, {ok, <<Len:64>>}}, #{socket := Socket, ref := Ref, length := 127}=State) ->
    {next_state, mask, State#{length := Len}}.


mask(enter, _HeaderOrMask, #{socket := Socket, mask := 1}=State) ->
    {ok, Ref} = ?Log(prim_inet:async_recv(Socket, 4, -1)),
    {keep_state, State#{ref := Ref}};

mask(info, {inet_async, Socket, Ref, {error, closed}}, #{socket := Socket, ref := Ref}=State) ->
    ok = ?Log(gen_tcp:close(Socket)),
    {stop, normal};

mask(info, {inet_async, Socket, Ref, {ok, <<MaskingKey:4/binary>>}}, #{socket := Socket, ref := Ref, length := Len}=State) ->
    {ok, NextRef} = ?Log(prim_inet:async_recv(Socket, Len, -1)),
    {next_state, body, State#{ref := NextRef, masking_key := MaskingKey}}.


body(enter, mask, State) ->
    ?Log(State),
    keep_state_and_data;

body(info, {inet_async, Socket, Ref, {error, closed}}, #{socket := Socket, ref := Ref}=State) ->
    ok = ?Log(gen_tcp:close(Socket)),
    {stop, normal};

body(info, {inet_async, Socket, Ref, {ok, Payload}}, #{socket := Socket, ref := Ref, masking_key := MaskingKey, opcode := Op}=State) ->
    ?Log(State),
    Req = unmask(Payload, MaskingKey),
    ?Log(request_size, byte_size(Req)),

    Res = handle(Op, Req),
    ok = send(Socket, Res),
    {next_state, header, #{socket => Socket, ref => undefined}}. % free state


terminate(Reason, State, Data) ->
    ?Log(terminate, Reason, State, Data),
    ok.

code_change(_Vsn, State, Data, _Extra) ->
    {ok, State, Data}.


handle(Op, Req) ->
    encode(opcode(Op), Req).

send(Socket, Packet) ->
    ok = gen_tcp:send(Socket, Packet).

encode(Op, Plain) ->
    Mask = 0,
    Len = byte_size(Plain),
    ?Log(Len),

    First = <<1:1, % FIN
              0:1, % RSV
              0:1, % RSV
              0:1, % RSV
              Op:4
            >>,

    Second = case Len of
                 Len when Len =< 125     -> <<Mask:1, Len:7>>;
                 Len when Len =< 16#FFFF -> <<Mask:1, 126:7, Len:16>>;
                 Len                     -> <<Mask:1, 127:7, Len:64>>
             end,
    <<
      First/binary,
      Second/binary,
      Plain/binary
    >>.


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
