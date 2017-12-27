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

-define(RtoM(Name, Record), lists:foldl(fun({I, E}, Acc) -> Acc#{E => element(I, Record)} end, #{}, lists:zip(lists:seq(2, (record_info(size, Name))), (record_info(fields, Name))))).

-record(pos, {x, y}).

main(_) ->
    Pos    = #pos{x=10, y=20},

    Fields = (record_info(fields, pos)),
    Size   = (record_info(size, pos)),
    List   = lists:zip(lists:seq(2, Size), Fields),
    Map    = lists:foldl(fun({I, E}, Acc) ->
                                 Acc#{E => element(I, Pos)}
                         end, #{}, List),
    ?Log(Map),
    ?Log(?RtoM(pos, Pos)),

    ok.
