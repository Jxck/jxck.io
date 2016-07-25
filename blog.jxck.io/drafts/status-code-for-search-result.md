# 検索結果がなかった時の HTTP ステータス


結論から言うと

- 検索結果が無かった => 200
- 検索を呼び出す方法が間違ってた => 404
- クエリが間違ってた => 400 etc


https://example.com/search?q=foo

foo があるなら 200 で結果を返す

foo が無いなら 200 で、空の結果を返す

search じゃなくて searh にスペルミスした 404

もし foo が無かったばいを 404 で返すと、
結果が無かったのか、呼び出しが間違っているのか、もしくは検索なんて機能が本当は無いのか
わからなくなる?

**search というリソースは常にあり、その内容がクエリによって変わるという考え方をすべき**

パスにすると変な感じになる、基本的には見た目の問題しか無いので query にした方がいい。

- /search/foo



- /users/jxck
- /users?name=jxck






google map の場合
http://maps.googleapis.com/maps/api/geocode/json?address=xzvfq


ソフト 404 対策としては
検索結果が無かったら noindex, follow をつける

http://stackoverflow.com/questions/24498302/soft-404-occurs-in-empty-internal-search-results-what-to-do
