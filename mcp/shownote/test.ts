import { getShowNote } from "./reader.ts";

// コマンドライン引数からエピソード番号を取得
const args: string[] = Deno.args;
if (args.length < 1) {
  console.error("使用方法: deno run test.ts <エピソード番号>");
  Deno.exit(1);
}

const episodeNumber: number = parseInt(args[0], 10);
if (isNaN(episodeNumber)) {
  console.error("エピソード番号は数値である必要があります");
  Deno.exit(1);
}

// 台本を取得して表示
getShowNote(episodeNumber).then(
  (result: { content: string } | { error: string }) => {
    if ("error" in result) {
      console.error(result.error);
      Deno.exit(1);
    } else {
      console.log(result.content);
    }
  },
);
