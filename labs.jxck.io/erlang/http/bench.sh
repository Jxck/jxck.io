rebar3 compile && erl -pa _build/default/lib/*/ebin -eval 'http_profile:run(),init:stop().' -noshell
