# [map][record][erlang][tips] record to map in Erlang

## Intro

Record を Map に変換するだけのマクロ


## ?RtoM

`record_info()` を使ってキーを取るが、指定する record のタイプが動的には取れないので、マクロにして展開する。

```erlang
-define(RtoM(Name, Record), lists:foldl(fun({I, E}, Acc) -> Acc#{E => element(I, Record)} end, #{}, lists:zip(lists:seq(2, (record_info(size, Name))), (record_info(fields, Name))))).
```

使い方

```erlang:erlang-record-to-map.erl
```
