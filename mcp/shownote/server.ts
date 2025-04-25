import { FastMCP } from "npm:fastmcp@1.20.5";
import { z } from "npm:zod@3.24.2";
import { get_shownote, get_vtt_chunk, replace_vtt_chunk } from "./tools.ts";

const server = new FastMCP({
  name: "shownote",
  version: "1.0.0",
});

server.addTool({
  name: "get_shownote",
  description: "指定されたエピソード番号の台本を取得します",
  parameters: z.object({
    episode_number: z.number().describe("エピソード番号"),
  }),
  execute: get_shownote,
});

server.addTool({
  name: "get_vtt_chunk",
  description:
    "指定した VTT を 100 行に区切り、指定したインデックス部分の書き起こしを取得します",
  parameters: z.object({
    episode_number: z.number().describe("エピソード番号"),
    index: z.number().describe("取得する VTT のインデックス (0 から始まる)"),
  }),
  execute: get_vtt_chunk,
});

server.addTool({
  name: "replace_vtt_chunk",
  description:
    "指定した VTT を 100 行に区切り、指定したインデックスの部分の書き起こしを、指定した内容で上書きします",
  parameters: z.object({
    episode_number: z.number().describe("エピソード番号"),
    index: z.number().describe("上書きする VTT のインデックス (0 から始まる)"),
    text: z.string().describe("上書きする内容"),
  }),
  execute: replace_vtt_chunk,
});

server.start({
  transportType: "stdio",
});
