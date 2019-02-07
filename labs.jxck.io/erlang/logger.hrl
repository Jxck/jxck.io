-define(Log(),                    io:format(standard_error, "[~p ~p:~p#~p]~n",                         [self(), ?MODULE, ?FUNCTION_NAME, ?LINE])).
-define(Log(A),        (fun(P) -> io:format(standard_error, "[~p ~p:~p#~p]~n\t~p~n",                   [self(), ?MODULE, ?FUNCTION_NAME, ?LINE, P]), P end)(A)).
-define(Log(A, B),                io:format(standard_error, "[~p ~p:~p#~p]~n\t~p ~p~n",                [self(), ?MODULE, ?FUNCTION_NAME, ?LINE, A, B               ])).
-define(Log(A, B, C),             io:format(standard_error, "[~p ~p:~p#~p]~n\t~p ~p ~p~n",             [self(), ?MODULE, ?FUNCTION_NAME, ?LINE, A, B, C            ])).
-define(Log(A, B, C, D),          io:format(standard_error, "[~p ~p:~p#~p]~n\t~p ~p ~p ~p~n",          [self(), ?MODULE, ?FUNCTION_NAME, ?LINE, A, B, C, D         ])).
-define(Log(A, B, C, D, E),       io:format(standard_error, "[~p ~p:~p#~p]~n\t~p ~p ~p ~p ~p~n",       [self(), ?MODULE, ?FUNCTION_NAME, ?LINE, A, B, C, D, E      ])).
-define(Log(A, B, C, D, E, F),    io:format(standard_error, "[~p ~p:~p#~p]~n\t~p ~p ~p ~p ~p ~p~n",    [self(), ?MODULE, ?FUNCTION_NAME, ?LINE, A, B, C, D, E, F   ])).
-define(Log(A, B, C, D, E, F, G), io:format(standard_error, "[~p ~p:~p#~p]~n\t~p ~p ~p ~p ~p ~p ~p~n", [self(), ?MODULE, ?FUNCTION_NAME, ?LINE, A, B, C, D, E, F, G])).

-define(DEBUG, {debug, [trace, log, statistics, debug]}).
