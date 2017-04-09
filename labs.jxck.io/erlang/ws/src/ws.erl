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

len(<<126>>, <<Len:16, Rest/binary>>, Frame) ->
    mask(Rest, Frame#{length => Len});

len(<<127>>, <<Len:64, Rest/binary>>, Frame) ->
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
    % ''
    ?Log(decode(<<129,128,1,25,75,33>>)),

    ?Log(decode(<<129,131,225,158,107,175,128,255,10>>)),

    ?Log(decode(<<129,138,151,143,237,50,246,238,140,83,246,238,140,83, 246,238>>)),

    % 125
    % 'aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeeeffffffffffgggggggggghhhhhhhhhhiiiiiiiiiijjjjjjjjjjkkkkkkkkkkllllllllll12345'
    ?Log(decode(<<129,253,60,232,250,154,93,137,155,251,93,137,155,
                  251,93,137,152,248,94,138,152,248,94,138,152,248,
                  95,139,153,249,95,139,153,249,95,139,158,254,88,
                  140,158,254,88,140,158,254,89,141,159,255,89,141,
                  159,255,89,141,156,252,90,142,156,252,90,142,156,
                  252,91,143,157,253,91,143,157,253,91,143,146,242,
                  84,128,146,242,84,128,146,242,85,129,147,243,85,
                  129,147,243,85,129,144,240,86,130,144,240,86,130,
                  144,240,87,131,145,241,87,131,145,241,87,131,150,
                  246,80,132,150,246,80,132,150,246,13,218,201,174,9>>)),

    % 126
    % 'aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeeeffffffffffgggggggggghhhhhhhhhhiiiiiiiiiijjjjjjjjjjkkkkkkkkkkllllllllll123456'
    ?Log(decode(<<129,254,0,126,228,133,108,232,133,228,13,137,133,
                  228,13,137,133,228,14,138,134,231,14,138,134,231,
                  14,138,135,230,15,139,135,230,15,139,135,230,8,
                  140,128,225,8,140,128,225,8,140,129,224,9,141,129,
                  224,9,141,129,224,10,142,130,227,10,142,130,227,
                  10,142,131,226,11,143,131,226,11,143,131,226,4,
                  128,140,237,4,128,140,237,4,128,141,236,5,129,141,
                  236,5,129,141,236,6,130,142,239,6,130,142,239,6,
                  130,143,238,7,131,143,238,7,131,143,238,0,132,136,
                  233,0,132,136,233,0,132,213,183,95,220,209,179>>)),

    % 127
    % 'aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeeeffffffffffgggggggggghhhhhhhhhhiiiiiiiiiijjjjjjjjjjkkkkkkkkkkllllllllll1234567'
    ?Log(decode(<<129,254,0,127,217,202,129,113,184,171,224,16,184,
                  171,224,16,184,171,227,19,187,168,227,19,187,168,
                  227,19,186,169,226,18,186,169,226,18,186,169,229,
                  21,189,174,229,21,189,174,229,21,188,175,228,20,
                  188,175,228,20,188,175,231,23,191,172,231,23,191,
                  172,231,23,190,173,230,22,190,173,230,22,190,173,
                  233,25,177,162,233,25,177,162,233,25,176,163,232,
                  24,176,163,232,24,176,163,235,27,179,160,235,27,
                  179,160,235,27,178,161,234,26,178,161,234,26,178,
                  161,237,29,181,166,237,29,181,166,237,29,232,248,
                  178,69,236,252,182>>)),

    % 128
    % 'aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeeeffffffffffgggggggggghhhhhhhhhhiiiiiiiiiijjjjjjjjjjkkkkkkkkkkllllllllll12345678'
    ?Log(decode(<<129,254,0,128,60,209,19,175,93,176,114,206,93,176,
      114,206,93,176,113,205,94,179,113,205,94,179,113,
      205,95,178,112,204,95,178,112,204,95,178,119,203,
      88,181,119,203,88,181,119,203,89,180,118,202,89,
      180,118,202,89,180,117,201,90,183,117,201,90,183,
      117,201,91,182,116,200,91,182,116,200,91,182,123,
      199,84,185,123,199,84,185,123,199,85,184,122,198,
      85,184,122,198,85,184,121,197,86,187,121,197,86,
      187,121,197,87,186,120,196,87,186,120,196,87,186,
      127,195,80,189,127,195,80,189,127,195,13,227,32,
      155,9,231,36,151>>)).
