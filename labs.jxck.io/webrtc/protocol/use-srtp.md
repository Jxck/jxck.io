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

ブラウザが知っている認証局の証明書でも、 Fingerprint と違うと Unknown CA になるので注意。

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
       |                                        +-----------+
       +-> client_write_SRTP_master_key  --+--> |  SRTP-KDF | - SRTP client write keys
       |                                   |    +-----------+
       |                                   |
       |                                   |    +-----------+
       +-> client_write_SRTP_master_salt --+--> | SRTCP-KDF | - SRTCP client write keys
       |                                        +-----------+
       |
       |                                        +-----------+
       +-> server_write_SRTP_master_key  --+--> |  SRTP-KDF | - SRTP server write keys
       |                                   |    +-----------+
       |                                   |
       |                                   |    +-----------+
       +-> server_write_SRTP_master_salt --+--> | SRTCP-KDF | - SRTCP server write keys
                                                +-----------+

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


## SRTP


### 4.3.1 Key Derivation Algorithm)

採用されている暗号化やメッセージ認証変換にかかわらず(srtp 事前定義の変換または、 Section 6 に記載の新しいもの)、相互運用可能な SRTP 実装は、セッション鍵を生成するために、 SRTP 鍵導出を使用しなければなりません。
鍵導出レートが適切にセッションの開始時に通知されると、 SRTP key derivation のための当事者間の追加の通信は必要はありません。

```
          packet index ---+
                          |
                          v
+-----------+ master  +--------+ session encr_key
| ext       | key     |        |---------->
| key mgmt  |-------->|  key   | session auth_key
| (optional |         | deriv  |---------->
| rekey)    |-------->|        | session salt_key
|           | master  |        |---------->
+-----------+ salt    +--------+
```

Figure 5: SRTP key derivation.

At least one initial key derivation SHALL be performed by SRTP, i.e., the first key derivation is REQUIRED.
SRTP では少なくとも 1 つの initial key derivation が行わなければならない、すなわち、 first key derivation が REQUIRED となります。

Further applications of the key derivation MAY be performed, according to the "keyderivationrate" value in the cryptographic context.
鍵導出のさらなる用途は、「キーに従って、実行することができる派生暗号コンテキストにおけるレート」の値。


The key derivation function SHALL initially be invoked before the first packet and then, when r > 0, a key derivation is performed whenever index mod r equals zero.
key derivation function は、最初に、最初のパケットの前に起動されるものとし、その後、 r > 0 の間は、インデックスの mod r がゼロに等しいときはいつでも key derivation が行われる。

This can be thought of as "refreshing" the session keys.
これは、セッションキーの "refreshing" と考えることができます。

The value of "keyderivationrate" MUST be kept fixed for the lifetime of the associated master key.
"keyderivationrate" は関連するマスターキーの寿命の間は、固定保持されなければなりません。

Interoperable SRTP implementations MAY also derive session salting keys for encryption transforms, as is done in both of the pre-defined transforms.
相互運用可能な SRTP 実装はまた、暗号化変換のための session salting key を導出することができます。事前定義された変換の両方で行われるように

Let m and n be positive integers.
正の整数 m, n において

A pseudo-random function family is a set of keyed functions {PRFn(k,x)}
PRF ファミリーは、 keyed functions {PRFn(k,x)} の集合

such that for the (secret) random key k, given m-bit x, PRFn(k,x) is an n-bit string,
k は (secret) random key,
m は bit 数
結果 PRFn(k,x) は n-bit string

computationally indistinguishable from random n-bit strings, see [HAC].
結果は、 n bit の乱数と区別できない (see [HAC])

For the purpose of key derivation in SRTP, a secure PRF with m = 128 (or more) MUST be used,
SRTP における鍵導出のために、セキュアな PRF を m = 128 以上で使用しなければなりません、

and a default PRF transform is defined in Section 4.3.3.
そしてデフォルト PRF transform はセクション 4.3.3 で定義されています。


Let "a DIV t" denote integer division of a by t, rounded down, and with the convention that "a DIV 0 = 0" for all a.
"a DIV t" を a と t の整数除算切り捨てを表すものとし、便宜上すべての a において "DIV 0 = 0" とする。


