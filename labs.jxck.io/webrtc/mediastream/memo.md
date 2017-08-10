# media stram constraints

## Intro

ブラウザからカメラやマイクにアクセスする API は Media Capture ans Streams の仕様に定義されいている。

[Media Capture and Streams](https://www.w3.org/TR/mediacapture-streams/#mediastreamtrack)


## getUserMedia

かつては `navigator.getUserMedia()` だったが今は `navigator.mediaDevices.getUserMedia()` になっている。

Promise を返し、 resolve すると MediaStream が返る。


## MediaStream

MediaStream(以下 Stream) は複数の MediaStreamTrack(以下 Track) からなる。

Track は、主に VideoTrack と AudioTrack で、カメラやマイクの入出力を指す。

それを束ねたものが Stream ということだ。

Stream からは Track を get/add/remove し、それを onaddtrack/onremovetrack で検知することができる。

つまり音声 Track だけ消す、新たに Track を追加する、任意の Track を引数に Stream を生成するなどが可能だ。

しかし、基本的には Stream から Track を取得し、ゼロから Track を作る方法は今のところない。


## MediaStreamTrack

Track には主に、 `"audioinput"`, `"audiooutput"`, `"videoinput"` の三種類があり、 kind プロパティとして保持されている。

その種類の通り、マイク、スピーカ、カメラと繋がっている。

`mute` や `stop()` は基本的にはこのトラック単位の状態や操作になっている。

例えば Stream には `stop()` は無いため、トラック全部を止めたければこうなる。


```js
stream.getTracks().forEach((track) => track.stop())
```


## MediaStreamConstraints

MediaStreamConstraints(以下 constraints) はデバイスを扱う際の細かな設定である。

通常 stream を取得する場合、このような引数を渡すと、デフォルトのカメラ、マイク、スピーカを Track とした Stream が生成される。


```js
navigator.mediaDevices.getUserMedia({audio: true, video: true}).then((stream) => {})
```

この引数は非常に細かい指定が可能だ。


## deviceId

認識されているデバイスには deviceId がふられており、特定のデバイスを指定できる。

これはカメラ、マイク両方で使うことができる。

deviceId は `navigator.mediaDevices.enumerateDevices` から取得できる。

resolve される値は、接続されたデバイス情報の配列だ。


```js
console.log(await navigator.mediaDevices.enumerateDevices())
// [
// {
//  "deviceId": "24831b5e1a3cb951228f764eb5161064c636f0f70adf85f63e3dc06ca8c86b70",
//  "kind": "audioinput",
//  "label": "Built-in Audio Digital Stereo",
//  "groupId": "4cd2266f081945fd6e52bf9c54d510e57c596d3ddc049c1dbc2357324f1e3582"
// },
// ...
// ]
```

例えばこの audioinput を指定したい場合は以下のようになる。


```js
{
  video: true,
  audio: {
    deviceId: "24831b5e1a3cb951228f764eb5161064c636f0f70adf85f63e3dc06ca8c86b70"
  }
}
```


## facingMode

これは deviceId の代わりにカメラの位置関係を指定するもので、以下の値が定義されている。

- "user"
- "environment"
- "left"
- "right"

これは主にモバイル端末やタブレット PC で、前面/背面に二つのカメラを持っている場合、 `"user"` は前面、 `"environment"` は背面のカメラが選択される。


```js
{
  video: {
    facingMode: "user"
  },
  audio: true
}
```

これはカメラの位置関係がデバイスに設定されている必要がある。


## supported constraints

deviceId や facingMode 以外にも、いくつかのパラメータが定義されている。

- audio
  - volume
  - sampleRate
  - sampleSize
  - echoCancellation
- video
  - facingMode
  - width
  - height
  - aspectRatio
  - frameRate
  - latency
  - channelCount
- common
  - deviceId
  - groupId

ただし、これら全てがサポートされている(値として設定した場合に反映される)とは限らない。

そこで、デバイスがサポートしている constraints を確認する方法がある。

Firefox は、 moz Prefix 付きで、仕様にないプロパティを設定可能なことなどもわかる。


```js
const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
// {
//   "browserWindow": true,
//   "deviceId": true,
//   "echoCancellation": true,
//   "facingMode": true,
//   "frameRate": true,
//   "height": true,
//   "mediaSource": true,
//   "mozAutoGainControl": true,
//   "mozNoiseSuppression": true,
//   "scrollWithPage": true,
//   "viewportHeight": true,
//   "viewportOffsetX": true,
//   "viewportOffsetY": true,
//   "viewportWidth": true,
//   "width": true
// }


let constraint = {
  audio: true,
  video: {}
}

if (supportedConstraints['frameRate']) {
  constraint.video.frameRate = 30
}
...
```


## ideal/exact/min/max

値の設定の仕方にはいくつかの方法があり、書き方によって挙動が違う。。


### normal

以下のように指定すると、ベストエフォートの値として解釈される。

ここでは `frameRate` として `60` を求めているが、もしデバイスがそれを満たせない場合は `60` にならない場合がある。


```js
{
  video: {
    frameRate: 60
  }
}
```


### exact

確実に `60` を求めたい場合は `exact` を指定する。

この場合  `getUserMedia()` から resolve された Stream の VideoTrack は確実に frameRate が `60` になっている。

もしデバイスがそれを満たせなかった場合は、 `getUserMedia()` は **reject される** ため、設定値を保証することができるのだ。


```js
{
  video: {
    frameRate: {
      exact: 60
    }
  }
}
```


### min/max

値を範囲で指定することもできる。もちろん、どちらかだけでも良い。


```js
{
  video: {
    frameRate: {
      min: 15,
      max: 60,
    }
  }
}
```


### ideal

例えば width で `ideal` を設定した場合を考える。


```js
{
  video: {
    width: {
      ideal: 1280
    },
    height: {
      ideal: 720
    }
  }
}
```

この場合、デバイスが対応可能な複数の候補がある中から、可能な限り `1280x720` に近い値が得られる。

具体的には、可能な候補それぞれに対して下記を計算する。


```
(actual == ideal) ? 0 : |actual-ideal| / max(|actual|, |ideal|)
```

この値が一番小さいものが返る。


### advanced

advanced を指定することで優先すべき設定のリストが指定できる。

例えば以下のように指定した場合。

```js
{
   width:    {min: 640, ideal: 1280},
   height:   {min: 480, ideal: 720},
   advanced: [
              {width: 1920, height: 1280},
              {aspectRatio: 1.3333333333}
            ],
}
```

- 1920x1280 を要求
- それがだめならアスペクト比 4x3 を要求
- それがだめなら 1280x720 に最も近い値を要求


### Track#getConstraints

直近の `applyConstraints()` の引数。


### Track#getCapabilities

Track がサポートしている constraints の一覧。


### Track#getSettings

現在 Track に適用されている constraints の値。

`applyConstraints()` の引数に、デフォルト値がマージされた値になる。


## chrome://webrtc-internals/

chrome の場合は

- [chrome://media-internals/ ](chrome://media-internals/ ) から device の情報
- [chrome://webrtc-internals/](chrome://webrtc-internals/) から device constraints の値を見ることができる


## DEMO

これらすべての API を用いて、ブラウザのサポート及び、設定の変更がどう反映されるかを試すことができるデモを用意した。

- [MediaStream API DEMO](https://labs.jxck.io/webrtc/usermedia/)
