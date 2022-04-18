import Head from "next/head";
import Link from "next/link";
import styles from "./layout.module.css";

export const TITLE = "Web 技術解体新書 Review";

type Props = {
  children: React.ReactNode;
  home?: boolean;
};

const Layout = ({ children, home }: Props) => {
  function Back({ home }: { home?: boolean }) {
    if (home) return <></>;
    return (
      <div className={styles.backToHome}>
        <Link href="/">&lt; Back</Link>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
      <footer>
        <Link href="/">Back</Link>
      </footer>
    </div>
  );
};

export default Layout;
