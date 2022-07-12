import type { NextPage } from 'next'
import Head from 'next/head'
import { ChangeEvent, MouseEvent, TextareaHTMLAttributes, useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [note, setNote] = useState("")
  const [preView, setPreView] = useState(false)

  const KEY = "note.jxck.io" // storage key

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    localStorage.setItem(KEY, value)
    setNote(value)
  }

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    setPreView(!preView)
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>note.jxck.io</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <button type="button" onClick={onClick}>ok</button>
        {preView ?
          <div>{note.split("\n").map((line, i) => {
            return <p key={i}>{line}</p>
          })}</div>
          :
          <textarea autoFocus={true} onChange={onChange}>{note}</textarea>
        }
      </main>
    </div>
  )
}

export default Home
