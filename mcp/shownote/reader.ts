import config from "./deno.json" with { type: "json" };
const BASE_PATH: string = config.BASE_PATH;

type Params = {
  episode_number: number;
};

// エピソード番号から台本を取得する関数
export async function getShowNote({ episode_number }: Params): Promise<string> {
  // エピソードフォルダのパスを生成
  const episodePath: string = `${BASE_PATH}/${episode_number}`;

  // フォルダ内のファイルを列挙
  for await (const entry of Deno.readDir(episodePath)) {
    if (entry.isFile && entry.name.endsWith(".md")) {
      // 最初の.mdファイルを返す
      const scriptPath: string = `${episodePath}/${entry.name}`;
      const content: string = await Deno.readTextFile(scriptPath);
      return content;
    }
  }
  throw new Error("ファイルが見つかりませんでした");
}
