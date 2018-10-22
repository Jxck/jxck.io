-module(niftest).

-export([init/0, hello/0]).

init() ->
      erlang:load_nif("./niftest", 0).

hello() ->
      "NIF library not loaded".
