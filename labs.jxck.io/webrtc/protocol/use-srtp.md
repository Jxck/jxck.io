# DLTS use-srtp と TLS Exporter

## Intro



## TLS Exporter (RFC5705)

例えば DTLS-SRTP の場合、 DTLS でハンドシェイクした後 SRTP でもハンドシェイクをするのは無駄が多い。

そこで、 DTLS のハンドシェイクで共有した情報(Master Secret etc) を、 SRTP で再利用できると嬉しい。

このように、 TLS のハンドシェイクで確立した共有鍵の情報を、別の上位プロトコルに提供する方式が Exporter。

もともと Extractor という名前が使われていたが、 Crypto の世界での Extractor と紛らわしいので変えた。

実際には、共有した情報(Master Secret etc)をそのまま Export しない。例えば複数の上位プロトコルがある場合同じになってしまう。

そこで、 Exported Keying Material (EKM) という情報に加工して渡す。

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



## DTLS (RFC6347)

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


## DTLS-SRTP (RFC5763, RFC5764)

DTLS の拡張で `use-srtp` が使用される場合、 DTLS では鍵の交換のみを行い、それを Exporter で渡して SRTP から使う。

この時、双方の証明書の検証は、別途交換されるシグナリングの中で、 SDP の Fingerprint に載っている値との比較で行われる。

ブラウザが知っている認証局の証明書でも、 Fingerprint と違うと Unknown CA になるので注意。

そして、ハンドシェイクが終わったあと Application Frame にペイロードは乗らない。


### use-srtp (RFC5764)

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
- KDR (Key Derivation Rate) は 0
- RFC3711 の AES-CM PRF が鍵導出として使われる
- 他のパラメータ(SRTP reply window size, FEC order) はデフォルト


## 鍵導出(Key Derivation)


全体像


```
TLS master
  secret   label
   |         |
   v         v
+---------------+                         packet index for each KDF
| TLS extractor |                                     |
+---------------+                                     v
       |                                        +-----------+
       +-> client_write_SRTP_master_key  --+--> |  SRTP-KDF | - SRTP client write keys
       |                                   |    +-----------+   (sessin encr/ auth/salt key)
       |                                   |
       |                                   |    +-----------+
       +-> client_write_SRTP_master_salt --+--> | SRTCP-KDF | - SRTCP client write keys
       |                                        +-----------+   (sessin encr/ auth/salt key)
       |
       |                                        +-----------+
       +-> server_write_SRTP_master_key  --+--> |  SRTP-KDF | - SRTP server write keys
       |                                   |    +-----------+   (sessin encr/ auth/salt key)
       |                                   |
       |                                   |    +-----------+
       +-> server_write_SRTP_master_salt --+--> | SRTCP-KDF | - SRTCP server write keys
                                                +-----------+   (sessin encr/ auth/salt key)
```

TLS Exporter の label は以下

```
# RFC5764 4.2
EXTRACTOR-dtls_srtp
```

導出するデータの長さはこれだけ

```
# RFC5764 4.2
2 * (SRTPSecurityParams.master_key_len + SRTPSecurityParams.master_salt_len)
```

master_key_len,  master_salt_len は RFC3711 (SRTP) 自体に定義されている。

```
Key material params
(for each master key):
  master key length                                 128                128
  master salt key length of the master salt         112                112
```

よって、先の計算結果はこうなる。


```
2 * (128 + 112) = 480
```

つまり Exporter に渡すのは


```
PRF(SecurityParameters.master_secret,
    "EXTRACTOR-dtls_srtp",
    SecurityParameters.client_random + SecurityParameters.server_random
    )[480]

```


この結果を以下のように分ける

```
client_write_SRTP_master_key[SRTPSecurityParams.master_key_len];
server_write_SRTP_master_key[SRTPSecurityParams.master_key_len];
client_write_SRTP_master_salt[SRTPSecurityParams.master_salt_len];
server_write_SRTP_master_salt[SRTPSecurityParams.master_salt_len];
```

この 4 つが Master Key であり、これらを KDF(Key Derivation Function) に渡すことで Session Key を作る。

導出方法は、 RFC3711 の 4.3 に書かれてる。


### 4.3.3. AES-CM PRF

PRF は AES-CM を使う。

PRF は、 128, 192, 256 のいずれかの長さの Master Key で暗号化され、 m = 128 の入力ブロックサイズから n (2^23 以下) bit の出力をする。
IV も 128bit にそろえて(*2^16)から計算。

AES で計算する結果を、後述の方法で繋いで KeyStream を作るのが CM (Counter Mode)


## ROC/SEQ/index

SRTP では RTP の SEQ がカンストしたことを数える Rollover Counter を用意する。
ROC は 2^16 でインクリメントされるので、実際の Packet Index は以下のようになる。


