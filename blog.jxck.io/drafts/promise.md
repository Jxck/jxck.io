# Promise.allSettled 以外を使ってるということは、何か処理の考慮漏れがある

## Promise.all

一個でも失敗したら全体が失敗
コストかけてるのに成功分に関心がないということは少ない

## Promise.any

最初に成功するのを待つ
残りのabort などをしてない

## Promise.race

残りの abort をしてない
あまり使い道がわからない


## やり方

基本は allsettled 。全体を落としたいならその結果の reject をみる

any と同時に　allSettled で全部終わるのを待つ？

もしくは any したら、ちゃんと残りを abort する

でも allsettled で一個めっちゃ時間かかった末に落ちたりする、できたやつは早くフィードバックしたい

その場合、 Async Iterator




