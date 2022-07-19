import type { NextPage } from "next";
import Head from "next/head";
import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEvent,
  useEffect,
  useState,
} from "react";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [preview, setPreview] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    setNote(localStorage.getItem(KEY) || "");
  }, [preview]);

  const KEY = "note.jxck.io"; // storage key

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    localStorage.setItem(KEY, value);
  };

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    setPreview(!preview);
  };

  const Preview = ({ className }: { className: string }) => {
    return (
      <section className={className}>
        {note.split("\n").map((line, i) => (
          <p className="mt-4" key={i}>
            {line}
          </p>
        ))}
      </section>
    );
  };

  const Editor = ({
    onChange,
    className,
  }: {
    onChange: ChangeEventHandler<HTMLTextAreaElement>;
    className: string;
  }) => {
    return (
      <textarea className={className} autoFocus={true} onChange={onChange}>
        {note}
      </textarea>
    );
  };

  return (
    <div className="h-screen">
      <Head>
        <title>note.jxck.io</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full border-solid border border-slate-300 rounded text-xl">
        {preview ? (
          <Preview className="p-4" />
        ) : (
          <Editor
            className="w-full h-screen p-4 bg-gray-100 border-solid border border-slate-300 rounded text-slate-800"
            onChange={onChange}
          />
        )}
      </main>
      <footer className="">
        <button
          type="button"
          onClick={onClick}
          className="text-white bg-blue-400 px-2 py-1 rounded hover:bg-blue-800"
        >
          toggle
        </button>
      </footer>
    </div>
  );
};

export default Home;
