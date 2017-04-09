\rm -r _build && rebar3 compile &&  erl -pa ebin _build/default/lib/*/ebin -eval 'application:start(http)' -noshell
