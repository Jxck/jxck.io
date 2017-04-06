-module(main).

-include("../logger.hrl").

-export([
         main/0
        ]).

%% main
start_link() ->
    server:start(store).

save(Key, Value) ->
    server:call(store, {save, {Key, Value}}).

take(Key) ->
    server:call(store, {take, Key}).

main() ->
    ?Log(start_link()),
    ?Log(save(a, 10)),
    ?Log(save(b, 20)),
    ?Log(take(a)),
    ?Log(take(b)).
