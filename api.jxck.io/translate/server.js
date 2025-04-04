#!/home/jxck/.local/share/mise/installs/node/latest/bin/node

async function translate_via_deepl(text, Authorization) {
  const url = `https://api.deepl.com/v2/translate`;
  const body = {
    "text":        text,
    "free_api":    false,
    "target_lang": "JA",
  }
  const res = await fetch(url, {
    method: "post",
    headers: {
      "Authorization": Authorization,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  return res.text();
}

async function readBody() {
  process.stdin.setEncoding('utf8');
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk)
  }
  return chunks.join("")
}

async function post() {
  const Authorization = process.env["HTTP_AUTHORIZATION"]
  const body = JSON.parse(await readBody())
  const text = await translate_via_deepl(body.text, Authorization)
  process.stdout.write(`Status: 200 OK\n`)
  process.stdout.write(`Content-Type: application/json\n`)
  process.stdout.write(`Access-Control-Allow-Origin: *\n`)
  process.stdout.write(`Access-Control-Allow-Methods: POST\n`)
  process.stdout.write(`\n`)
  process.stdout.write(text)
}

async function options() {
  const headers = process.env["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]
  process.stdout.write(`Status: 204 No Content\n`)
  process.stdout.write(`Access-Control-Allow-Origin: *\n`)
  process.stdout.write(`Access-Control-Allow-Methods: POST\n`)
  process.stdout.write(`Access-Control-Allow-Headers: ${headers}\n`)
  process.stdout.write(`Access-Control-Max-Age: 86400\n`)
  process.stdout.write(`\n`)
}

async function not_supported() {
  process.stdout.write(`Status: 405 Method Not Allowed\n\n`)
}

async function main() {
  const method = process.env["REQUEST_METHOD"]
  if (method === "POST") {
    return await post()
  }
  if (method === "OPTIONS") {
    return await options()
  }
  return await not_supported()
}
main()