import type { NextPage } from "next";
import { FormEvent, useState } from "react";

const Note: NextPage = () => {
  const [text, setText] = useState("");
  const [translate, setTranslate] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const text = formData.get("text") as string;
    setText(text);

    const submitEvent = e.nativeEvent as SubmitEvent;
    const submitterName = submitEvent.submitter?.getAttribute("name") as string;
    setTranslate(submitterName);
  };

  const Viewer = () => {
    if (translate === "google") {
      return <Google />;
    }
    if (translate === "deepl") {
      return <Deepl />;
    }
    return <Editor />;
  };

  const Editor = () => {
    return (
      <textarea
        className="w-full bg-red-50"
        name="text"
        autoFocus={true}
      ></textarea>
    );
  };

  function google_translate(text: string) {
    return `google: ${text}`;
  }

  function deepl_translate(text: string) {
    return `deepl: ${text}`;
  }

  const Google = () => {
    const translated = google_translate(text);
    return (
      <div>
        {translated}
        <input type="hidden" name="text" value={text} />
      </div>
    );
  };

  const Deepl = () => {
    const translated = deepl_translate(text);
    return (
      <div>
        {translated}
        <input type="hidden" name="text" value={text} />
      </div>
    );
  };

  const Button = ({ name }: { name: string }) => {
    return (
      <button className="bg-slate-300 p-2 rounded" type="submit" name={name}>
        {name}
      </button>
    );
  };

  return (
    <div className="h-screen">
      <main className="w-full border-solid border border-slate-300 rounded text-xl">
        <form onSubmit={onSubmit}>
          <Viewer />
          <div className="flex gap-2">
            <Button name="google" />
            <Button name="deepl" />
            <Button name="clear" />
          </div>
        </form>
        <div>
          Another important aspect of the structure of things is that, while an
          account only has a single password, it can have multiple passkeys.
          Thats because passkeys cant be copypasted around like passwords can.
          Instead users will register a passkeys as needed to cover their set of
          devices.
        </div>
      </main>
    </div>
  );
};

export default Note;
