/**
 * ファイル操作のためのユーティリティ関数
 */

/**
 * ファイルの内容を行ごとに読み込む
 * @param filePath 読み込むファイルのパス
 * @returns ファイルの内容を行ごとに分割した配列
 */
export async function readFileLines(filePath: string): Promise<string[]> {
  try {
    const fileContent = await Deno.readTextFile(filePath);
    return fileContent.split("\n");
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`ファイルの読み込みに失敗しました: ${error.message}`);
    } else {
      throw new Error(
        "ファイルの読み込みに失敗しました: 不明なエラーが発生しました",
      );
    }
  }
}

/**
 * ファイルに内容を書き込む
 * @param filePath 書き込むファイルのパス
 * @param content 書き込む内容
 */
export async function writeFile(
  filePath: string,
  content: string,
): Promise<void> {
  try {
    await Deno.writeTextFile(filePath, content);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`ファイルの書き込みに失敗しました: ${error.message}`);
    } else {
      throw new Error(
        "ファイルの書き込みに失敗しました: 不明なエラーが発生しました",
      );
    }
  }
}

/**
 * 指定されたインデックスに基づいて、ファイルの特定の範囲の行を取得する
 * @param lines ファイルの内容を行ごとに分割した配列
 * @param index 取得する300行ブロックのインデックス（0から始まる）
 * @param chunkSize 1ブロックあたりの行数（デフォルト: 300）
 * @returns 指定された範囲の行
 */
export function getChunkByIndex(
  lines: string[],
  index: number,
  chunkSize = 300,
): string[] {
  const startLine = index * chunkSize;
  const endLine = Math.min(startLine + chunkSize, lines.length);

  if (startLine >= lines.length) {
    throw new Error(
      `指定されたインデックス(${index})は範囲外です。ファイルは${
        Math.ceil(lines.length / chunkSize)
      }ブロックしかありません。`,
    );
  }

  return lines.slice(startLine, endLine);
}

/**
 * 指定されたインデックスに基づいて、ファイルの特定の範囲の行を置き換える
 * @param lines ファイルの内容を行ごとに分割した配列
 * @param index 置き換える300行ブロックのインデックス（0から始まる）
 * @param newContent 置き換える内容
 * @param chunkSize 1ブロックあたりの行数（デフォルト: 300）
 * @returns 置き換え後の行の配列
 */
export function replaceChunkByIndex(
  lines: string[],
  index: number,
  newContent: string,
  chunkSize = 300,
): string[] {
  const startLine = index * chunkSize;
  const endLine = Math.min(startLine + chunkSize, lines.length);

  if (startLine >= lines.length) {
    throw new Error(
      `指定されたインデックス(${index})は範囲外です。ファイルは${
        Math.ceil(lines.length / chunkSize)
      }ブロックしかありません。`,
    );
  }

  // 新しい内容を行ごとに分割
  const newLines = newContent.split("\n");

  // 元の配列をコピー
  const result = [...lines];

  // 指定された範囲を新しい内容で置き換え
  result.splice(startLine, endLine - startLine, ...newLines);

  return result;
}