```
Index = 2^16 * ROC + SEQ      (48bit)
```


## KDF

- Master Key
- Master Salt

を元に

- Session Enc  Key
- Session Auth Key
- Session Salt key

を生成する。

```
          packet index ---+
                          |
                          v
+-----------+ master  +--------+ session encr_key
|           | key     |        |---------->
|  SRTP     |-------->| Key    | session auth_key
|  Key      |         | Deriv  |---------->
|  Exporter |-------->|        | session salt_key
|           | master  |        |---------->
+-----------+ salt    +--------+

Figure 5: SRTP key derivation.
```

まず、 label という値が、それぞれに対して定義されている。

-  SRTP Enc  Key = `0x00`
-  SRTP Auth Key = `0x01`
-  SRTP Salt key = `0x02`
- SRTCP Enc  Key = `0x03`
- SRTCP Auth Key = `0x04`
- SRTCP Salt Key = `0x05`

KDR は SRTP では 0

- KDR = 0

DIV 演算は右シフトで実装できる


このラベルを元に以下のように計算して x を出す。


AES-CM の入力ブロックは、


```
SessionEncKey : <label> = 0x00, n = 128
SessionAuthKey: <label> = 0x01, n = 160
SessionSaltKey: <label> = 0x02, n = 112
```

```
r = Index(48bit) DIV KDR
key_id = <label>(8bit) || r.
x = key_id XOR MasterSalt (16bit 左シフト)
PRF_n(MasterKey, x).
```


PRF_n は、結局はモード関係なく一回だけ AES を実行することと等価になる。

Erlang の場合は、 aes_ecb で一回 block_decrypt すれば良い。

```erl
CipherKey = crypto:block_encrypt(aes_ecb, MasterKey, X),
```


```
    r:                         000000000000
label:                       00
key_id:                      00000000000000
MasterSalt:    0EC675AD498AFEEBB6960B3AABE6
-----------------------------------------------
X:             0EC675AD498AFEEBB6960B3AABE60000 (xor, *2^16)

cipher key:    C61E7A93744F39EE10734AFE3FF7A087 (PRF(MasterKey, X))
```


```
Index DIV kdr:                   000000000000
Label:                         02
MasterSalt:      0EC675AD498AFEEBB6960B3AABE6
------------------------------------------------
X:               0EC675AD498AFEE9B6960B3AABE60000 (xor, *2^16)

SessionSaltKey:  30CBBC08863D8C85D49DB34A9AE1     (PRF(MasterKey, X) bsr 16)
```


```
Index DIV kdr:                   000000000000
Label:                         01
MasterSalt:      0EC675AD498AFEEBB6960B3AABE6
-----------------------------------------------
X:               0EC675AD498AFEEAB6960B3AABE60000 (xor, *2^16)

SessionAtuhKey:  CEBE321F6FF7716B6FD4AB49AF256A15 (PRF(MasterKey, X))
```



## Key Stream Generator

KeyStream を生成する。

この KeyStream を `SRTPPREFIXLENGTH` bit で分割する。

- KeyStream Prefix: メッセージ認証に使う
- KeyStream Suffix: メッセージ暗号化に使う


```
keystream    for message          for message
generator    authenticatuon       encryption
+----+     +------------------+---------------------------------+
| KG |---->| Keystream Prefix |          Keystream Suffix       |---+
+----+     +------------------+---------------------------------+   |
                                                                    |
                              +---------------------------------+   v
                              |     Payload of RTP Packet       |->XOR
                              +---------------------------------+   |
                                                                    |
                              +---------------------------------+   |
                              | Encrypted Portion of SRTP Packet|<--+
                              +---------------------------------+
Figure 3: Default SRTP Encryption Processing.
```


暗号化は、 KeyStream Suffix と RTP Packet Payload の XOR で生成される。
逆にやれば複合できる。

この KeyStream はデフォルトでは AES-CM を用いて生成。


## AES-CM

AES の出力する 128 bit ブロックを、連結したものを Key Stream として使う。


IV は 128 bit で以下。 (3 つの項を 128bit に 0 padding してから計算している)


```
IV = (Session Salt Key * 2^16) XOR (SSRC * 2^64) XOR (index * 2^16)
```


```
AES(Session Enc Key, IV) ||
AES(Session Enc Key, IV + 1 mod 2^128) ||
AES(Session Enc Key, IV + 2 mod 2^128) ...
```

この連続を KeyStream として使う。


## Message 認証

HMAC-SHA1 を使う。

160bit の SessionAuthKey を使って
80bit の AuthTag を生成する。

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

























参考: https://www.cisco.com/c/en/us/about/security-center/securing-voip.html

