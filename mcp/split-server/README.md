# Split Server

ファイルを 300 行ごとに分割して操作するための MCP サーバー

## 概要

このプロジェクトは、Deno で実装された MCP（Model Context
Protocol）サーバーです。ファイルを 300
行ごとに分割して、特定の部分を取得したり置き換えたりする機能を提供します。

## 機能

- **get_file_chunk**: ファイルを 300
  行ごとに分割し、指定されたインデックスの部分を取得します
  - 例: filePath=./test.txt, index=3 の場合、test.txt の 600〜900 行目を返します
- **replace_file_chunk**: ファイルの特定の部分（300
  行ごとに区切った特定のインデックス）を指定されたテキストで置き換えます
  - 例: filePath=./test.txt, index=4, text="sample" の場合、test.txt の
    900〜1200 行目を "sample" に置き換えます

## 必要条件

- [Deno](https://deno.land/) 1.0.0 以上

## インストール

```bash
git clone https://github.com/yourusername/split-server.git
cd split-server
```

## 使用方法

### サーバーの起動

```bash
deno task start
```

または

```bash
deno run --allow-read --allow-write main.ts
```

### リクエスト例

#### ファイルの特定の部分を取得する

```bash
echo '{"tool":"get_file_chunk","params":{"filePath":"/Users/jxck/develop/jxck.io/mcp/split-server/test.txt","index":0}}' | deno task start
```

#### ファイルの特定の部分を置き換える

```bash
echo '{"tool":"replace_file_chunk","params":{"filePath":"/Users/jxck/develop/jxck.io/mcp/split-server/test.txt","text":"置き換えるテキスト","index":0}}' | deno run --allow-read --allow-write main.ts
```

## リクエスト/レスポンス形式

### get_file_chunk リクエスト

```json
{
  "tool": "get_file_chunk",
  "params": {
    "filePath": "./test.txt",
    "index": 3
  }
}
```

### get_file_chunk レスポンス

```json
{
  "status": "success",
  "data": "ファイルの内容（600〜900行目）"
}
```

### replace_file_chunk リクエスト

```json
{
  "tool": "replace_file_chunk",
  "params": {
    "filePath": "./test.txt",
    "text": "sample",
    "index": 4
  }
}
```

### replace_file_chunk レスポンス

```json
{
  "status": "success",
  "message": "ファイルの 1200 〜 1500 行目を置き換えました"
}
```

### エラーレスポンス

```json
{
  "status": "error",
  "message": "エラーの詳細メッセージ"
}
```

## MCP サーバーとしての使用

このサーバーは MCP（Model Context Protocol）に準拠しており、MCP
クライアントから利用することができます。

### mcp.json

```json
{
  "schema_version": "v1",
  "name": "split-server",
  "description": "ファイルを300行ごとに分割して操作するためのMCPサーバー",
  "tools": [
    {
      "name": "get_file_chunk",
      "description": "指定されたファイルを300行ごとに分割し、特定のインデックスの部分を取得します",
      "input_schema": {
        "type": "object",
        "properties": {
          "filePath": {
            "type": "string",
            "description": "読み込むファイルのパス"
          },
          "index": {
            "type": "integer",
            "description": "取得する300行ブロックのインデックス（0から始まる）"
          }
        },
        "required": ["filePath", "index"]
      }
    },
    {
      "name": "replace_file_chunk",
      "description": "指定されたファイルの特定の部分（300行ごとに区切った特定のインデックス）を指定されたテキストで置き換えます",
      "input_schema": {
        "type": "object",
        "properties": {
          "filePath": {
            "type": "string",
            "description": "編集するファイルのパス"
          },
          "text": {
            "type": "string",
            "description": "置き換えるテキスト"
          },
          "index": {
            "type": "integer",
            "description": "置き換える300行ブロックのインデックス（0から始まる）"
          }
        },
        "required": ["filePath", "text", "index"]
      }
    }
  ]
}
```

## ライセンス

MIT
