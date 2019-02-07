\rm -rf *beam *dump \
    && erlc   \
    sfu_sup.erl     \
    udp_sup.erl     \
    udp_worker.erl  \
    dtls_worker.erl \
    srtp_worker.erl \
    && ./main.erl
