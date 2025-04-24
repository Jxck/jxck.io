import config from "./deno.json" with { type: "json" };
const BASE_PATH: string = config.BASE_PATH;

// エピソード番号から台本を取得する関数
export async function getShowNote(
  episodeNumber: number,
): Promise<{ content: string } | { error: string }> {
  try {
    // エピソードフォルダのパスを生成
    const episodePath: string = `${BASE_PATH}/${episodeNumber}`;

    // フォルダの存在確認
    try {
      const fileInfo: Deno.FileInfo = await Deno.stat(episodePath);
      if (!fileInfo.isDirectory) {
        return {
          error: `エピソード ${episodeNumber} のフォルダが見つかりません`,
        };
      }
    } catch (error: unknown) {
      const typedError: Error = error as Error;
      return {
        error:
          `エピソード ${episodeNumber} のフォルダが見つかりません: ${typedError.message}`,
      };
    }

    // フォルダ内のファイルを列挙
    const files: string[] = [];
    for await (const entry of Deno.readDir(episodePath)) {
      if (entry.isFile && entry.name.endsWith(".md")) {
        files.push(entry.name);
      }
    }

    if (files.length === 0) {
      return {
        error: `エピソード ${episodeNumber} の台本ファイルが見つかりません`,
      };
    }

    // 最初の.mdファイルを使用
    const scriptPath: string = `${episodePath}/${files[0]}`;
    const content: string = await Deno.readTextFile(scriptPath);

    return { content };
  } catch (error: unknown) {
    const typedError: Error = error as Error;
    return { error: `エラーが発生しました: ${typedError.message}` };
  }
}
