import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../public/styles/utils.module.css'
import Link from 'next/link'

export const TITLE = 'Web 技術解体新書 Review'

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <h1 className={utilStyles.heading2Xl}>{TITLE}</h1>
          </>
        ) : (
          <>
            <Link href="/">top</Link>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
