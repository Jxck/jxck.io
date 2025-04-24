import { getShowNote, initialize, list } from "./tools.ts";

// JSONRPC形式のリクエストを処理する
async function handleRequest(request: any): Promise<any> {
  if (request.method === "initialize") {
    // initializeメソッドの実装
    return initialize(request);
  } else if (request.method === "notifications/initialized") {
    return null;
  } else if (request.method === "tools/list") {
    // ツール一覧を返す
    return list(request);
  } else if (request.method === "tools/call") {
    if (request.params.name === "get_shownote") {
      return getShowNote(request);
    } else {
      return {
        jsonrpc: "2.0",
        id: request.id,
        error: {
          code: -32601,
          message: `未知のツール: ${request.params.name}`,
        },
      };
    }
  } else {
    return {
      jsonrpc: "2.0",
      id: request.id,
      error: {
        code: -32601,
        message: `未知のメソッド: ${request.method}`,
      },
    };
  }
}

// 標準入力から JSONRPC リクエストを読み込む
async function readRequest(): Promise<string | null> {
  const buf = new Uint8Array(1024);
  const n = await Deno.stdin.read(buf);
  if (n === null) {
    return null;
  }
  const text = new TextDecoder().decode(buf.subarray(0, n));
  return JSON.parse(text);
}

// 標準出力に JSONRPC レスポンスを書き込む
function writeResponse(response: any): void {
  if (response === null) return;
  const text = JSON.stringify(response);
  Deno.stdout.write(new TextEncoder().encode(text + "\n"));
}

// メインループ
async function main() {
  try {
    while (true) {
      const request = await readRequest();
      if (request === null) {
        break;
      }
      // console.error(">>>>>>>>>>>>>>>>>>>>>>>>>>>\n", JSON.stringify(request, null, " "), "\n===========================");
      const response = await handleRequest(request);
      // console.error("<<<<<<<<<<<<<<<<<<<<<<<<<<<\n", JSON.stringify(response, null, " "), "\n===========================");
      writeResponse(response);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`エラーが発生しました: ${error.message}`);
    } else {
      console.error("エラーが発生しました: 不明なエラー");
    }
    Deno.exit(1);
  }
}

main();
