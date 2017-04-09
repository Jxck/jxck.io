-module(ws).

-export([
         decode/1,
         main/1
        ]).

-include("logger.hrl").


opcode(<<16#00:4>>) -> continuation_frame;
opcode(<<16#01:4>>) -> text_frame;
opcode(<<16#02:4>>) -> binary_frame;
opcode(<<16#03:4>>) -> reserved_non_control; opcode(<<16#04:4>>) -> reserved_non_control;
opcode(<<16#05:4>>) -> reserved_non_control;
opcode(<<16#06:4>>) -> reserved_non_control;
opcode(<<16#07:4>>) -> reserved_non_control;
opcode(<<16#08:4>>) -> connection_close;
opcode(<<16#09:4>>) -> ping;
opcode(<<16#0A:4>>) -> pong;
opcode(<<16#0B:4>>) -> reserved_control_frames;
opcode(<<16#0C:4>>) -> reserved_control_frames;
opcode(<<16#0D:4>>) -> reserved_control_frames;
opcode(<<16#0E:4>>) -> reserved_control_frames;
opcode(<<16#0F:4>>) -> reserved_control_frames.


%  0                   1                   2                   3
%  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
% +-+-+-+-+-------+-+-------------+-------------------------------+
% |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
% |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
% |N|V|V|V|       |S|             |   (if payload len==126/127)   |
% | |1|2|3|       |K|             |                               |
% +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
% |     Extended payload length continued, if payload len == 127  | % + - - - - - - - - - - - - - - - +-------------------------------+
% |                               |Masking-key, if MASK set to 1  |
% +-------------------------------+-------------------------------+
% | Masking-key (continued)       |          Payload Data         |
% +-------------------------------- - - - - - - - - - - - - - - - +
% :                     Payload Data continued ...                :
% + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
% |                     Payload Data continued ...                |
% +---------------------------------------------------------------+
decode(<<
         FIN:1/bits,
         RSV1:1/bits,
         RSV2:1/bits,
         RSV3:1/bits,
         OPCODE:4/bits,
         MASK:1/bits,
         Len:7/bits,
         Rest/binary>>) ->

    Frame = #{
      fin => (FIN =:= <<1:1>>),
      rsv1 => (RSV1 =:= <<1:1>>),
      rsv2 => (RSV2 =:= <<1:1>>),
      rsv3 => (RSV3 =:= <<1:1>>),
      opcode => opcode(OPCODE),
      mask => (MASK =:= <<1:1>>)
     },
    len(<< <<0:1>>/bits, Len/bits>>, Rest, Frame).

len(<<Len>>, Rest, Frame) when Len =< 125 ->
    mask(Rest, Frame#{length => Len});

len(<<126>>, <<Len:2/binary, Rest/binary>>, Frame) ->
    mask(Rest, Frame#{length => Len});

len(<<127>>, <<Len:8/binary, Rest/binary>>, Frame) ->
    mask(Rest, Frame#{length => Len}).

mask(<<MaskingKey:4/binary, Rest/binary>>, #{mask := true}=Frame) ->
    payload(Rest, Frame#{masking_key => MaskingKey});

mask(Bin, #{mask := false}=Frame) ->
    payload(Bin, Frame).

payload(Bin, #{length := Len, masking_key := MaskingKey}=Frame) ->
    <<Payload:Len/binary, Rest/binary>> = Bin,
    Frame#{payload => unmask(Payload, MaskingKey)};

payload(Bin, #{length := Len}=Frame) ->
    <<Payload:Len/binary, Rest/binary>> = Bin,
    Frame#{payload => Payload}.

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
    ?Log(Acc).


main(_) ->
    ?Log(decode(<<129,131,225,158,107,175,128,255,10>>)),
    ?Log(decode(<<129,138,151,143,237,50,246,238,140,83,246,238,140,83, 246,238>>)).
