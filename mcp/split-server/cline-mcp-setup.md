# Cline に MCP サーバーを認識させる方法

このドキュメントでは、作成した Split Server MCP サーバーを Cline（Claude のような AI アシスタント）に認識させる方法について説明します。

## 前提条件

- Deno がインストールされていること
- Split Server MCP サーバーのファイルが用意されていること
- Cline が MCP サーバーをサポートしていること

## 手順

### 1. MCP サーバーの準備

まず、Split Server MCP サーバーを起動可能な状態にします。

```bash
# プロジェクトディレクトリに移動
cd /path/to/split-server

# 必要に応じて依存関係をインストール（このプロジェクトでは不要）
# deno cache --reload main.ts
```

### 2. MCP サーバーの設定ファイルを確認

`mcp.json` ファイルが正しく設定されていることを確認します。このファイルには、MCP サーバーが提供するツールとその入力スキーマが定義されています。

### 3. MCP サーバーを起動

MCP サーバーを起動します。このサーバーは stdio インターフェースを使用しているため、バックグラウンドで実行する必要があります。

```bash
# バックグラウンドで MCP サーバーを起動
deno run --allow-read --allow-write main.ts > mcp-server.log 2>&1 &
echo $! > mcp-server.pid
```

または、別のターミナルウィンドウで実行することもできます：

```bash
deno run --allow-read --allow-write main.ts
```

### 4. Cline の設定ファイルを作成

Cline に MCP サーバーを認識させるための設定ファイルを作成します。通常、この設定ファイルは `.cline/config.json` または類似の場所に配置します。

```json
{
  "mcp_servers": [
    {
      "name": "split-server",
      "type": "stdio",
      "command": "deno run --allow-read --allow-write /path/to/split-server/main.ts",
      "working_directory": "/path/to/split-server",
      "metadata_path": "/path/to/split-server/mcp.json"
    }
  ]
}
```

`/path/to/split-server` を実際のプロジェクトディレクトリのパスに置き換えてください。

### 5. Cline を再起動

設定ファイルを適用するために、Cline を再起動します。

### 6. MCP サーバーの使用

Cline で MCP サーバーを使用するには、以下のようなプロンプトを使用します：

```
split-server の get_file_chunk ツールを使用して、test.txt ファイルの最初の 300 行を取得してください。
```

または

```
split-server の replace_file_chunk ツールを使用して、test.txt ファイルの 2 番目のチャンク（300〜600 行目）を "新しいテキスト" に置き換えてください。
```

## トラブルシューティング

### MCP サーバーが認識されない場合

- 設定ファイルのパスが正しいことを確認してください
- MCP サーバーが正常に起動していることを確認してください
- `mcp.json` ファイルの内容が正しいことを確認してください

### MCP サーバーとの通信エラーが発生する場合

- MCP サーバーのログを確認してください
- 入力パラメータが正しいことを確認してください
- ファイルパスが存在し、アクセス可能であることを確認してください

## 注意事項

- このサーバーは stdio インターフェースを使用しているため、Cline との通信は標準入出力を通じて行われます
- ファイルパスは相対パスまたは絶対パスで指定できますが、MCP サーバーが実行されているディレクトリからの相対パスとなります
- インデックスは 0 から始まることに注意してください（例：0 は最初の 300 行、1 は 301〜600 行）
