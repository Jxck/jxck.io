import type { NextPage } from "next";
import { FormEvent, useEffect, useState } from "react";
import { TRANSLATE_VIA, translate } from "../lib/translate";

type Pair = { ja: string; en: string }[];

function useTranslator({ via, lines }: { via: string; lines: string[] }) {
  const [translated, setTranslated] = useState<Pair>([]);
  useEffect(() => {
    (async () => {
      const result = await Promise.all(
        lines.map(async (en) => {
          const ja = await translate(en, via);
          return { en, ja };
        })
      );
      setTranslated(result);
    })();
  }, [lines, via]);
  return [translated];
}

const Translate = ({ via, lines }: { via: string; lines: string[] }) => {
  console.log("translate", { via, lines });

  const [translated] = useTranslator({ via, lines });
  return (
    <div className="p-4">
      {translated.map(({ en, ja }, i) => {
        return (
          <div key={i} className="mb-4">
            <p className="text-slate-500 mb-1">{en}</p>
            <p className="text-slate-900 text-base">{ja}</p>
          </div>
        );
      })}
      <input type="hidden" name="text" value={lines.join("\n")} />
    </div>
  );
};

const Editor = () => {
  return (
    <textarea
      className="w-full h-[90vh] p-2 border"
      name="text"
      autoFocus={true}
    ></textarea>
  );
};

const Viewer = ({ via, lines }: { via: string; lines: string[] }) => {
  if (via === TRANSLATE_VIA.GCP || via === TRANSLATE_VIA.DEEPL) {
    return <Translate via={via} lines={lines} />;
  }
  return <Editor />;
};

const Button = ({ name }: { name: string }) => {
  return (
    <button className="bg-slate-300 p-2 rounded" type="submit" name={name}>
      {name}
    </button>
  );
};

const Note: NextPage = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [via, setVia] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const text = formData.get("text") as string;
    setLines(
      text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "")
    );
    const submitEvent = e.nativeEvent as SubmitEvent;
    const submitterName = submitEvent.submitter?.getAttribute("name") as string;
    setVia(submitterName);
  };

  return (
    <div className="h-screen">
      <main className="w-full text-xl">
        <form onSubmit={onSubmit}>
          <Viewer via={via} lines={lines} />
          <div className="flex gap-2">
            <Button name={TRANSLATE_VIA.GCP} />
            <Button name={TRANSLATE_VIA.DEEPL} />
            <Button name="clear" />
          </div>
        </form>
      </main>
    </div>
  );
};

export default Note;
