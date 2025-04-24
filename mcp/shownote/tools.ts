import * as reader from "./reader.ts";

export async function initialize(request: any): Promise<any> {
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
}

export async function list(request: any): Promise<any> {
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
}

export async function getShowNote(request: any): Promise<any> {
  const episodeNumber = request.params.arguments.episode_number;
  const result = await reader.getShowNote(episodeNumber);

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
}
