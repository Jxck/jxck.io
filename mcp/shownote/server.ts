import { FastMCP } from "npm:fastmcp@1.20.5";
import { z } from "npm:zod@3.24.2";
import { getShowNote } from "./reader.ts";

const server = new FastMCP({
  name: "shownote",
  version: "1.0.0",
});

server.addTool({
  name: "Get ShowNote",
  description: "指定されたエピソード番号の台本を取得します",
  parameters: z.object({
    episode_number: z.number().describe("エピソード番号"),
  }),
  execute: getShowNote,
});

server.start({
  transportType: "stdio",
});
