-module(ws_SUITE).
-export([
         all/0,
         suite/0,
         groups/0,
         init_per_suite/1,
         end_per_suite/1,
         init_per_group/2,
         end_per_group/2,
         init_per_testcase/2,
         end_per_testcase/2
        ]).

-include_lib("common_test/include/ct.hrl").
-include("../src/logger.hrl").
-include("../src/ws.hrl").

suite() ->
    TimeTrap = (ct:get_config({ct, timetrap})),
    [TimeTrap].

init_per_suite(_Config) ->
    _Config.

end_per_suite(_Config) ->
    ok.

init_per_group(_GroupName, _Config) ->
    _Config.

end_per_group(_GroupName, _Config) ->
    ok.

init_per_testcase(_TestCase, _Config) ->
    _Config.

end_per_testcase(_TestCase, _Config) ->
    ok.

all() ->
    [
     {group, success}
    ].

%% parallel: run on separate process
%% shuffle: execute random
%% shuffle, sequence: stop when fail
groups() ->
    [
     {
      success,
      [parallel],
      [
       opcode,
       encode
       % TODO: decode
      ]
     }
    ].


%% ===================================================================
%% Suite
%% ===================================================================
opcode(_) ->
    ?CONTINUATION_FRAME       = ws_packet:opcode(continuation_frame),
    ?TEXT_FRAME               = ws_packet:opcode(text_frame),
    ?BINARY_FRAME             = ws_packet:opcode(binary_frame),
    ?RESERVED_NON_CONTROL1    = ws_packet:opcode(reserved_non_control1),
    ?RESERVED_NON_CONTROL2    = ws_packet:opcode(reserved_non_control2),
    ?RESERVED_NON_CONTROL3    = ws_packet:opcode(reserved_non_control3),
    ?RESERVED_NON_CONTROL4    = ws_packet:opcode(reserved_non_control4),
    ?RESERVED_NON_CONTROL5    = ws_packet:opcode(reserved_non_control5),
    ?CONNECTION_CLOSE         = ws_packet:opcode(connection_close),
    ?PING                     = ws_packet:opcode(ping),
    ?PONG                     = ws_packet:opcode(pong),
    ?RESERVED_CONTROL_FRAMES1 = ws_packet:opcode(reserved_control_frames1),
    ?RESERVED_CONTROL_FRAMES2 = ws_packet:opcode(reserved_control_frames2),
    ?RESERVED_CONTROL_FRAMES3 = ws_packet:opcode(reserved_control_frames3),
    ?RESERVED_CONTROL_FRAMES4 = ws_packet:opcode(reserved_control_frames4),
    ?RESERVED_CONTROL_FRAMES5 = ws_packet:opcode(reserved_control_frames5),

    continuation_frame        = ws_packet:opcode(?CONTINUATION_FRAME),
    text_frame                = ws_packet:opcode(?TEXT_FRAME),
    binary_frame              = ws_packet:opcode(?BINARY_FRAME),
    reserved_non_control1     = ws_packet:opcode(?RESERVED_NON_CONTROL1),
    reserved_non_control2     = ws_packet:opcode(?RESERVED_NON_CONTROL2),
    reserved_non_control3     = ws_packet:opcode(?RESERVED_NON_CONTROL3),
    reserved_non_control4     = ws_packet:opcode(?RESERVED_NON_CONTROL4),
    reserved_non_control5     = ws_packet:opcode(?RESERVED_NON_CONTROL5),
    connection_close          = ws_packet:opcode(?CONNECTION_CLOSE),
    ping                      = ws_packet:opcode(?PING),
    pong                      = ws_packet:opcode(?PONG),
    reserved_control_frames1  = ws_packet:opcode(?RESERVED_CONTROL_FRAMES1),
    reserved_control_frames2  = ws_packet:opcode(?RESERVED_CONTROL_FRAMES2),
    reserved_control_frames3  = ws_packet:opcode(?RESERVED_CONTROL_FRAMES3),
    reserved_control_frames4  = ws_packet:opcode(?RESERVED_CONTROL_FRAMES4),
    reserved_control_frames5  = ws_packet:opcode(?RESERVED_CONTROL_FRAMES5),
    ok.


