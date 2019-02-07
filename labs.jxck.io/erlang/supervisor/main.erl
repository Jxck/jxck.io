#!/usr/bin/env escript
-module(main).

-mode(compile).
-compile(export_all).
-include("../logger.hrl").

main(_) ->
    ?Log(service_sup:start_link(#{count => 0})),
    {ok, Worker1} = ?Log(service_sup:start_child(#{delta => 2})),
    {ok, Worker2} = ?Log(service_sup:start_child(#{delta => 3})),

    dump_process(),

    ?Log(gen_server:cast(Worker1, incr)),
    ?Log(gen_server:cast(Worker1, incr)),

    ?Log(gen_server:cast(Worker2, incr)),
    ?Log(gen_server:cast(Worker2, incr)),

    ?Log(service_worker:stop(Worker1)),
    ?Log(service_worker:stop(Worker2)),

    receive ok -> ok end.



dump_process() ->
    io:format("~s~n", [(lists:join("\n", lists:sort([atom_to_list(P) || P <- registered()])))]).
