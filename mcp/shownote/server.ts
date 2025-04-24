import { getShowNote } from "./reader.ts";

// MCPサーバーの実装
class MozaicScriptServer {
  // JSONRPC形式のリクエストを処理する
  async handleRequest(request: any): Promise<any> {
    if (request.method === "initialize") {
      // initializeメソッドの実装
      return {
        jsonrpc: "2.0",
        id: request.id,
        result: {
          protocolVersion: request.params.protocolVersion,
          serverInfo: {
            name: "shownote",
            version: "1.0.0",
          },
          capabilities: {
            tools: {
              get_episode_script: {
                description: "指定されたエピソード番号の台本を取得します",
              },
            },
          },
        },
      };
    } else if (request.method === "notifications/initialized") {
      return null;
    } else if (request.method === "tools/list") {
      // ツール一覧を返す
      return {
        jsonrpc: "2.0",
        id: request.id,
        result: {
          tools: [
            {
              name: "get_shownote",
              description: "指定されたエピソード番号の台本を取得します",
              inputSchema: {
                type: "object",
                properties: {
                  episode_number: {
                    type: "number",
                    description: "エピソード番号",
                  },
                },
                required: ["episode_number"],
              },
            },
          ],
        },
      };
    } else if (
      request.method === "call_tool" || request.method === "tools/call"
    ) {
      if (request.params.name === "get_shownote") {
        const episodeNumber = request.params.arguments.episode_number;
        const result = await getShowNote(episodeNumber);

        if ("error" in result) {
          return {
            jsonrpc: "2.0",
            id: request.id,
            error: {
              code: -32603,
              message: result.error,
            },
          };
        } else {
          return {
            jsonrpc: "2.0",
            id: request.id,
            result: {
              content: [
                {
                  type: "text",
                  text: result.content,
                },
              ],
            },
          };
        }
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
}

// MCPサーバーのインスタンスを作成
const server = new MozaicScriptServer();

// 標準入力からJSONRPCリクエストを読み込む
async function readRequest(): Promise<any> {
  const buf = new Uint8Array(1024);
  const n = await Deno.stdin.read(buf);
  if (n === null) {
    return null;
  }
  const text = new TextDecoder().decode(buf.subarray(0, n));
  return JSON.parse(text);
}

// 標準出力にJSONRPCレスポンスを書き込む
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
      console.error(">>>>>>>>>>>>>>>>>>>>>>>>>>>\n", JSON.stringify(request, null, " "), "\n===========================");
      const response = await server.handleRequest(request);
      console.error("<<<<<<<<<<<<<<<<<<<<<<<<<<<\n", JSON.stringify(response, null, " "), "\n===========================");
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