%%--------------------------------------------------------------------
%% RFC7230
%%--------------------------------------------------------------------
encode(_Config) ->
    E1 = <<16#81, 16#00>>,
    E1 = (ws_packet:encode(#{
            opcode  => text_frame,
            mask    => false,
            fin     => true
           }, <<>>)),

    E2 = <<16#81, 16#03, 16#61, 16#61, 16#61>>,
    E2 = (ws_packet:encode(#{
            opcode  => text_frame,
            mask    => false,
            fin     => true
           }, <<"aaa">>)),


    E3 = <<
           16#81, 16#0a, 16#61, 16#61, 16#61, 16#61, 16#61, 16#61,
           16#61, 16#61, 16#61, 16#61
         >>,
    E3 = (ws_packet:encode(#{
            opcode  => text_frame,
            mask    => false,
            fin     => true
           }, <<"aaaaaaaaaa">>)),

    E4 = <<
           16#81, 16#7d, 16#61, 16#61, 16#61, 16#61, 16#61, 16#61,
           16#61, 16#61, 16#61, 16#61, 16#62, 16#62, 16#62, 16#62,
           16#62, 16#62, 16#62, 16#62, 16#62, 16#62, 16#63, 16#63,
           16#63, 16#63, 16#63, 16#63, 16#63, 16#63, 16#63, 16#63,
           16#64, 16#64, 16#64, 16#64, 16#64, 16#64, 16#64, 16#64,
           16#64, 16#64, 16#65, 16#65, 16#65, 16#65, 16#65, 16#65,
           16#65, 16#65, 16#65, 16#65, 16#66, 16#66, 16#66, 16#66,
           16#66, 16#66, 16#66, 16#66, 16#66, 16#66, 16#67, 16#67,
           16#67, 16#67, 16#67, 16#67, 16#67, 16#67, 16#67, 16#67,
           16#68, 16#68, 16#68, 16#68, 16#68, 16#68, 16#68, 16#68,
           16#68, 16#68, 16#69, 16#69, 16#69, 16#69, 16#69, 16#69,
           16#69, 16#69, 16#69, 16#69, 16#6a, 16#6a, 16#6a, 16#6a,
           16#6a, 16#6a, 16#6a, 16#6a, 16#6a, 16#6a, 16#6b, 16#6b,
           16#6b, 16#6b, 16#6b, 16#6b, 16#6b, 16#6b, 16#6b, 16#6b,
           16#6c, 16#6c, 16#6c, 16#6c, 16#6c, 16#6c, 16#6c, 16#6c,
           16#6c, 16#6c, 16#31, 16#32, 16#33, 16#34, 16#35
         >>,
    E4 = (ws_packet:encode(#{
            opcode  => text_frame,
            mask    => false,
            fin     => true
           }, <<"aaaaaaaaaa"
                "bbbbbbbbbb"
                "cccccccccc"
                "dddddddddd"
                "eeeeeeeeee"
                "ffffffffff"
                "gggggggggg"
                "hhhhhhhhhh"
                "iiiiiiiiii"
                "jjjjjjjjjj"
                "kkkkkkkkkk"
                "llllllllll"
                "12345">>)),


    E5 = <<
           16#81, 16#7e, 16#00, 16#7e, 16#61, 16#61, 16#61, 16#61,
           16#61, 16#61, 16#61, 16#61, 16#61, 16#61, 16#62, 16#62,
           16#62, 16#62, 16#62, 16#62, 16#62, 16#62, 16#62, 16#62,
           16#63, 16#63, 16#63, 16#63, 16#63, 16#63, 16#63, 16#63,
           16#63, 16#63, 16#64, 16#64, 16#64, 16#64, 16#64, 16#64,
           16#64, 16#64, 16#64, 16#64, 16#65, 16#65, 16#65, 16#65,
           16#65, 16#65, 16#65, 16#65, 16#65, 16#65, 16#66, 16#66,
           16#66, 16#66, 16#66, 16#66, 16#66, 16#66, 16#66, 16#66,
           16#67, 16#67, 16#67, 16#67, 16#67, 16#67, 16#67, 16#67,
           16#67, 16#67, 16#68, 16#68, 16#68, 16#68, 16#68, 16#68,
           16#68, 16#68, 16#68, 16#68, 16#69, 16#69, 16#69, 16#69,
           16#69, 16#69, 16#69, 16#69, 16#69, 16#69, 16#6a, 16#6a,
           16#6a, 16#6a, 16#6a, 16#6a, 16#6a, 16#6a, 16#6a, 16#6a,
           16#6b, 16#6b, 16#6b, 16#6b, 16#6b, 16#6b, 16#6b, 16#6b,
           16#6b, 16#6b, 16#6c, 16#6c, 16#6c, 16#6c, 16#6c, 16#6c,
           16#6c, 16#6c, 16#6c, 16#6c, 16#31, 16#32, 16#33, 16#34,
           16#35, 16#36
         >>,
    E5 = (ws_packet:encode(#{
            opcode  => text_frame,
            mask    => false,
            fin     => true
           }, <<"aaaaaaaaaa"
                "bbbbbbbbbb"
                "cccccccccc"
                "dddddddddd"
                "eeeeeeeeee"
                "ffffffffff"
                "gggggggggg"
                "hhhhhhhhhh"
                "iiiiiiiiii"
                "jjjjjjjjjj"
                "kkkkkkkkkk"
                "llllllllll"
                "123456">>)),

    E6 = <<
           16#81, 16#7e, 16#00, 16#7f, 16#61, 16#61, 16#61, 16#61,
           16#61, 16#61, 16#61, 16#61, 16#61, 16#61, 16#62, 16#62,
           16#62, 16#62, 16#62, 16#62, 16#62, 16#62, 16#62, 16#62,
           16#63, 16#63, 16#63, 16#63, 16#63, 16#63, 16#63, 16#63,
           16#63, 16#63, 16#64, 16#64, 16#64, 16#64, 16#64, 16#64,
           16#64, 16#64, 16#64, 16#64, 16#65, 16#65, 16#65, 16#65,
           16#65, 16#65, 16#65, 16#65, 16#65, 16#65, 16#66, 16#66,
           16#66, 16#66, 16#66, 16#66, 16#66, 16#66, 16#66, 16#66,
           16#67, 16#67, 16#67, 16#67, 16#67, 16#67, 16#67, 16#67,
           16#67, 16#67, 16#68, 16#68, 16#68, 16#68, 16#68, 16#68,
           16#68, 16#68, 16#68, 16#68, 16#69, 16#69, 16#69, 16#69,
           16#69, 16#69, 16#69, 16#69, 16#69, 16#69, 16#6a, 16#6a,
           16#6a, 16#6a, 16#6a, 16#6a, 16#6a, 16#6a, 16#6a, 16#6a,
           16#6b, 16#6b, 16#6b, 16#6b, 16#6b, 16#6b, 16#6b, 16#6b,
           16#6b, 16#6b, 16#6c, 16#6c, 16#6c, 16#6c, 16#6c, 16#6c,
           16#6c, 16#6c, 16#6c, 16#6c, 16#31, 16#32, 16#33, 16#34,
           16#35, 16#36, 16#37
         >>,
    E6 = (ws_packet:encode(#{
            opcode  => text_frame,
            mask    => false,
            fin     => true
           }, <<"aaaaaaaaaa"
                "bbbbbbbbbb"
                "cccccccccc"
                "dddddddddd"
                "eeeeeeeeee"
                "ffffffffff"
                "gggggggggg"
                "hhhhhhhhhh"
                "iiiiiiiiii"
                "jjjjjjjjjj"
                "kkkkkkkkkk"
                "llllllllll"
                "1234567">>)),

    E7 = <<
           16#81, 16#7e, 16#00, 16#80, 16#61, 16#61, 16#61, 16#61,
           16#61, 16#61, 16#61, 16#61, 16#61, 16#61, 16#62, 16#62,
           16#62, 16#62, 16#62, 16#62, 16#62, 16#62, 16#62, 16#62,
           16#63, 16#63, 16#63, 16#63, 16#63, 16#63, 16#63, 16#63,
           16#63, 16#63, 16#64, 16#64, 16#64, 16#64, 16#64, 16#64,
           16#64, 16#64, 16#64, 16#64, 16#65, 16#65, 16#65, 16#65,
           16#65, 16#65, 16#65, 16#65, 16#65, 16#65, 16#66, 16#66,
           16#66, 16#66, 16#66, 16#66, 16#66, 16#66, 16#66, 16#66,
           16#67, 16#67, 16#67, 16#67, 16#67, 16#67, 16#67, 16#67,
           16#67, 16#67, 16#68, 16#68, 16#68, 16#68, 16#68, 16#68,
           16#68, 16#68, 16#68, 16#68, 16#69, 16#69, 16#69, 16#69,
           16#69, 16#69, 16#69, 16#69, 16#69, 16#69, 16#6a, 16#6a,
           16#6a, 16#6a, 16#6a, 16#6a, 16#6a, 16#6a, 16#6a, 16#6a,
           16#6b, 16#6b, 16#6b, 16#6b, 16#6b, 16#6b, 16#6b, 16#6b,
           16#6b, 16#6b, 16#6c, 16#6c, 16#6c, 16#6c, 16#6c, 16#6c,
           16#6c, 16#6c, 16#6c, 16#6c, 16#31, 16#32, 16#33, 16#34,
           16#35, 16#36, 16#37, 16#38
         >>,
    E7 = (ws_packet:encode(#{
            opcode  => text_frame,
            mask    => false,
            fin     => true
           }, <<"aaaaaaaaaa"
                "bbbbbbbbbb"
                "cccccccccc"
                "dddddddddd"
                "eeeeeeeeee"
                "ffffffffff"
                "gggggggggg"
                "hhhhhhhhhh"
                "iiiiiiiiii"
                "jjjjjjjjjj"
                "kkkkkkkkkk"
                "llllllllll"
                "12345678">>)),

    ok.


