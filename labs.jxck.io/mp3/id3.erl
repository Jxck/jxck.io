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
    {ok, IO} = (file:open("mozaic-ep51.mp3", [read, binary])),

    {ok, <<Header:3/bytes,
           Version:2/bytes,
           Flag:1/bytes,
           _:1,
           A:7,
           _:1,
           B:7,
           _:1,
           C:7,
           _:1,
           D:7,
           _/binary>>} = (file:read(IO, 10)),

    <<Size:28/integer>> = <<A:7, B:7, C:7, D:7>>,

    ?Log(
       Header,
       Version,
       Flag,
       Size
      ),

    {ok, Frames} = file:read(IO, Size),
    ?Log(file:read(IO, 10)),

    frame(Frames).


frame(<<
        "APIC",
        _:1,
        A:7,
        _:1,
        B:7,
        _:1,
        C:7,
        _:1,
        D:7,
        F:2/bytes,
        Rest/binary
      >>) ->

    <<Size:28/integer>> = <<A:7, B:7, C:7, D:7>>,

    <<Val:Size/binary, Rest2/binary>> = Rest,

    HeadSize = 20,
    TailSize = 20,
    MidSize = Size - HeadSize - TailSize,

    <<Head:HeadSize/binary, _:MidSize/binary, Tail:TailSize/binary>> = Val,

    ?Log(<<"APIC">>, Head, Tail),


    {ok, File} = (file:read_file("/Users/yusuke/develop/jxck.io/www.jxck.io/assets/img/mozaic.jpeg")),
    Size2 = size(File),
    HeadSize2 = 20,
    TailSize2 = 20,
    MidSize2 = Size2 - HeadSize2 - TailSize2,
    <<Head2:HeadSize2/binary, _:MidSize2/binary, Tail2:TailSize2/binary>> = File,
    ?Log(<<"APIC">>, Head2, Tail2),


    frame(Rest2);

frame(<<
        ID:4/bytes,
        _:1,
        A:7,
        _:1,
        B:7,
        _:1,
        C:7,
        _:1,
        D:7,
        F:2/bytes,
        Rest/binary
      >>) ->

    <<Size:28/integer>> = <<A:7, B:7, C:7, D:7>>,

    case (Size) of
        0    -> frame(Rest);
        Size ->
            <<Val:Size/binary, Rest2/binary>> = Rest,
            ?Log(trim(ID), binary:split(trim(Val), <<0>>)),
            frame(Rest2)
    end;

frame(Rest) ->
    ?Log(Rest).


trim(<<0, 0, 0, 0, Rest/binary>>) ->
    (Rest);
trim(<<0, 0, 0, Rest/binary>>) ->
    (Rest);
trim(<<0, 0, Rest/binary>>) ->
    (Rest);
trim(<<0, Rest/binary>>) ->
    (Rest);
trim(Bin) ->
    (Bin).
