import { deepl_auth_key, gcp_api_key } from "./env.json"

export const TRANSLATE_VIA = {
  GCP: "translate-via-gcp",
  DEEPL: "translate-via-deepl",
};

EventTarget.prototype.on = EventTarget.prototype.addEventListener;
const encoder = new TextEncoder();

const FULL_HALF =
  /(?<full>[\p{sc=Hira}\p{sc=Kana}\p{sc=Han}]+)(?<half>[\p{ASCII}]+)/gu;
const HALF_FULL =
  /(?<half>[\p{ASCII}]+)(?<full>[\p{sc=Hira}\p{sc=Kana}\p{sc=Han}]+)/gu;
function spacer(text) {
  return text
    .replaceAll(FULL_HALF, (all, left, right) => {
      return `${left} ${right}`;
    })
    .replaceAll(HALF_FULL, (all, left, right) => {
      return `${left} ${right}`;
    });
}

async function digestMessage(message) {
  const data = encoder.encode(message);
  const sha256 = await crypto.subtle.digest("SHA-256", data);
  const hash = btoa(String.fromCharCode(...new Uint8Array(sha256)));
  console.log({ message, hash });
  return hash;
}

async function translate_via_deepl(text) {
  console.log("fetch deepl api");
  const Endpoint = `https://api.deepl.com/v2/translate`;
  const url = new URL(Endpoint);
  url.searchParams.set("text", text);
  url.searchParams.set("auth_key", deepl_auth_key);
  url.searchParams.set("free_api", false);
  url.searchParams.set("target_lang", "JA");

  const req = await fetch(url, { method: "post" });
  const { translations } = await req.json();
  const translated = translations.map(({ text }) => text).join(" ");
  return translated;
}

async function translate_via_gcp(text) {
  console.log("fetch google translate api");
  const Endpoint = `https://translation.googleapis.com/language/translate/v2`;
  const url = new URL(Endpoint);
  url.searchParams.set("q", text);
  url.searchParams.set("target", "ja");
  url.searchParams.set("format", "text");
  url.searchParams.set("source", "en");
  url.searchParams.set("model", "base");
  url.searchParams.set("key", gcp_api_key);
  const req = await fetch(url, {
    method: "post",
  });
  const { data } = await req.json();
  const translated = data.translations
    .map(({ translatedText }) => {
      return translatedText.replaceAll(/[！-～]/g, (c) =>
        String.fromCharCode(c.charCodeAt(0) - 0xfee0)
      );
    })
    .join(" ");
  return translated;
}

export async function translate(text, via) {
  const hash = await digestMessage(text);
  const key = `${via}-${hash}`;
  const cache = localStorage.getItem(key);
  if (cache) {
    console.log("cache hit");
    return spacer(cache);
  }

  const translated = await (async () => {
    if (via === TRANSLATE_VIA.DEEPL) {
      return await translate_via_deepl(text);
    }
    if (via === TRANSLATE_VIA.GCP) {
      return await translate_via_gcp(text);
    }
  })();

  localStorage.setItem(key, translated);
  return spacer(translated);
}