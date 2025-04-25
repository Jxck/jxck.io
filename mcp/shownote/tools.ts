import {
  episodePath,
  getChunkByIndex,
  readFileLines,
  replaceChunkByIndex,
  vttPath,
  writeFile,
} from "./utils.ts";

// エピソード番号から台本を取得する関数
export async function get_shownote({ episode_number }: {
  episode_number: number;
}): Promise<string> {
  // エピソードフォルダのパスを生成
  const path: string = episodePath(episode_number);

  // フォルダ内のファイルを列挙
  for await (const entry of Deno.readDir(path)) {
    if (entry.isFile && entry.name.endsWith(".md")) {
      // 最初の.mdファイルを返す
      const scriptPath: string = `${path}/${entry.name}`;
      const content: string = await Deno.readTextFile(scriptPath);
      return content;
    }
  }
  throw new Error("ファイルが見つかりませんでした");
}

/**
 * VTT ファイルの特定の部分(300行ごとに区切った特定のインデックス)を取得する
 *
 * @param episode_number 読み込む VTT のエピソード番号
 * @param index 取得する 300 行ブロックのインデックス（0から始まる）
 * @returns 指定された範囲の VTT 文字列
 */
export async function get_vtt_chunk({ episode_number, index }: {
  episode_number: number;
  index: number;
}): Promise<string> {
  const path: string = vttPath(episode_number);

  // ファイルを行ごとに読み込む
  const lines = await readFileLines(path);

  // 指定されたインデックスに基づいて、特定の範囲の行を取得
  const chunk = getChunkByIndex(lines, index);

  // 行を結合して文字列として返す
  return chunk.join("\n");
}

/**
 * ファイルの特定の部分（300行ごとに区切った特定のインデックス）を置き換える
 * @param filePath 編集するファイルのパス
 * @param text 置き換えるテキスト
 * @param index 置き換える300行ブロックのインデックス（0から始まる）
 * @returns 置き換えが成功したかどうか
 */
export async function replace_vtt_chunk({
  episode_number,
  index,
  text,
}: {
  episode_number: number;
  index: number;
  text: string;
}): Promise<string> {
  const path: string = vttPath(episode_number);

  // ファイルを行ごとに読み込む
  const lines = await readFileLines(path);

  // 指定されたインデックスに基づいて、特定の範囲の行を置き換え
  const updatedLines = replaceChunkByIndex(lines, index, text);

  // 更新された内容をファイルに書き込む
  await writeFile(path, updatedLines.join("\n"));

  return "success";
}
