.SUFFIXES: .erl .beam

.erl.beam:
	erlc -W $<

MODS = store server main

all: compile
	erl -boot start_clean -noshell -s main main

compile: ${MODS:%=%.beam}

clean:
	rm -rf *.beam *.dump
