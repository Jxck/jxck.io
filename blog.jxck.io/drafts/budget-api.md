# BudgetAPI

## Intro

BudgetAPI の解説


## Budget API

Push API と Background Fetch が入った事で、 Web アプリはユーザ操作への応答のみだけでなく、バックグラウンドでの動作の可能性が色々増えた。


しかし、これまでの Web のライフサイクルとの乖離が大きいため、潜在的な問題が露見する可能性もある。そこで、Chrome は Push API は必ず User Visible な通知を伴うものに制限されていた。

一方 Firefox は Budget を付与することで、限定的な制限を実現していた。
Chrome も 52 からはこの方式にシフトする。


