#!/usr/bin/env escript
-module(main).

-mode(compile).
-compile(export_all).

-define(Log(A),                (fun(P) -> io:format("[~p:~p#~p] ~p~n",     [?MODULE, ?FUNCTION_NAME, ?LINE, P]), P end)(A)).
-define(Log(A, B),             io:format("[~p:~p#~p] ~p ~p~n",             [?MODULE, ?FUNCTION_NAME, ?LINE, A, B            ])).
-define(Log(A, B, C),          io:format("[~p:~p#~p] ~p ~p ~p~n",          [?MODULE, ?FUNCTION_NAME, ?LINE, A, B, C         ])).
-define(Log(A, B, C, D),       io:format("[~p:~p#~p] ~p ~p ~p ~p~n",       [?MODULE, ?FUNCTION_NAME, ?LINE, A, B, C, D      ])).
-define(Log(A, B, C, D, E),    io:format("[~p:~p#~p] ~p ~p ~p ~p ~p~n",    [?MODULE, ?FUNCTION_NAME, ?LINE, A, B, C, D, E   ])).
-define(Log(A, B, C, D, E, F), io:format("[~p:~p#~p] ~p ~p ~p ~p ~p ~p~n", [?MODULE, ?FUNCTION_NAME, ?LINE, A, B, C, D, E, F])).






















main(_) ->
    appendix_a(),
    ok.








% [0,0,0,0,0,0,0,0]
% |-mt--|-ai------|
%  0 0 0 1 1 1 1 1 = 0x1f
%
% well_formed (breakable = false) {
%   // process initial bytes
%   initial_byte = uint(take(1));
%   major_type = initial_byte >> 5;
%   val = additional_info = initial_byte & 0x1f;
%   switch (additional_info) {
%     case 24: val = uint(take(1)); break;
%     case 25: val = uint(take(2)); break;
%     case 26: val = uint(take(4)); break;
%     case 27: val = uint(take(8)); break;
%     case 28: case 29: case 30: fadditional_infol();
%     case 31:
%       return well_formed_indefinite(major_type, breakable);
%   }
%   // process content
%   switch (major_type) {
%     // case 0, 1, 7 do not have content; just use val
%     case 2: case 3: take(val); break; // bytes/UTF-8
%     case 4: for (i = 0; i < val; i++) well_formed(); break;
%     case 5: for (i = 0; i < val*2; i++) well_formed(); break;
%     case 6: well_formed(); break;     // 1 embedded data item
%   }
%   return major_type;                    // finite data item
% }
%
% well_formed_indefinite(major_type, breakable) {
%   switch (major_type) {
%     case 2: case 3:
%       while ((it = well_formed(true)) != -1)
%         if (it != major_type)           // need finite embedded
%           fadditional_infol();               //    of same type
%       break;
%     case 4: while (well_formed(true) != -1); break;
%     case 5: while (well_formed(true) != -1) well_formed(); break;
%     case 7:
%       if (breakable)
%         return -1;              // signal break out
%       else fadditional_infol();              // no enclosing indefinite
%     default: fadditional_infol();            // wrong major_type
%   }
%   return 0;                     // no break out
% }
%
% Figure 1: Pseudocode for Well-Formedness Check




%% Major type 0:  an unsigned integer.

% The 5-bit additional information is either the integer itself
% (for additional information values 0 through 23) or the length of additional data.
decode(<<0:3,       V:5,  Rest/binary>>) when (V < 24) -> {V, Rest};
decode(<<0:3, 24:5, V:8,  Rest/binary>>)               -> {V, Rest}; % 24 = uint8_t
decode(<<0:3, 25:5, V:16, Rest/binary>>)               -> {V, Rest}; % 25 = uint16_t
decode(<<0:3, 26:5, V:32, Rest/binary>>)               -> {V, Rest}; % 26 = uint32_t
decode(<<0:3, 27:5, V:64, Rest/binary>>)               -> {V, Rest}; % 27 = uint64_t


%% Major type 1:  a negative integer.

% The encoding follows the rules for unsigned integers (major type 0),
% except that the value is then -1 minus the encoded unsigned integer.
decode(<<1:3,       V:5,  Rest/binary>>) when (V < 24) -> {-1 - V, Rest};
decode(<<1:3, 24:5, V:8,  Rest/binary>>)               -> {-1 - V, Rest};
decode(<<1:3, 25:5, V:16, Rest/binary>>)               -> {-1 - V, Rest};
decode(<<1:3, 26:5, V:32, Rest/binary>>)               -> {-1 - V, Rest};
decode(<<1:3, 27:5, V:64, Rest/binary>>)               -> {-1 - V, Rest};


