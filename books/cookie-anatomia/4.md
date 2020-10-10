---
title: "Cookie の挙動の注意点"
emoji: "📝"
type: "tech"
topics: ["", ""]
published: false
---

## Cookie の挙動の注意点

前回の特集で解説した Same Origin Policy に基づくと、通常 Web のリソースは Scheme, Host, Port の組による Origin の単位に区切られ、 Origin を跨ぐ際は明示的な許可が必要でした。

しかし、 Cookie は SOP が策定される以前から存在した仕様なため、 Scheme や Port やによって分離されず、 Domain についても設定によっては分離されないため、注意が必要です。

この Cookie の挙動の注意点については、 Cookie の仕様中に、「機密性」および「完全性」という二つの側面から注意点が書かれているため、ここで解説します。

### 弱い機密性 (weak confidentiality)

Cookie が Port で分離されないということは、例えば `https://example.com` で付与された Cookie は`https://example.com:3000`にも送られてしまうことを意味します。

通常、同一ドメイン上で複数のサービスを提供する場合は、 Port を分けて運用するといったことが行われる場合がありますが、その場合も Cookie を Credential として利用したサービスを平行運用することはできません。

Scheme による分離もされないため、多くは http/https だが、他のプロトコルが同じサーバにあっても分離されない。

また document.cookie などを使って取得すれば、パスを超えることも可能なので、 Path による分離も保証しきれるものではない。


## 弱い整合性 (weak integrity)

sns.example.com が自身が利用する Cookie を以下のように付与したとする。

```
Set-Cookie: SID=31d4d96e407aad42; Domain=example.com; HttpOnly; Secure;
```

これは同じ Domain の範囲にある attack.example.com にも送られる。さらに、 attack.example.com が以下のように送れば、その内容を上書きすることも可能だ。ここでは SID を書き換え、 HttpOnly, Secure を消している。

```
Set-Cookie: SID=0000000000000000; Domain=exampl.ecom
```

つまりこれでは、 sns.example.com は、ブラウザが送ってきたものが、自分が設定した Cookie であることを保証することができない。














