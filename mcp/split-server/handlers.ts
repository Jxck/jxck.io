import {
  getChunkByIndex,
  readFileLines,
  replaceChunkByIndex,
  writeFile,
} from "./utils.ts";

/**
 * ファイルの特定の部分（300行ごとに区切った特定のインデックス）を取得する
 * @param filePath 読み込むファイルのパス
 * @param index 取得する300行ブロックのインデックス（0から始まる）
 * @returns 指定された範囲の行を結合した文字列
 */
export async function getFileChunk(
  filePath: string,
  index: number,
): Promise<string> {
  try {
    // ファイルを行ごとに読み込む
    const lines = await readFileLines(filePath);

    // 指定されたインデックスに基づいて、特定の範囲の行を取得
    const chunk = getChunkByIndex(lines, index);

    // 行を結合して文字列として返す
    return chunk.join("\n");
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`ファイルチャンクの取得に失敗しました: ${error.message}`);
    } else {
      throw new Error(
        "ファイルチャンクの取得に失敗しました: 不明なエラーが発生しました",
      );
    }
  }
}

/**
 * ファイルの特定の部分（300行ごとに区切った特定のインデックス）を置き換える
 * @param filePath 編集するファイルのパス
 * @param text 置き換えるテキスト
 * @param index 置き換える300行ブロックのインデックス（0から始まる）
 * @returns 置き換えが成功したかどうか
 */
export async function replaceFileChunk(
  filePath: string,
  text: string,
  index: number,
): Promise<boolean> {
  try {
    // ファイルを行ごとに読み込む
    const lines = await readFileLines(filePath);

    // 指定されたインデックスに基づいて、特定の範囲の行を置き換え
    const updatedLines = replaceChunkByIndex(lines, index, text);

    // 更新された内容をファイルに書き込む
    await writeFile(filePath, updatedLines.join("\n"));

    return true;
  } catch (error) {
    throw new Error(
      `ファイルチャンクの置き換えに失敗しました: ${
        error instanceof Error ? error.message : "不明なエラーが発生しました"
      }`,
    );
  }
}