%% Major type 2:  a byte string.

% The string's length in bytes is represented following the rules for positive integers (major type 0).
% For example, a byte string whose length is 5 would have an initial byte of
% 0b010_00101 (major type 2, additional information 5 for the length), % followed by 5 bytes of binary content.
decode(<<2:3,       L:5,  V:L/binary, Rest/binary>>) when (L < 24) -> {V, Rest};
decode(<<2:3, 24:5, L:8,  V:L/binary, Rest/binary>>)               -> {V, Rest};
decode(<<2:3, 25:5, L:16, V:L/binary, Rest/binary>>)               -> {V, Rest};
decode(<<2:3, 26:5, L:32, V:L/binary, Rest/binary>>)               -> {V, Rest};
decode(<<2:3, 27:5, L:64, V:L/binary, Rest/binary>>)               -> {V, Rest};


%% Major type 3:  a text string,

% specifically a string of Unicode characters that is encoded as UTF-8 [RFC3629].
% The format of this type is identical to that of byte strings (major type 2),
% that is, as with major type 2, the length gives the number of bytes.
% This type is provided for systems that need to interpret or display human-readable text,
% and allows the differentiation between unstructured bytes and text that has a specified repertoire and encoding.
% In contrast to formats such as JSON, the Unicode characters in this type are never escaped.
decode(<<3:3,       L:5,  V:L/binary, Rest/binary>>) when (L < 24) -> {binary_to_list(V), Rest};
decode(<<3:3, 24:5, L:8,  V:L/binary, Rest/binary>>)               -> {binary_to_list(V), Rest};
decode(<<3:3, 25:5, L:16, V:L/binary, Rest/binary>>)               -> {binary_to_list(V), Rest};
decode(<<3:3, 26:5, L:32, V:L/binary, Rest/binary>>)               -> {binary_to_list(V), Rest};
decode(<<3:3, 27:5, L:64, V:L/binary, Rest/binary>>)               -> {binary_to_list(V), Rest};


%% Major type 4:  an array of data items.

% Arrays are also called lists, sequences, or tuples.
% The array's length follows the rules for byte strings (major type 2),
% except that the length denotes the number of data items, not the length in bytes that the array takes up.
% Items in an array do not need to all be of the same type.
decode(<<4:3,       L:5,  Rest/binary>>) when (L < 24) -> decode_array(L, Rest, []);
decode(<<4:3, 24:5, L:8,  Rest/binary>>)               -> decode_array(L, Rest, []);
decode(<<4:3, 25:5, L:16, Rest/binary>>)               -> decode_array(L, Rest, []);
decode(<<4:3, 26:5, L:32, Rest/binary>>)               -> decode_array(L, Rest, []);
decode(<<4:3, 27:5, L:64, Rest/binary>>)               -> decode_array(L, Rest, []);


%% Major type 5:  a map of pairs of data items.