We also make the convention of treating "a DIV t" as a bit string of the same length as a, and thus "a DIV t" will in general have leading zeros.
また、便宜上 "a DIV t" を a と同じ長さの bit string とし、足りなければ zero が先につくとする。


Key derivation SHALL be defined as follows in terms of `<label>`,
Key derivation は以下のように定義される。

`<label>` の観点から


an 8-bit constant (see below), mastersalt and keyderivation_rate,
as determined in the cryptographic context, and index,
the packet index (i.e., the 48-bit ROC || SEQ for SRTP):


- Let r = index DIV keyderivationrate
- Let key_id = <label> || r.
- Let x = keyid XOR mastersalt, where keyid and mastersalt are aligned so that their least significant bits agree (right-alignment).

`<label>` MUST be unique for each type of key to be derived.
`<label>` は導出されるキーの種類ごとにユニークでなければなりません。



We currently define <label> 0x00 to 0x05 (see below), and future extensions MAY specify new values in the range 0x06 to 0xff for other purposes.
現状 `<label>` は `0x00` から `0x05` とし(後述)、将来の拡張は、 `0x06` ~ `0xff` の範囲に別の目的で指定するかもしれません。

The n-bit SRTP key (or salt) for this packet SHALL then be derived from the master key, k_master as follows:
このパケットの n-bit SRTP key (or salt) を、 master key `k_master` から求めると以下のようになる。


```
PRF_n(k_master, x).
```

(The PRF may internally specify additional formatting and padding of x, see e.g., Section 4.3.3 for the default PRF.)

(PRF は内部で、 x の追加フォーマットとパディングを指定することができます。 default PRF についてはセクション 4.3.3 参照)

The session keys and salt SHALL now be derived using:
session key と salt は以下のように導出されます

- ke (SRTP encryption): `<label>` = 0x00, n = ne.
- ka (SRTP message authentication): `<label>` = 0x01, n = na.
- ks (SRTP salting key): `<label>` = 0x02, n = ns.

where ne, ns, and n_a are from the cryptographic context.
ここで、 ne, ns, and n_a は、暗号コンテキストからです。

The master key and master salt MUST be random, but the master salt MAY be public.
master key と master salt はランダムである必要がありますが、 master salt は、公開してもよい。

Note that for a keyderivationrate of 0, the application of the key derivation SHALL take place exactly once.
keyderivationrate が 0 の場合、 key derivation の用途が一つ限りとする。

The definition of DIV above is purely for notational convenience.
DIV の定義は、上記の表記の便宜上のために、純粋です。

For a non-zero t among the set of allowed key derivation rates, "a DIV t" can be implemented as a right-shift by the base-2 logarithm of t.
key derivation rates の範囲内の t (!=0) について、 "a DIV t" 二進数で右シフトすれば実装できる。


The derivation operation is further facilitated if the rates are chosen to be powers of 256, but that granularity was considered too coarse to be a requirement of this specification.
レートが 256 の累乗になるように選択された場合に計算が容易になるが、その粒度は、本明細書の要件であることが粗すぎると考えられました。

The upper limit on the number of packets that can be secured using the same master key (see Section 9.2) is independent of the key derivation.
同一のマスタ鍵を(9.2 を参照)を使用して暗号化することができるパケットの数の上限は、鍵導出とは無関係です。



### 4.3.3. AES-CM PRF

The currently defined PRF, keyed by 128, 192, or 256 bit master key, has input block size m = 128 and can produce n-bit outputs for n up to 2^23.


現在定義された PRF は、 master key を 128, 192, 256 のいずれかとして暗号化され、 m = 128 の入力ブロックサイズから n (2^23 以下) bit の出力をする。

PRFn(kmaster,x) SHALL be AES in Counter Mode as described in Section 4.1.1, applied to key k_master, and IV equal to (x*2^16), and with the output keystream truncated to the n first (left-most) bits.

PRFn(kmaster,x) は key に k_master , IV に `x*2^16` とした AES カウンターモード (Section 4.1.1)、そして keystream の出力は左から n bit にまるめられる。

(Requiring n/128, rounded up, applications of AES.)




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
