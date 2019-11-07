# lets encrypt

./cert-* を実行すると証明書を更新できる。
--standalone ではなく --webroot であるため、 h2o が起動している必要がある。
h2o が起動していれば証明書はメモリ上であるため、 /etc/letsencrypt を消しても大丈夫。
しかし、消してから起動はできないので、h2o を止めてから取得することはできない。
その場合 --standalone にすれば取得できるが、その場合は内部でサーバが立てられるため
renew でサーバが立てられない。

一旦 standalone で取得し h2o を起動してから /etc/letsencrypt を消し --webroot で取得なら
webroot で renew するスクリプトが登録される

/etc/cron.d/certbot が保存されているがこれが動いているかよくわからん。

/etc/letsencrypt/renewal-hooks/deploy に `sudo systemctl restart h2o` を入れてあるため、
取得が成功したら自動で再起動してくれるはず。