% Maps are also called tables, dictionaries, hashes, or objects (in JSON).
% A map is comprised of pairs of data items, each pair consisting of a key that is immediately followed by a value.
% The map's length follows the rules for byte strings (major type 2),
% except that the length denotes the number of pairs,
% not the length in bytes that the map takes up.
decode(<<5:3,       L:5,  Rest/binary>>) when (L < 24) -> decode_map(L, Rest, #{});
decode(<<5:3, 24:5, L:8,  Rest/binary>>)               -> decode_map(L, Rest, #{});
decode(<<5:3, 25:5, L:16, Rest/binary>>)               -> decode_map(L, Rest, #{});
decode(<<5:3, 26:5, L:32, Rest/binary>>)               -> decode_map(L, Rest, #{});
decode(<<5:3, 27:5, L:64, Rest/binary>>)               -> decode_map(L, Rest, #{});


%% Major type 6:  optional semantic tagging of other major types.
%%
decode(<<6:3,       Tag:5,  Rest/binary>>) when (Tag < 24) -> decode_tag(Tag, Rest);
decode(<<6:3, 24:5, Tag:8,  Rest/binary>>)                 -> decode_tag(Tag, Rest);
decode(<<6:3, 25:5, Tag:16, Rest/binary>>)                 -> decode_tag(Tag, Rest);
decode(<<6:3, 26:5, Tag:32, Rest/binary>>)                 -> decode_tag(Tag, Rest);
decode(<<6:3, 27:5, Tag:64, Rest/binary>>)                 -> decode_tag(Tag, Rest);


%% Major type 7:  floating-point numbers and simple data types that need no content,
%% as well as the "break" stop code.
decode(<<7:3,  V:5,      Rest/binary>>) when (V < 20) -> {{simple, V}, Rest};
decode(<<7:3, 20:5,      Rest/binary>>)               -> {false,       Rest};
decode(<<7:3, 21:5,      Rest/binary>>)               -> {true,        Rest};
decode(<<7:3, 22:5,      Rest/binary>>)               -> {null,        Rest};
decode(<<7:3, 23:5,      Rest/binary>>)               -> {undefined,   Rest};
decode(<<7:3, 24:5, V:8, Rest/binary>>)               -> {{simple, V}, Rest};

% TODO:
decode(<<7:3, 25:5,   Half:16/float, Rest/binary>>) -> not_supported;


decode(<<7:3, 26:5, 16#7f800000:32,  Rest/binary>>) -> {{single, infinity}, Rest};
decode(<<7:3, 26:5, 16#ff800000:32,  Rest/binary>>) -> {{single, '-infinity'}, Rest};
decode(<<7:3, 26:5, 16#ff:9, _:23,   Rest/binary>>) -> {{single, nan}, Rest};
decode(<<7:3, 26:5, Single:32/float, Rest/binary>>) -> {{single, Single}, Rest};

decode(<<7:3, 27:5, 16#7ff0000000000000:64, Rest/binary>>) -> {{double, infinity}, Rest};
decode(<<7:3, 27:5, 16#fff0000000000000:64, Rest/binary>>) -> {{double, '-infinity'}, Rest};
decode(<<7:3, 27:5, 16#7ff:12, _:52,        Rest/binary>>) -> {{double, nan}, Rest};
decode(<<7:3, 27:5,        Double:64/float, Rest/binary>>) -> {{double, Double}, Rest};

decode(<<X:3, Y:5, Rest/binary>>) ->
    ?Log(X, Y, Rest),
    ok;

decode(Bin) ->
    ok.




decode_array(0, Bin, Acc) ->
    {lists:reverse(Acc), Bin};
decode_array(L, Bin, Acc) ->
    {V, Rest} = decode(Bin),
    decode_array(L-1, Rest, [V|Acc]).

decode_map(0, Bin, Acc) ->
    {Acc, Bin};
decode_map(L, Bin, Acc) ->
    {Key,  _Rest} = decode(Bin),
    {Value, Rest} = decode(_Rest),
    decode_map(L-1, Rest, Acc#{Key => Value}).



decode_tag(2, Bin) -> % bignum
    {V, Rest} = decode(Bin),
    L = byte_size(V)*8,
    <<Big:L>> = V,
    {{2,Big}, Rest};



decode_tag(Tag, Bin) ->
    {V, Rest} = decode(Bin),
    {{Tag, V}, Rest}.




appendix_a() ->
    % Appendix A.  Examples
    {                   0, <<>>}  = ?Log(decode(binary:encode_unsigned(16#00))),
    {                   1, <<>>}  = ?Log(decode(binary:encode_unsigned(16#01))),
    {                  10, <<>>}  = ?Log(decode(binary:encode_unsigned(16#0a))),
    {                  23, <<>>}  = ?Log(decode(binary:encode_unsigned(16#17))),
    {                  24, <<>>}  = ?Log(decode(binary:encode_unsigned(16#1818))),
    {                  25, <<>>}  = ?Log(decode(binary:encode_unsigned(16#1819))),
    {                 100, <<>>}  = ?Log(decode(binary:encode_unsigned(16#1864))),
    {                1000, <<>>}  = ?Log(decode(binary:encode_unsigned(16#1903e8))),
    {             1000000, <<>>}  = ?Log(decode(binary:encode_unsigned(16#1a000f4240))),
    {       1000000000000, <<>>}  = ?Log(decode(binary:encode_unsigned(16#1b000000e8d4a51000))),
    {18446744073709551615, <<>>}  = ?Log(decode(binary:encode_unsigned(16#1bffffffffffffffff))),
    {{2,18446744073709551616}, <<>>}  = ?Log(decode(binary:encode_unsigned(16#c249010000000000000000))),
    {-18446744073709551616, <<>>} = ?Log(decode(binary:encode_unsigned(16#3bffffffffffffffff))),
    %{-18446744073709551617, <<>>} = ?Log(decode(binary:encode_unsigned(16#c349010000000000000000))),
    {   -1, <<>>} = ?Log(decode(binary:encode_unsigned(16#20))),
    {  -10, <<>>} = ?Log(decode(binary:encode_unsigned(16#29))),
    { -100, <<>>} = ?Log(decode(binary:encode_unsigned(16#3863))),
    {-1000, <<>>} = ?Log(decode(binary:encode_unsigned(16#3903e7))),


    %% half: unsupported
    % {0.0,                    <<>>} = ?Log(decode(binary:encode_unsigned(16#f90000))),
    % {-0.0,                   <<>>} = ?Log(decode(binary:encode_unsigned(16#f98000))),
    % {1.0,                    <<>>} = ?Log(decode(binary:encode_unsigned(16#f93c00))),
    % {1.5,                    <<>>} = ?Log(decode(binary:encode_unsigned(16#f93e00))),
    % {65504.0,                <<>>} = ?Log(decode(binary:encode_unsigned(16#f97bff))),
    % {5.960464477539063e-8,   <<>>} = ?Log(decode(binary:encode_unsigned(16#f90001))),
    % {0.00006103515625,       <<>>} = ?Log(decode(binary:encode_unsigned(16#f90400))),
    % {-4.0,                   <<>>} = ?Log(decode(binary:encode_unsigned(16#f9c400))),
    % {infinity,               <<>>} = ?Log(decode(binary:encode_unsigned(16#f97c00))),
    % {nan,                    <<>>} = ?Log(decode(binary:encode_unsigned(16#f97e00))),
    % {-infinity,              <<>>} = ?Log(decode(binary:encode_unsigned(16#f9fc00))),
    {{single, 100000.0},               <<>>} = ?Log(decode(binary:encode_unsigned(16#fa47c35000))),
    {{single, 3.4028234663852886e+38}, <<>>} = ?Log(decode(binary:encode_unsigned(16#fa7f7fffff))),
    {{double, 1.1},                    <<>>} = ?Log(decode(binary:encode_unsigned(16#fb3ff199999999999a))),
    {{double, 1.0e300},                <<>>} = ?Log(decode(binary:encode_unsigned(16#fb7e37e43c8800759c))),
    {{double, -4.1},                   <<>>} = ?Log(decode(binary:encode_unsigned(16#fbc010666666666666))),

    {{single, infinity},    <<>>} = ?Log(decode(binary:encode_unsigned(16#fa7f800000))),
    {{single, nan},         <<>>} = ?Log(decode(binary:encode_unsigned(16#fa7fc00000))),
    {{single, '-infinity'}, <<>>} = ?Log(decode(binary:encode_unsigned(16#faff800000))),
    {{double, infinity},    <<>>} = ?Log(decode(binary:encode_unsigned(16#fb7ff0000000000000))),
    {{double, nan},         <<>>} = ?Log(decode(binary:encode_unsigned(16#fb7ff8000000000000))),
    {{double, '-infinity'}, <<>>} = ?Log(decode(binary:encode_unsigned(16#fbfff0000000000000))),

    {false,         <<>>} = ?Log(decode(binary:encode_unsigned(16#f4))),
    {true,          <<>>} = ?Log(decode(binary:encode_unsigned(16#f5))),
    {null,          <<>>} = ?Log(decode(binary:encode_unsigned(16#f6))),
    {undefined,     <<>>} = ?Log(decode(binary:encode_unsigned(16#f7))),
    {{simple,  16}, <<>>} = ?Log(decode(binary:encode_unsigned(16#f0))),
    {{simple,  24}, <<>>} = ?Log(decode(binary:encode_unsigned(16#f818))),
    {{simple, 255}, <<>>} = ?Log(decode(binary:encode_unsigned(16#f8ff))),

    {{0, "2013-03-21T20:04:00Z"}, <<>>} = ?Log(decode(binary:encode_unsigned(16#c074323031332d30332d32315432303a30343a30305a))),
    {{1, 1363896240            }, <<>>} = ?Log(decode(binary:encode_unsigned(16#c11a514b67b0))),
    {{1, {double, 1363896240.5}}, <<>>} = ?Log(decode(binary:encode_unsigned(16#c1fb41d452d9ec200000))),
    {{23, <<1,2,3,4>>},                       <<>>} = ?Log(decode(binary:encode_unsigned(16#d74401020304))),
    {{24, <<16#64,16#49,16#45,16#54,16#46>>}, <<>>} = ?Log(decode(binary:encode_unsigned(16#d818456449455446))),
    {{32, "http://www.example.com"},          <<>>} = ?Log(decode(binary:encode_unsigned(16#d82076687474703a2f2f7777772e6578616d706c652e636f6d))),

    {<<>>,                <<>>} = ?Log(decode(binary:encode_unsigned(16#40))),
    {<<1,2,3,4>>,         <<>>} = ?Log(decode(binary:encode_unsigned(16#4401020304))),
    {"",              <<>>} = ?Log(decode(binary:encode_unsigned(16#60))),
    {"a",             <<>>} = ?Log(decode(binary:encode_unsigned(16#6161))),
    {"IETF",          <<>>} = ?Log(decode(binary:encode_unsigned(16#6449455446))),
    {"\"\\",          <<>>} = ?Log(decode(binary:encode_unsigned(16#62225c))),
    %{[<<16#00fc/utf8>>],    <<>>} = ?Log(decode(binary:encode_unsigned(16#62c3bc))),
    %{[<<16#6c34/utf8>>],    <<>>} = ?Log(decode(binary:encode_unsigned(16#63e6b0b4))),
    {[240,144,133,145], <<>>} = ?Log(decode(binary:encode_unsigned(16#64f0908591))),
    {[],                  <<>>} = ?Log(decode(binary:encode_unsigned(16#80))),
    {[1, 2, 3],           <<>>} = ?Log(decode(binary:encode_unsigned(16#83010203))),
    {[1, [2, 3], [4, 5]], <<>>} = ?Log(decode(binary:encode_unsigned(16#8301820203820405))),

    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
     <<>>} = ?Log(decode(binary:encode_unsigned(16#98190102030405060708090a0b0c0d0e0f101112131415161718181819))),

    {#{},                   <<>>} = ?Log(decode(binary:encode_unsigned(16#a0))),
    {#{1:=2, 3:=4},         <<>>} = ?Log(decode(binary:encode_unsigned(16#a201020304))),
    {#{"a":=1, "b":=[2,3]}, <<>>} = ?Log(decode(binary:encode_unsigned(16#a26161016162820203))),
    {["a", #{"b":="c"}],    <<>>} = ?Log(decode(binary:encode_unsigned(16#826161a161626163))),
    {#{"a" := "A", "b" := "B",
       "c" := "C", "d" := "D",
       "e" := "E"}, <<>>} = ?Log(decode(binary:encode_unsigned(16#a56161614161626142616361436164614461656145))),





   %  (_ h'0102', h'030405')       = ?Log(decode(binary:encode_unsigned(16#5f42010243030405ff))),
    % (_ "strea", "ming")          = ?Log(decode(binary:encode_unsigned(16#7f657374726561646d696e67ff))),
    % [_ ]                         = ?Log(decode(binary:encode_unsigned(16#9fff))),
    % [_ 1, [2, 3], [_ 4, 5]]      = ?Log(decode(binary:encode_unsigned(16#9f018202039f0405ffff))),
    % [_ 1, [2, 3], [4, 5]]        = ?Log(decode(binary:encode_unsigned(16#9f01820203820405ff))),
    % [1, [2, 3], [_ 4, 5]]        = ?Log(decode(binary:encode_unsigned(16#83018202039f0405ff))),
    % [1, [_ 2, 3], [4, 5]]        = ?Log(decode(binary:encode_unsigned(16#83019f0203ff820405))),
    % [_ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25] 0x9f0102030405060708090a0b0c0d0e0f101112131415161718181819ff
    % {_ "a": 1, "b": [_ 2, 3]}    = ?Log(decode(binary:encode_unsigned(16#bf61610161629f0203ffff))),
    % ["a", {_ "b": "c"}]          = ?Log(decode(binary:encode_unsigned(16#826161bf61626163ff))),
    % {_ "Fun": true, "Amt": -2}   = ?Log(decode(binary:encode_unsigned(16#bf6346756ef563416d7421ff))),

    ok.
