/**
 * MCP サーバーのテスト用スクリプト
 *
 * 使用方法:
 * deno run --allow-run --allow-read test-mcp-server.ts
 */

// get_file_chunk ツールをテストする関数
async function testGetFileChunk(filePath: string, index: number): Promise<void> {
  console.log(`\n=== get_file_chunk テスト (filePath: ${filePath}, index: ${index}) ===`);

  const request = {
    tool: "get_file_chunk",
    params: {
      filePath,
      index
    }
  };

  const command = new Deno.Command("deno", {
    args: ["run", "--allow-read", "--allow-write", "main.ts"],
    stdin: "piped",
    stdout: "piped",
    stderr: "piped",
  });

  const process = command.spawn();

  // リクエストを標準入力に書き込む
  const encoder = new TextEncoder();
  const writer = process.stdin.getWriter();
  await writer.write(encoder.encode(JSON.stringify(request)));
  writer.releaseLock();
  await process.stdin.close();

  // 標準出力からレスポンスを読み取る
  const { stdout, stderr } = await process.output();

  const decoder = new TextDecoder();
  const output = decoder.decode(stdout).trim();
  const error = decoder.decode(stderr).trim();

  if (error) {
    console.error("エラー:", error);
  }

  try {
    const response = JSON.parse(output);
    console.log("レスポンス:", response);

    if (response.status === "success") {
      console.log("テスト成功: ファイルチャンクを取得しました");
      console.log("データの一部:", response.data.substring(0, 100) + "...");
    } else {
      console.error("テスト失敗:", response.message);
    }
  } catch (error) {
    console.error("レスポンスの解析に失敗しました:", error instanceof Error ? error.message : String(error));
    console.error("生のレスポンス:", output);
  }
}

// replace_file_chunk ツールをテストする関数
async function testReplaceFileChunk(filePath: string, text: string, index: number): Promise<void> {
  console.log(`\n=== replace_file_chunk テスト (filePath: ${filePath}, index: ${index}) ===`);

  const request = {
    tool: "replace_file_chunk",
    params: {
      filePath,
      text,
      index
    }
  };

  const command = new Deno.Command("deno", {
    args: ["run", "--allow-read", "--allow-write", "main.ts"],
    stdin: "piped",
    stdout: "piped",
    stderr: "piped",
  });

  const process = command.spawn();

  // リクエストを標準入力に書き込む
  const encoder = new TextEncoder();
  const writer = process.stdin.getWriter();
  await writer.write(encoder.encode(JSON.stringify(request)));
  writer.releaseLock();
  await process.stdin.close();

  // 標準出力からレスポンスを読み取る
  const { stdout, stderr } = await process.output();

  const decoder = new TextDecoder();
  const output = decoder.decode(stdout).trim();
  const error = decoder.decode(stderr).trim();

  if (error) {
    console.error("エラー:", error);
  }

  try {
    const response = JSON.parse(output);
    console.log("レスポンス:", response);

    if (response.status === "success") {
      console.log("テスト成功: ファイルチャンクを置き換えました");
    } else {
      console.error("テスト失敗:", response.message);
    }
  } catch (error) {
    console.error("レスポンスの解析に失敗しました:", error instanceof Error ? error.message : String(error));
    console.error("生のレスポンス:", output);
  }
}

// メイン関数
async function main() {
  // テスト用のファイルを作成
  const testFilePath = "./test-file.txt";
  const testContent = Array.from({ length: 1000 }, (_, i) => `Line ${i + 1}: This is a test line.`).join("\n");

  try {
    await Deno.writeTextFile(testFilePath, testContent);
    console.log(`テスト用ファイルを作成しました: ${testFilePath} (1000行)`);

    // get_file_chunk をテスト
    await testGetFileChunk(testFilePath, 0); // 最初の300行
    await testGetFileChunk(testFilePath, 1); // 301-600行

    // replace_file_chunk をテスト
    const replacementText = "This text replaces the original content.\nIt has multiple lines.\nThird line of replacement.";
    await testReplaceFileChunk(testFilePath, replacementText, 2); // 601-900行を置き換え

    // 置き換え後のチャンクを取得して確認
    await testGetFileChunk(testFilePath, 2);

    console.log("\nすべてのテストが完了しました");
  } catch (error) {
    console.error("テスト中にエラーが発生しました:", error instanceof Error ? error.message : String(error));
  } finally {
    // テスト用ファイルを削除
    try {
      await Deno.remove(testFilePath);
      console.log(`テスト用ファイルを削除しました: ${testFilePath}`);
    } catch (error) {
      console.error(`テスト用ファイルの削除に失敗しました: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

// メイン関数を実行
main();
