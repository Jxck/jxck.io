# UDP Server process architecture PoC

## process arch


```
+---------+
| sfu_sup |
+---------+
   | (s_1_for_1)
   |
   |           (1_for_1)
   |  +---------+     +-------------+
   +--| udp_sup |--+--| udp_worker  |
      +---------+  |  +-------------+
                   |
                   |
                   |  +-------------+
                   +--| dtls_worker |
                   |  +-------------+
                   |
                   |
                   |  +-------------+
                   +--| srtp_worker |
                      +-------------+
```


## how to run


```sh
$ ./main.sh
[<0.78.0> udp_sup:init#22]
	#Port<0.5>
===== process =====
dtls_worker_3000
sfu_sup
srtp_worker_3000
udp_sup_3000
udp_worker_3000
===== process =====


## block here (see next command)


[<0.79.0> udp_worker:listening#52]
	{127,0,0,1} 47282 <<"ping\n">> #Port<0.5>     ## receive udp packet


[<0.79.0> udp_worker:listening#57]
	timeout 1000 #Port<0.5>                       ## timeout


[<0.79.0> udp_worker:terminate#31]
	normal listening #Port<0.5>                   ## terminate



===== process =====
dtls_worker_3000
sfu_sup
srtp_worker_3000
udp_sup_3000      ## udp_sup_3000 not exited
===== process =====
```

and other process send udp request


```sh
$ echo "ping" | nc -u localhost 3000
```


## Process Arch

1. opening new UDP port in main.erl
2. start udp_sup child tree with new Socket
3. udp_woker recieves all packet
4. srtp packet to srtp_worekr, dtls_packet to dtls_worker (emulate)
5. if udp_worker timeout, terminate udp_worker


### expected behaviour

udp_sup will terminate too and, all other worker under udp_sup will terminate too.

without restarting, because of socket already terminated.


### actual behaviour

when udp_sup is `#{restart => temporary}` udp_sup will ignore udp_woker termination and dtls/srtp_worker still alive.

when udp_sup is `#{restart => permanent}` udp_sup will restart udp_worker, it's not expected.