header_payload(Bin) ->
    {<<>>, {}, [Result]} = ws_worker:decode(Bin, {<<>>, {}, []}),
    Result.

decode(_Config) ->
    % ''
    #{ fin := true,
       mask := true,
       opcode := text_frame,
       length := 0,
       payload := <<>>
     } = (header_payload(<<16#81, 16#80, 16#01, 16#19, 16#4b, 16#21>>)),

    % 'aaa'
    #{ fin := true,
       mask := true,
       opcode := text_frame,
       length := 3,
       payload := <<"aaa">>
     } = (header_payload(<<16#81, 16#83, 16#e1, 16#9e, 16#6b, 16#af, 16#80, 16#ff, 16#0a>>)),

    % 'a' * 10
    #{ fin := true,
       mask := true,
       opcode := text_frame,
       length := 10,
       payload := <<"aaaaaaaaaa">>
     } = (header_payload(<<
                           16#81, 16#8a, 16#97, 16#8f, 16#ed, 16#32, 16#f6, 16#ee,
                           16#8c, 16#53, 16#f6, 16#ee, 16#8c, 16#53, 16#f6, 16#ee
                         >>)),

    % 125
    #{ fin := true,
       mask := true,
       opcode := text_frame,
       length := 125,
       payload := <<
                    "aaaaaaaaaa"
                    "bbbbbbbbbb"
                    "cccccccccc"
                    "dddddddddd"
                    "eeeeeeeeee"
                    "ffffffffff"
                    "gggggggggg"
                    "hhhhhhhhhh"
                    "iiiiiiiiii"
                    "jjjjjjjjjj"
                    "kkkkkkkkkk"
                    "llllllllll"
                    "12345"
                  >>
     } = (header_payload(<<
                           16#81, 16#fd, 16#3c, 16#e8, 16#fa, 16#9a, 16#5d, 16#89,
                           16#9b, 16#fb, 16#5d, 16#89, 16#9b, 16#fb, 16#5d, 16#89,
                           16#98, 16#f8, 16#5e, 16#8a, 16#98, 16#f8, 16#5e, 16#8a,
                           16#98, 16#f8, 16#5f, 16#8b, 16#99, 16#f9, 16#5f, 16#8b,
                           16#99, 16#f9, 16#5f, 16#8b, 16#9e, 16#fe, 16#58, 16#8c,
                           16#9e, 16#fe, 16#58, 16#8c, 16#9e, 16#fe, 16#59, 16#8d,
                           16#9f, 16#ff, 16#59, 16#8d, 16#9f, 16#ff, 16#59, 16#8d,
                           16#9c, 16#fc, 16#5a, 16#8e, 16#9c, 16#fc, 16#5a, 16#8e,
                           16#9c, 16#fc, 16#5b, 16#8f, 16#9d, 16#fd, 16#5b, 16#8f,
                           16#9d, 16#fd, 16#5b, 16#8f, 16#92, 16#f2, 16#54, 16#80,
                           16#92, 16#f2, 16#54, 16#80, 16#92, 16#f2, 16#55, 16#81,
                           16#93, 16#f3, 16#55, 16#81, 16#93, 16#f3, 16#55, 16#81,
                           16#90, 16#f0, 16#56, 16#82, 16#90, 16#f0, 16#56, 16#82,
                           16#90, 16#f0, 16#57, 16#83, 16#91, 16#f1, 16#57, 16#83,
                           16#91, 16#f1, 16#57, 16#83, 16#96, 16#f6, 16#50, 16#84,
                           16#96, 16#f6, 16#50, 16#84, 16#96, 16#f6, 16#0d, 16#da,
                           16#c9, 16#ae, 16#09
                         >>)),

    % 126
    #{ fin := true,
       mask := true,
       opcode := text_frame,
       length := 126,
       payload := <<"aaaaaaaaaa"
                    "bbbbbbbbbb"
                    "cccccccccc"
                    "dddddddddd"
                    "eeeeeeeeee"
                    "ffffffffff"
                    "gggggggggg"
                    "hhhhhhhhhh"
                    "iiiiiiiiii"
                    "jjjjjjjjjj"
                    "kkkkkkkkkk"
                    "llllllllll"
                    "123456">>
     } = (header_payload(<<
                           16#81, 16#fe, 16#00, 16#7e, 16#e4, 16#85, 16#6c, 16#e8,
                           16#85, 16#e4, 16#0d, 16#89, 16#85, 16#e4, 16#0d, 16#89,
                           16#85, 16#e4, 16#0e, 16#8a, 16#86, 16#e7, 16#0e, 16#8a,
                           16#86, 16#e7, 16#0e, 16#8a, 16#87, 16#e6, 16#0f, 16#8b,
                           16#87, 16#e6, 16#0f, 16#8b, 16#87, 16#e6, 16#08, 16#8c,
                           16#80, 16#e1, 16#08, 16#8c, 16#80, 16#e1, 16#08, 16#8c,
                           16#81, 16#e0, 16#09, 16#8d, 16#81, 16#e0, 16#09, 16#8d,
                           16#81, 16#e0, 16#0a, 16#8e, 16#82, 16#e3, 16#0a, 16#8e,
                           16#82, 16#e3, 16#0a, 16#8e, 16#83, 16#e2, 16#0b, 16#8f,
                           16#83, 16#e2, 16#0b, 16#8f, 16#83, 16#e2, 16#04, 16#80,
                           16#8c, 16#ed, 16#04, 16#80, 16#8c, 16#ed, 16#04, 16#80,
                           16#8d, 16#ec, 16#05, 16#81, 16#8d, 16#ec, 16#05, 16#81,
                           16#8d, 16#ec, 16#06, 16#82, 16#8e, 16#ef, 16#06, 16#82,
                           16#8e, 16#ef, 16#06, 16#82, 16#8f, 16#ee, 16#07, 16#83,
                           16#8f, 16#ee, 16#07, 16#83, 16#8f, 16#ee, 16#00, 16#84,
                           16#88, 16#e9, 16#00, 16#84, 16#88, 16#e9, 16#00, 16#84,
                           16#d5, 16#b7, 16#5f, 16#dc, 16#d1, 16#b3
                         >>)),

    % 127
    #{ fin := true,
       mask := true,
       opcode := text_frame,
       length := 127,
       payload := <<"aaaaaaaaaa"
                    "bbbbbbbbbb"
                    "cccccccccc"
                    "dddddddddd"
                    "eeeeeeeeee"
                    "ffffffffff"
                    "gggggggggg"
                    "hhhhhhhhhh"
                    "iiiiiiiiii"
                    "jjjjjjjjjj"
                    "kkkkkkkkkk"
                    "llllllllll"
                    "1234567">>
     } = (header_payload(<<
                           16#81, 16#fe, 16#00, 16#7f, 16#d9, 16#ca, 16#81, 16#71,
                           16#b8, 16#ab, 16#e0, 16#10, 16#b8, 16#ab, 16#e0, 16#10,
                           16#b8, 16#ab, 16#e3, 16#13, 16#bb, 16#a8, 16#e3, 16#13,
                           16#bb, 16#a8, 16#e3, 16#13, 16#ba, 16#a9, 16#e2, 16#12,
                           16#ba, 16#a9, 16#e2, 16#12, 16#ba, 16#a9, 16#e5, 16#15,
                           16#bd, 16#ae, 16#e5, 16#15, 16#bd, 16#ae, 16#e5, 16#15,
                           16#bc, 16#af, 16#e4, 16#14, 16#bc, 16#af, 16#e4, 16#14,
                           16#bc, 16#af, 16#e7, 16#17, 16#bf, 16#ac, 16#e7, 16#17,
                           16#bf, 16#ac, 16#e7, 16#17, 16#be, 16#ad, 16#e6, 16#16,
                           16#be, 16#ad, 16#e6, 16#16, 16#be, 16#ad, 16#e9, 16#19,
                           16#b1, 16#a2, 16#e9, 16#19, 16#b1, 16#a2, 16#e9, 16#19,
                           16#b0, 16#a3, 16#e8, 16#18, 16#b0, 16#a3, 16#e8, 16#18,
                           16#b0, 16#a3, 16#eb, 16#1b, 16#b3, 16#a0, 16#eb, 16#1b,
                           16#b3, 16#a0, 16#eb, 16#1b, 16#b2, 16#a1, 16#ea, 16#1a,
                           16#b2, 16#a1, 16#ea, 16#1a, 16#b2, 16#a1, 16#ed, 16#1d,
                           16#b5, 16#a6, 16#ed, 16#1d, 16#b5, 16#a6, 16#ed, 16#1d,
                           16#e8, 16#f8, 16#b2, 16#45, 16#ec, 16#fc, 16#b6
                         >>)),

    % 128
    #{ fin := true,
       mask := true,
       opcode := text_frame,
       length := 128,
       payload := <<"aaaaaaaaaa"
                    "bbbbbbbbbb"
                    "cccccccccc"
                    "dddddddddd"
                    "eeeeeeeeee"
                    "ffffffffff"
                    "gggggggggg"
                    "hhhhhhhhhh"
                    "iiiiiiiiii"
                    "jjjjjjjjjj"
                    "kkkkkkkkkk"
                    "llllllllll"
                    "12345678">>
     } = (header_payload(<<
                           16#81, 16#fe, 16#00, 16#80, 16#3c, 16#d1, 16#13, 16#af,
                           16#5d, 16#b0, 16#72, 16#ce, 16#5d, 16#b0, 16#72, 16#ce,
                           16#5d, 16#b0, 16#71, 16#cd, 16#5e, 16#b3, 16#71, 16#cd,
                           16#5e, 16#b3, 16#71, 16#cd, 16#5f, 16#b2, 16#70, 16#cc,
                           16#5f, 16#b2, 16#70, 16#cc, 16#5f, 16#b2, 16#77, 16#cb,
                           16#58, 16#b5, 16#77, 16#cb, 16#58, 16#b5, 16#77, 16#cb,
                           16#59, 16#b4, 16#76, 16#ca, 16#59, 16#b4, 16#76, 16#ca,
                           16#59, 16#b4, 16#75, 16#c9, 16#5a, 16#b7, 16#75, 16#c9,
                           16#5a, 16#b7, 16#75, 16#c9, 16#5b, 16#b6, 16#74, 16#c8,
                           16#5b, 16#b6, 16#74, 16#c8, 16#5b, 16#b6, 16#7b, 16#c7,
                           16#54, 16#b9, 16#7b, 16#c7, 16#54, 16#b9, 16#7b, 16#c7,
                           16#55, 16#b8, 16#7a, 16#c6, 16#55, 16#b8, 16#7a, 16#c6,
                           16#55, 16#b8, 16#79, 16#c5, 16#56, 16#bb, 16#79, 16#c5,
                           16#56, 16#bb, 16#79, 16#c5, 16#57, 16#ba, 16#78, 16#c4,
                           16#57, 16#ba, 16#78, 16#c4, 16#57, 16#ba, 16#7f, 16#c3,
                           16#50, 16#bd, 16#7f, 16#c3, 16#50, 16#bd, 16#7f, 16#c3,
                           16#0d, 16#e3, 16#20, 16#9b, 16#09, 16#e7, 16#24, 16#97
                         >>)),
    ok.
