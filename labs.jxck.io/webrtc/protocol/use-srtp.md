# DLTS use-srtp と TLS Exporter

## Intro



## TLS Exporter

TLS のハンドシェイクで確立した共有鍵の情報を、別の上位プロトコルに提供する方式。

もともと Extractor という名前が使われていたが、 Crypto の世界での Extractor と紛らわしいので変えた。

DTLS-SRTP のように、 DTLS で行った鍵の交換を SRTP で使いたいような場合、 DTLS が交換した情報を SRTP に提供したい。

一度交換した鍵が使いまわせると、同じような鍵交換を別途行う必要がなくなるため、メリットがあるユースケースがある。

DTLS が SRTP に Export する情報を、 Exported Keying Material (EKM) という。

要件としては

- クライアント/サーバ双方が、同じ EKM を上位プロトコルに提供できる
- EKM は MasterSecret を知らない攻撃者にはただの乱数にしか見えない
- 単一の (D)TLS コネクションから、複数の EKM が提供できる
- 一つの EKM から、 Master Secret や他の EKM が推測できない


## Exporter Definition

Exporter は 3 つの入力を取る

- label
  - EXPORTER で始まる(should)
  - EXPERIMENTAL は登録なし実験用
  - [IANA Registry](https://www.iana.org/assignments/tls-parameters/tls-parameters.xhtml#exporter-labels)
- context
  - 計算にアプリ層の情報を混ぜたい時利用
  - 例えば認証とか
- length


TLS がハンドシェイクで使った PRF で算出する。

context がない場合

```c
PRF(SecurityParameters.master_secret, label,
    SecurityParameters.client_random +
    SecurityParameters.server_random
    )[length]
```

context がある場合

```c
PRF(SecurityParameters.master_secret, label,
    SecurityParameters.client_random +
    SecurityParameters.server_random +
    context_value_length + context_value
    )[length]
```



## DTLS

DTLS では、 UDP 上に TLS を移植する上で足らないものを追加している。

UDP では TLS と違い以下のような現象がおこる。

- Packet Loss
- Jitter
- Out of Order

これらをケアしないと TLS のコンテキストが崩れるため、以下を追加している。

- 大きなパケットを分けるための Fragment
- 順番を把握するための Sequence ID
- Timeout

あとは基本的に TLS と同じセマンティクスになっている。


## DTLS-SRTP

DTLS の拡張で `use-srtp` が使用される場合、 DTLS では鍵の交換のみを行い、それを Exporter で渡して SRTP から使う。

この時、双方の証明書の検証は、別途交換されるシグナリングの中で、 SDP の Fingerprint に載っている値との比較で行われる。

ブラウザが知っている認証局の証明書でも、Fingerprint と違うと Unknown CA になるので注意。

そして、ハンドシェイクが終わったあと Application Frame にペイロードは乗らない。


### use-srtp

ClientHello の Extension で SRTP protection profile のリストを載せた `use-srtp` を送る。

ServerHello は、その Profile から一つを選び、同じく `use-srtp` を返す。

MKI (Master Key Identifier) がつく場合がある、これは複数のコンテキストがある場合の識別に使う。

```
uint8 SRTPProtectionProfile[2];

struct {
   SRTPProtectionProfiles SRTPProtectionProfiles;
   opaque srtp_mki<0..255>;
} UseSRTPData;

SRTPProtectionProfile SRTPProtectionProfiles<2..2^16-1>;
```

Profile は以下。

maximum_lifetime は各鍵で暗号化できるパケットの数。

```
SRTPProtectionProfile SRTP_AES128_CM_HMAC_SHA1_80 = {0x00, 0x01};
        cipher: AES_128_CM
        cipher_key_length: 128
        cipher_salt_length: 112
        maximum_lifetime: 2^31
        auth_function: HMAC-SHA1
        auth_key_length: 160
        auth_tag_length: 80
SRTPProtectionProfile SRTP_AES128_CM_HMAC_SHA1_32 = {0x00, 0x02};
        cipher: AES_128_CM
        cipher_key_length: 128
        cipher_salt_length: 112
        maximum_lifetime: 2^31
        auth_function: HMAC-SHA1
        auth_key_length: 160
        auth_tag_length: 32
        RTCP auth_tag_length: 80
SRTPProtectionProfile SRTP_NULL_HMAC_SHA1_80      = {0x00, 0x05};
        cipher: NULL
        cipher_key_length: 0
        cipher_salt_length: 0
        maximum_lifetime: 2^31
        auth_function: HMAC-SHA1
        auth_key_length: 160
        auth_tag_length: 80
SRTPProtectionProfile SRTP_NULL_HMAC_SHA1_32      = {0x00, 0x06};
        cipher: NULL
        cipher_key_length: 0
        cipher_salt_length: 0
        maximum_lifetime: 2^31
        auth_function: HMAC-SHA1
        auth_key_length: 160
        auth_tag_length: 32
        RTCP auth_tag_length: 80
```

以下の SRTP オプションが有効になる

- PRF で key を作り SRTP の KDF (Key Derivation Function) に渡す
- KDR (Key Derivation Rate) が 0 で、 SRTP のシーケンスナンバーに基づく再送がない
- RFC3711 の AES-CM PRF が鍵導出として使われる
- 他のパラメータ(SRTP reply window size, FEC order) はデフォルト


## 鍵導出(Key Derivation)

TLS Exporter の label は以下

```
EXTRACTOR-dtls_srtp
```

導出するデータの長さはこれだけ

```
2 * (SRTPSecurityParams.master_key_len + SRTPSecurityParams.master_salt_len)
```

これを以下のように分ける

```
client_write_SRTP_master_key[SRTPSecurityParams.master_key_len];
server_write_SRTP_master_key[SRTPSecurityParams.master_key_len];
client_write_SRTP_master_salt[SRTPSecurityParams.master_salt_len];
server_write_SRTP_master_salt[SRTPSecurityParams.master_salt_len];
```

この 4 つで client 用、 server 用 2 つの SRTP の鍵を導出する。

導出方法は、 RFC3711 の 4.3 に書かれてる。

全体像


```
TLS master
  secret   label
   |         |
   v         v
+---------------+
| TLS extractor |
+---------------+
       |                                         +------+   SRTP
       +-> client_write_SRTP_master_key ----+--->| SRTP |-> client
       |                                    | +->| KDF  |   write
       |                                    | |  +------+   keys
       |                                    | |
       +-> server_write_SRTP_master_key --  | |  +------+   SRTCP
       |                                  \ \--->|SRTCP |-> client
       |                                   \  +->| KDF  |   write
       |                                    | |  +------+   keys
       +-> client_write_SRTP_master_salt ---|-+
       |                                    |
       |                                    |    +------+   SRTP
       |                                    +--->| SRTP |-> server
       +-> server_write_SRTP_master_salt -+-|--->| KDF  |   write
                                          | |    +------+   keys
                                          | |
                                          | |    +------+   SRTCP
                                          | +--->|SRTCP |-> server
                                          +----->| KDF  |   write
                                                 +------+   keys

Figure 1: The derivation of the SRTP keys.
```


```
  Client            Server
  (Sender)         (Receiver)
(1)   <----- DTLS ------>    src/dst = a/b and b/a
      ------ SRTP ------>    src/dst = a/b, uses client write keys

(2)   <----- DTLS ------>    src/dst = c/d and d/c
      ------ SRTCP ----->    src/dst = c/d, uses client write keys
      <----- SRTCP ------    src/dst = d/c, uses server write keys

Figure 2: A DTLS-SRTP session protecting RTP (1) and another one protecting RTCP (2), showing the transport addresses and keys used.
```




## SDP

`m=` に入る値。

"fmt" は RTP/SAVP になる。

UDP か DCCP によって以下。

```
Type            SDP Name                     Reference
----            ------------------           ---------
proto           UDP/TLS/RTP/SAVP             [RFC5764]
proto           DCCP/TLS/RTP/SAVP            [RFC5764]

proto           UDP/TLS/RTP/SAVPF            [RFC5764]
proto           DCCP/TLS/RTP/SAVPF           [RFC5764]
```
