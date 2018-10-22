3. Security and Privacy Considerations

This section is non-normative.

The WebUSB API is a powerful feature and has the possibility to expose users to a number of new privacy and security risks. These risks can be broadly divided into three categories that will be described in the sections below.


3.1. Abusing Access to a Device

Peripheral devices can serve a number of purposes.
周辺装置は様々な目的を提供する

They may store data, as a flash drive does.
フラッシュドライブとしてデータを保存したり

They may collect information about the outside world as a camera or microphone does.
カメラやマイクなど入力装置もある

They may manipulate objects in the outside world as a printer does.
プリンタも有る

Each of the examples above have high-level APIs in the web platform with security features that aim to prevent their abuse by a malicious website.
これらは、ユーザを悪意のあるサイトから守る必要の有る Web プラットフォームの High-Level API

Storing data to or from an external drive requires the user to select the file manually.
読み書きするファイルは手動で選択する必要がある

Turning on the microphone or camera requires permission from the user and may activate an indicator to let the user know data collection is in progress.
マイク・カメラの起動はパーミッションを求め、動いてるときはインジケータを出すべき

Printing a document requires explicit action as well.
印刷は明示的な操作を必要とする

This API provides a generic mechanism to connect to devices not covered by these existing high-level APIs and so it requires a similarly generic mechanism for preventing a malicious page from abusing a device.
この API は、こうした high-level api でカバーされてない、デバイス接続の汎用的なメカニズムを提供するため、こうしたユーザ保護の汎用的なメカニズムが必要。

The first of these protections is the requestDevice() function.
一つは `requestDevice()` 関数。

The UA may display a permission prompt when this function is called.
これが呼ばれたら UA はパーミッションプロンプトを出す。

Even for a non-malicious page this action also preserves user privacy by preventing a site from connecting to a device before the user is aware that such a connection is possible.
汚染されたページでなくても、ユーザのプライバシーを守るために、こうしたアクションが必要。

The UA may also display an indicator when a device connection is active.
UA はデバイスに接続している間インジケータを出すべき。

Secondly, this specification requires that only secure contexts as described in [powerful-features] can access USB devices. This ensures both the authenticity of the code executing on behalf of the origin and that data read from the device may not be intercepted in transit.
次に、セキュアコンテキストを必須にする

Lastly, since USB devices are unable to distinguish requests from multiple sources, operating systems only allow a USB interface to have a single owning user-space or kernel-space driver.
最後に、 USB デバイスが複数のソースからのリクエストを識別できない、 OS は user-space/kernel-space ドライバをひとつだけしか許さない。

The UA acts as a user-space driver, therefore allowing only a single execution context to claim a USB interface at a time. The claimInterface() function will fail if multiple execution contexts attempt to claim an interface.
UA は user-space driver として動き、したがって一つの実行コンテキストしか USB インタフェースを同時に次項出来ない。
複数の実行コンテキストが interface を求めると claimInterface() が失敗する。


3.2. Attacking a Device

Historically, unless they were created for high security applications, USB devices have been designed to trust the host they are connected to and so the host is the traditional guardian of access to the capabilities a device provides.
歴史的に、


In the development of this specification two possibilities were considered.

First, the UA could notify the device of the origin from which a request originated.
まず、 UA はデバイスをリクエストする Origin を通知する

This would be similar to the Referrer header included in HTTP request.
これは Referrer ヘッダと似てる


The difficulty of this approach is that it places the burden of access control on the device.
このアプローチの難しさは、デバイスが担当するアクセスコントールに依存すること

Devices often have very limited processing and storage capabilities and so an effort was made to limit the amount of work necessary on the part of the device.
デバイスは、制限された処理や容量のみ提供するので、これはデバイス上の quota を制限する


The approach initially chosen during drafting of this specification was to instead require that the UA control
この仕様を作る上で、最初に選択したアプローチは UA がアクセスをコントロールするための CORS のようなメカニズムを代替として要求することだった


The device could provide the UA with a [set of static data structures] (defining a set of origins that are allowed to connect to it).
そのデバイスにアクセスできるオリジンを定義した静的データ構造を
デバイスは UA に提供できる


To support a [transition period for existing devices] (it was proposed that information about allowed origins) could also be provided out of band (through some kind of public registry).

既存デバイスのための移行期間として、許可されたオリジンの情報をパブリックリポジトリなどを通して提供することも提案されている.


A downside of this approach was two-fold.

デメリットは２つ有る


First, it required vendors to build new devices with WebUSB in mind or rely on a public registry system that proved difficult to specify.

まず、
ベンダに WebUSB を前提に 新しいデバイスを作ること
もしくは、特定するのが難しいパブリックレジストリに依存する
を 要求する


Product development cycles are long and as only an Editor's Draft this specification does not have the clout necessary to influence product planning.
プロダクトの開発サイクルは長い


Second, it provided no mechanism for third-party developers to use this API with a device.

次に、
3rdParty 開発者に
この API をデバイスで利用するための
メカニズムを提供しない


This limited innovation and the number of developers who could take advantage of this new capability.

これはイノベーションや
この機能の優位性を享受できるはずの多くの開発者
を制限する


After considering these options the authors have decided that the permission prompt encouraged by the requestDevice() method and the integration with §7.1 Feature Policy provide adequate protection against unwanted access to a device.

これらを議論した結果、
パーミッションプロンプトと Feature Policy の 2 つを
意図しないデバイスアクセスの対策として入れることにした






3.3. Attacking the Host

If a device is compromised then in addition to abusing its own capabilities
デバイスが感染していたら、

the attacker may also use it to in turn attack the host to which it is connected
それで接続しているホストを攻撃したり

or if the exploit is persistent any host it is connected to later.
攻撃を永続化したりできる

The methods above are the ways in which this specification attempts to mitigate this attack vector
前述のメソッドは、こうした

for once the device is under the control of an attacker


(for example, by uploading a malicious firmware image) there is nothing that can be done by the UA to prevent further damage.
仕様ではできることはない

This specification recommends device manufacturers practice defense in depth by designing their devices to only accept signed firmware updates
仕様では、デバイスベンダが、ファームのアップデートを信頼できる配信元とのみおこなうこと

and/or require physical access to the device in order to apply some configuration changes.
設定の変更にフィジカルなアクセスを必要とすることを推奨する
