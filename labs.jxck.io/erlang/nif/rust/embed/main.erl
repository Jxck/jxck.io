-module(main).

-export([process/0]).
-on_load(init/0).


init() ->
    ok = erlang:load_nif("./target/release/libembed", 0).

process() ->
    exit(nif_library_not_loaded).
