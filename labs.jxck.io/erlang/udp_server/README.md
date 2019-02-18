# UDP Server process architecture PoC

## process arch


```
         (1_for_1)              (s_1_for_1)
+---------+     +-------------------+    +---------------+
| udp_sup |--+--| udp_listener_sup  |----| udp_listener  |+
+---------+  |  +-------------------+    +---------------+|
             |                            +---------------+
             |                  (s_1_for_1)      | link
             |  +-------------------+    +---------------+
             +--| dtls_worker_sup   |----| dtls_worker   |+
             |  +-------------------+    +---------------+|
             |                            +---------------+
             |                  (s_1_for_1)      | link
             |  +-------------------+    +---------------+
             +--| srtp_worker_sup   |----| srtp_worker   |+
                +-------------------+    +---------------+|
                                          +---------------+
```


## how to run


```sh
$ ./start.sh
```

and other process send udp request


```sh
$ echo "ping" | nc -u localhost 3000
```


## Process Arch

1. opening new UDP port in main.erl
2. start udp_sup child tree
3. open new udp socket
4. start_child with socket
5. udp_woker recieves all packet
6. forward srtp packet to srtp_worekr, dtls_packet to dtls_worker (emulate)
7. if one of udp/dtls/srtp worker terminate, other worker will terminate too
