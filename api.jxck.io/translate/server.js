async function translate_via_deepl(text, auth_key) {
  console.log("fetch deepl api");
  const url = auth_key.endsWith(":fx")
    ? `https://api-free.deepl.com/v2/translate`
    : `https://api.deepl.com/v2/translate`;

  const body = JSON.stringify({
    "text":        [text],
    "free_api":    false,
    "target_lang": "JA",
  })

  const res = await fetch(url, {
    method: "post",
    headers: {
      "Authorization": `DeepL-Auth-Key ${auth_key}`,
      "Content-Type": "application/json"
    },
    body
  });
  const json = await res.json();
  console.log(json)
  const { translations } = json
  const translated = translations.map(({ text }) => text).join(" ");
  return translated;
}

async function main() {
  const auth_key = `f08d4a50-6425-bd68-11ab-9d4049568e43`
  const text = "hello world"
  const translate = await translate_via_deepl(text, auth_key)
  console.log(translate)
}
main()