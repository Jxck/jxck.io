# DLTS use-srtp と TLS Exporter

## Intro

## TLS Exporter (RFC5705)

例えば DTLS-SRTP の場合、 DTLS でハンドシェイクした後 SRTP でもハンドシェイクをするのは無駄が多い。

そこで、 DTLS のハンドシェイクで共有した情報(Master Secret etc) を、 SRTP で再利用できると嬉しい。

このように、 TLS のハンドシェイクで確立した共有鍵の情報を、別の上位プロトコルに提供する方式が Exporter。

もともと Extractor という名前が使われていたが、 Crypto の世界での Extractor と紛らわしいので変えた。

共有した情報(Master Secret etc)をそのまま Export すると、複数の上位プロトコルがある場合同じになってしまう。

そこで、 Exported Keying Material (EKM) という情報に加工して渡す。

要件としては

- クライアント/サーバ双方が、同じ EKM を上位プロトコルに提供できる
- EKM は MasterSecret を知らない攻撃者にはただの乱数にしか見えない
- 単一の (D)TLS コネクションから、複数の EKM が提供できる
- 1 つの EKM から、 Master Secret や他の EKM が推測できない


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
PRF(master_secret,
    label,
    client_random + server_random
    )[length]
```

context がある場合

```c
PRF(master_secret,
    label,
    client_random + server_random + context_value_length + context_value
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

```
a=fingerprint:sha-256 3A:46:CD:38:CF:B6:B0:A7:3D:A9:71:46:A8:B5:FC:BA:74:D0:15:A4:A8:2D:FA:AD:EC:C2:0A:8E:F0:76:61:68
```

ブラウザが知っている認証局の証明書でも、 Fingerprint と違うと Unknown CA になるので注意。

そして、ハンドシェイクが終わったあと Application Frame にペイロードは乗らない。


### use-srtp (RFC5764)

ClientHello の Extension で SRTP protection profile のリストを載せた `use-srtp` を送る。

ServerHello は、その Profile から一つを選び、同じく `use-srtp` を返す。

MKI (Master Key Identifier) がつく場合がある、これは複数のコンテキストがある場合の識別に使う。

```
 0                   1
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
| Length                          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
| Value 1                         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
| Value 2                         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
| MKI (0..255)                    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

Profile は以下。

maximum_lifetime は各鍵で暗号化できるパケットの数。

```
SRTPProtectionProfile SRTP_AES128_CM_HMAC_SHA1_80 = {0x00, 0x01};
        cipher:               AES_128_CM
        cipher_key_length:    128
        cipher_salt_length:   112
        maximum_lifetime:     2^31
        auth_function:        HMAC-SHA1
        auth_key_length:      160
        auth_tag_length:      80
SRTPProtectionProfile SRTP_AES128_CM_HMAC_SHA1_32 = {0x00, 0x02};
        =
        auth_tag_length:      32
        RTCP auth_tag_length: 80
SRTPProtectionProfile SRTP_NULL_HMAC_SHA1_80      = {0x00, 0x05};
        cipher:               NULL
        cipher_key_length:    0
        cipher_salt_length:   0
        maximum_lifetime:     2^31
        auth_function:        HMAC-SHA1
        auth_key_length:      160
        auth_tag_length:      80
SRTPProtectionProfile SRTP_NULL_HMAC_SHA1_32      = {0x00, 0x06};
        =
        auth_tag_length:      32
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
PRF(MasterSecret, "EXTRACTOR-dtls_srtp", 480)
```


この結果を以下のように分ける

```
client_write_SRTP_master_key[master_key_len(128)];
server_write_SRTP_master_key[master_key_len(128)];
client_write_SRTP_master_salt[master_salt_len(112)];
server_write_SRTP_master_salt[master_salt_len(112)];
```

この 4 つが Master Key/Salt であり、これらを KDF(Key Derivation Function) に渡すことで Session Key を作る。

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
SessionEncrKey: <label> = 0x00, n = 128
SessionAuthKey: <label> = 0x01, n = 160
SessionSaltKey: <label> = 0x02, n = 112
```

```
R = Index(48bit) DIV KDR
Key_Id = <label>(8bit) || r.
X = Key_Id XOR MasterSalt (16bit 左シフト)
PRF_n(MasterKey, x).
```


PRF_n は、結局はモード関係なく一回だけ AES を実行することと等価になる。

Erlang の場合は、 aes_ecb で一回 block_encrypt すれば良い。

```erl
CipherKey = crypto:block_encrypt(aes_ecb, MasterKey, X),
```


```
    R:                           000000000000
Label:                         00
Key_Id:                        00000000000000
MasterSalt:      0EC675AD498AFEEBB6960B3AABE6
-------------------------------------------------
X:               0EC675AD498AFEEBB6960B3AABE60000 (xor, *2^16)

SessionEncrKey:  C61E7A93744F39EE10734AFE3FF7A087 (PRF(MasterKey, X))
```


```
    R:                           000000000000
Label:                         02
Key_Id:                        02000000000000
MasterSalt:      0EC675AD498AFEEBB6960B3AABE6
------------------------------------------------
X:               0EC675AD498AFEE9B6960B3AABE60000 (xor, *2^16)

SessionSaltKey:  30CBBC08863D8C85D49DB34A9AE1     (PRF(MasterKey, X) bsr 16)
```

```
    R:                           000000000000
Label:                         01
Key_Id:                        01000000000000
MasterSalt:      0EC675AD498AFEEBB6960B3AABE6
-----------------------------------------------
X:               0EC675AD498AFEEAB6960B3AABE60000 (xor, *2^16)

Auth Key                           AES Input Blocks
CEBE321F6FF7716B6FD4AB49AF256A15   0EC675AD498AFEEAB6960B3AABE60000
6D38BAA48F0A0ACF3C34E2359E6CDBCE   0EC675AD498AFEEAB6960B3AABE60001
E049646C43D9327AD175578EF7227098   0EC675AD498AFEEAB6960B3AABE60002
6371C10C9A369AC2F94A8C5FBCDDDC25   0EC675AD498AFEEAB6960B3AABE60003
6D6E919A48B610EF17C2041E47403576   0EC675AD498AFEEAB6960B3AABE60004
6B68642C59BBFC2F34DB60DBDFB2       0EC675AD498AFEEAB6960B3AABE60005
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

SRTPPREFIXLENGTH のデフォルトは 0 なので、結果  Prefix はなく、全体を Suffix として使う。


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


## Session Keys

ここまであると、 SessionKeys を作る材料が揃う。

- TLS から Export した MasterKey, MasterSalt
- Index = 0
- KDR = 0
- 各ラベル

を使って KDF にかけて、必要な長さになるまで AES-CM を繰り返して取得する。


## Message 認証

受信したパケットをまず AuthPortion と AuthTag に分ける。
AuthTag は最後の 10byte で、それを除いた部分が AuthPortion になる。

生成した 160bit の SessionAuthKey を Key として、 AuthPortion を HMAC-SHA1 にかけて 10byte のハッシュを得る。
ただし、 SRTP の場合はハッシュを取る前に ROC を AuthPortion の後ろに連結してから HMAC-SHA1 をかける。
SRTCP の場合は AuthPortion をそのままかける。

このハッシュが AuthTag と同じ値になれば、パケットが改ざんされていないことがわかる。

認証は、受信側が検証する場合は復号化よりも先に、送信側がつける場合は暗号化よりもあとに行う。


## 復号

検証が終わったら復号を行う。
ヘッダを除いた Encrypted Portion を取り出す。
SRTP の場合は ROC と Seq から Index を計算し、 SRTCP の場合はパケットの最後についている Index を取り出してそのまま使う。

SessionEncKey/Salt を使い、 Encrypted Portion と同じ長さの KeyStream を生成し、 EncryptedPortion と XOR をとれば復号できる。


## SRTCP

SRTCP は SRTP に従う。
3 つのフィールドを追加

- Index
- E-flag
- Auth Tag
- MKI (Option)

追加されるサイズは、最小で 14byte
あとは Auth Tag と MKI の設定による。


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
