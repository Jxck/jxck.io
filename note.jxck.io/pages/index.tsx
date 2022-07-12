import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [note, setNote] = useState("foo")

  const onChange = (e) => {
    console.log({e})
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>note.jxck.io</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <button type="button">ok</button>
        <textarea onChange={onChange}></textarea>
        <div>{note}</div>
      </main>
    </div>
  )
}

export default Home
