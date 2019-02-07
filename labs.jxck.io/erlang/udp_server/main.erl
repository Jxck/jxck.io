#!/usr/bin/env escript
-module(main).
-mode(compile).
-compile(export_all).
-include("logger.hrl").

main([]) ->
    {ok, _}      = sfu_sup:start_link({}),
    {ok, Socket}   = gen_udp:open(3000, [{reuseaddr, true}, {active, false}]),
    {ok, _} = sfu_sup:start_child(#{socket => Socket}),

    PID = whereis(name_from_port(udp_worker, Socket)),
    ok  = gen_tcp:controlling_process(Socket, PID),
    ok  = inet:setopts(Socket, [{active, once}, binary]),

    dump_process(),

    % send udp packet to server and timeout
    timer:sleep(5000),

    dump_process(),

    % block
    receive ok -> ok end.



name_from_port(Module, Socket) ->
    {ok, Port} = (inet:port(Socket)),
    list_to_atom(lists:concat([Module, '_', Port])).

dump_process() ->
    % ignore standard process
    Standards = [
                 application_controller,
                 code_server,
                 erl_prim_loader,
                 erl_signal_server,
                 erts_code_purger,
                 file_server_2,
                 global_group,
                 global_name_server,
                 inet_db,
                 init,
                 kernel_refc,
                 kernel_safe_sup,
                 kernel_sup,
                 logger,
                 logger_handler_watcher,
                 logger_std_h_default,
                 logger_sup,
                 rex,
                 standard_error,
                 standard_error_sup,
                 user
                ],
    Atoms = lists:filter(fun(Name)-> not lists:member(Name, Standards) end, registered()),
    Lists = lists:map(fun(Atom) -> atom_to_list(Atom) end, Atoms),
    Sorted = lists:sort(Lists),
    Joined = lists:join("\n", Sorted),
    io:format("===== process =====~n~s~n===== process =====~n", [Joined]).
