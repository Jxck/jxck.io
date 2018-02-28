%%%-------------------------------------------------------------------
%% @doc ws packet en/decoder
%% @end
%%%-------------------------------------------------------------------
-module(ws_packet).

%% API
-export([
         encode/2,
         header/1,
         payload/2,
         opcode/1
        ]).

-include("logger.hrl").
-include("ws.hrl").

%%====================================================================
%% API functions
%%====================================================================

%%--------------------------------------------------------------------
%% Encoder
%%--------------------------------------------------------------------
%  0                   1                   2                   3
%  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
% +-+-+-+-+-------+-+-------------+-------------------------------+
% |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
% |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
% |N|V|V|V|       |S|             |   (if payload len==126/127)   |
% | |1|2|3|       |K|             |                               |
% +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
% |     Extended payload length continued, if payload len == 127  |
% + - - - - - - - - - - - - - - - +-------------------------------+
% |                               |Masking-key, if MASK set to 1  |
% +-------------------------------+-------------------------------+
% | Masking-key (continued)       |          Payload Data         |
% +-------------------------------- - - - - - - - - - - - - - - - +
% :                     Payload Data continued ...                :
% + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
% |                     Payload Data continued ...                |
% +---------------------------------------------------------------+

-type header() :: #{fin         := boolean(),
                    rsv1        := boolean(),
                    rsv2        := boolean(),
                    rsv3        := boolean(),
                    opcode      := atom(),
                    mask        := boolean(),
                    length      := non_neg_integer(),
                    masking_key := <<_:_*32>>
                   }.

-spec encode(map(), binary()) -> binary().
encode(#{fin := Fin, opcode := Opcode, mask := _Mask}, Payload) ->
    Header = <<(util:bool_to_bit(Fin)):1, 0:3, (opcode(Opcode)):4>>,
    Mask   = util:bool_to_bit(_Mask),
    Length = case byte_size(Payload) of
                 Len when Len =< 125     -> <<Mask:1, Len:7>>;
                 Len when Len =< 16#FFFF -> <<Mask:1, 126:7, Len:16>>;
                 Len                     -> <<Mask:1, 127:7, Len:64>>
             end,
    <<Header/binary, Length/binary, Payload/binary>>.

ping() ->
    encode(#{fin => true, opcode => ping, mask => false}, <<>>).

pong() ->
    encode(#{fin => true, opcode => pong, mask => false}, <<>>).


%% docode header
-spec header(<<_:16, _:_*8>>) -> {binary(), header()}.
header(<<FIN:1, RSV1:1, RSV2:1, RSV3:1, OPCODE:4, MASK:1, Len:7, Rest/binary>>) ->

    Header = #{
      fin         => util:bit_to_bool(FIN),
      rsv1        => util:bit_to_bool(RSV1),
      rsv2        => util:bit_to_bool(RSV2),
      rsv3        => util:bit_to_bool(RSV3),
      opcode      => opcode(OPCODE),
      mask        => util:bit_to_bool(MASK),
      length      => 0,
      masking_key => <<>>,
      payload     => <<>>
     },
    len(Len, Rest, Header).


-spec len(integer(), binary(), header()) -> {binary(), header()}.
len(126, <<Len:16, Rest/binary>>, Header) ->
    mask(Rest, Header#{length := Len});

len(127, <<Len:64, Rest/binary>>, Header) ->
    mask(Rest, Header#{length := Len});

len(Len, Rest, Header) when Len =< 125 ->
    mask(Rest, Header#{length := Len}).


-spec mask(binary(), header()) -> {binary(), header()}.
mask(<<MaskingKey:4/binary, Rest/binary>>, #{mask := true}=Header) ->
    {Rest, Header#{masking_key := MaskingKey}};

mask(Rest, #{mask := false}=Header) ->
    {Rest, Header}.


%% docode payload
-spec payload(binary(), header()) -> {binary(), binary()}.
payload(Bin, #{length := Len, masking_key := MaskingKey}) ->
    <<Payload:Len/binary, Rest/binary>> = Bin,
    {Rest, unmask(Payload, MaskingKey)};

payload(Bin, #{length := Len}) ->
    <<Payload:Len/binary, Rest/binary>> = Bin,
    {Rest, Payload}.

-spec unmask(binary(), binary()) -> binary().
unmask(Payload, MaskingKey) ->
    unmask(Payload, MaskingKey, <<>>).

-spec unmask(binary(), binary(), binary()) -> binary().
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
    (Acc).


opcode(continuation_frame)       -> ?CONTINUATION_FRAME;
opcode(text_frame)               -> ?TEXT_FRAME;
opcode(binary_frame)             -> ?BINARY_FRAME;
opcode(reserved_non_control1)    -> ?RESERVED_NON_CONTROL1;
opcode(reserved_non_control2)    -> ?RESERVED_NON_CONTROL2;
opcode(reserved_non_control3)    -> ?RESERVED_NON_CONTROL3;
opcode(reserved_non_control4)    -> ?RESERVED_NON_CONTROL4;
opcode(reserved_non_control5)    -> ?RESERVED_NON_CONTROL5;
opcode(connection_close)         -> ?CONNECTION_CLOSE;
opcode(ping)                     -> ?PING;
opcode(pong)                     -> ?PONG;
opcode(reserved_control_frames1) -> ?RESERVED_CONTROL_FRAMES1;
opcode(reserved_control_frames2) -> ?RESERVED_CONTROL_FRAMES2;
opcode(reserved_control_frames3) -> ?RESERVED_CONTROL_FRAMES3;
opcode(reserved_control_frames4) -> ?RESERVED_CONTROL_FRAMES4;
opcode(reserved_control_frames5) -> ?RESERVED_CONTROL_FRAMES5;

opcode(?CONTINUATION_FRAME)       -> continuation_frame;
opcode(?TEXT_FRAME)               -> text_frame;
opcode(?BINARY_FRAME)             -> binary_frame;
opcode(?RESERVED_NON_CONTROL1)    -> reserved_non_control1;
opcode(?RESERVED_NON_CONTROL2)    -> reserved_non_control2;
opcode(?RESERVED_NON_CONTROL3)    -> reserved_non_control3;
opcode(?RESERVED_NON_CONTROL4)    -> reserved_non_control4;
opcode(?RESERVED_NON_CONTROL5)    -> reserved_non_control5;
opcode(?CONNECTION_CLOSE)         -> connection_close;
opcode(?PING)                     -> ping;
opcode(?PONG)                     -> pong;
opcode(?RESERVED_CONTROL_FRAMES1) -> reserved_control_frames1;
opcode(?RESERVED_CONTROL_FRAMES2) -> reserved_control_frames2;
opcode(?RESERVED_CONTROL_FRAMES3) -> reserved_control_frames3;
opcode(?RESERVED_CONTROL_FRAMES4) -> reserved_control_frames4;
opcode(?RESERVED_CONTROL_FRAMES5) -> reserved_control_frames5.
