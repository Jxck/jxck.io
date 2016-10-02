どうして https にしないといけないのか


http での通信 MITM

password だけ https
メールだから https

URL は？

- wikipedia を追跡すると主義・思考がわかるかも?
- github が追跡できると?
- xvideo が追跡できると?


だれもそんなことやってると思ってなかった

やってた

NSA


牧歌的な時代は終わった

技術的インセンティブ
ビジネス的インセンティブ
 どうやってユーザを守るか


モチベーションを与える
- SEO
- 新しい技術の HTTPS only 化
- URL バーで insecure 表示
  - https://security.googleblog.com/2016/09/moving-towards-more-secure-web.html
  - https://blog.mozilla.org/tanvi/2016/01/28/no-more-passwords-over-http-please/

どうしてやらないといけないか


---

HTTPS 化する上で


積極的 HTTPS 化

証明書が欲しい -> EV 買え

HTTPS のみにしたい -> HSTS

mixed contents 問題 -> upgrade insecure request

合わせ技 HSTS priming https://wicg.github.io/hsts-priming/



MITM を前提とした脆弱性報告は多い

http://www.itmedia.co.jp/enterprise/articles/1602/24/news065.html

HTTPS なら根本解決

HTTPS の偽装?

CA インシデントの多発


CA を信用できるか問題 -> HPKP, CT


wosign


http://localhost:3000 で開発しにくい時代?



HTTPS にすることは Web のユーザの自由を守ること

