echo "\e[0;105mexec below for connect
\$ nc localhost 3000\e[0m"



erlc tcp_supervisor.erl tcp_worker.erl  && ./main.erl
