import { getFileChunk, replaceFileChunk } from "./handlers.ts";

/**
 * リクエストの型定義
 */
interface Request {
  tool: string;
  params: {
    filePath: string;
    index: number;
    text?: string;
  };
}

/**
 * レスポンスの型定義
 */
interface Response {
  status: "success" | "error";
  data?: string;
  message?: string;
}

/**
 * リクエストを処理する
 * @param request リクエスト
 * @returns レスポンス
 */
async function handleRequest(request: Request): Promise<Response> {
  try {
    // リクエストのツール名に基づいて適切なハンドラーを呼び出す
    switch (request.tool) {
      case "get_file_chunk": {
        const { filePath, index } = request.params;
        const data = await getFileChunk(filePath, index);
        return {
          status: "success",
          data,
        };
      }
      case "replace_file_chunk": {
        const { filePath, text, index } = request.params;
        if (!text) {
          return {
            status: "error",
            message: "text パラメータが必要です",
          };
        }
        await replaceFileChunk(filePath, text, index);
        return {
          status: "success",
          message: `ファイルの ${index * 300} 〜 ${
            (index + 1) * 300
          } 行目を置き換えました`,
        };
      }
      default:
        return {
          status: "error",
          message: `未知のツール: ${request.tool}`,
        };
    }
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error
        ? error.message
        : "不明なエラーが発生しました",
    };
  }
}

/**
 * メイン関数
 */
async function main() {
  try {
    // 標準入力からのデータを読み取るためのテキストデコーダー
    const decoder = new TextDecoder();

    // 標準入力からのデータを読み取る
    const buffer = new Uint8Array(1024);
    const n = await Deno.stdin.read(buffer);

    if (n === null) {
      console.error("標準入力からの読み取りに失敗しました");
      Deno.exit(1);
    }

    // 読み取ったデータをデコード
    const input = decoder.decode(buffer.subarray(0, n)).trim();

    try {
      // 入力をJSONとしてパース
      const request: Request = JSON.parse(input);

      // リクエストを処理
      const response = await handleRequest(request);

      // レスポンスをJSON形式で標準出力に書き込む
      console.log(JSON.stringify(response));
    } catch (error) {
      // JSONパースエラーなどの例外処理
      console.log(JSON.stringify({
        status: "error",
        message: `リクエストの処理に失敗しました: ${
          error instanceof Error ? error.message : "不明なエラーが発生しました"
        }`,
      }));
    }
  } catch (error) {
    // 予期しないエラーの処理
    if (error instanceof Error) {
      console.error(`予期しないエラーが発生しました: ${error.message}`);
    } else {
      console.error("予期しないエラーが発生しました: 不明なエラー");
    }
    Deno.exit(1);
  }
}

// メイン関数を実行
main();
