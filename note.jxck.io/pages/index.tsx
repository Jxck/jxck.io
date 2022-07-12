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

  const Preview = () => {
    return (
      <div>
        {note.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    );
  };

  const Editor = ({
    onChange,
  }: {
    onChange: ChangeEventHandler<HTMLTextAreaElement>;
  }) => {
    return (
      <textarea
        className={styles.textarea}
        autoFocus={true}
        onChange={onChange}
      >
        {note}
      </textarea>
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>note.jxck.io</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <button type="button" onClick={onClick}>
          ok
        </button>
      </header>
      <main>{preview ? <Preview /> : <Editor onChange={onChange} />}</main>
      <footer>
        <button type="button" onClick={onClick}>
          ok
        </button>
      </footer>
    </div>
  );
};

export default Home;
