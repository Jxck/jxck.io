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
      <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/components/prism-core.min.js" integrity="sha512-9khQRAUBYEJDCDVP2yw3LRUQvjJ0Pjx0EShmaQjcHa6AXiOv6qHQu9lCAIR8O+/D8FtaCoJ2c0Tf9Xo7hYH01Q==" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/plugins/autoloader/prism-autoloader.min.js" integrity="sha512-fTl/qcO1VgvKtOMApX2PdZzkziyr2stM65GYPLGuYMnuMm1z2JLJG6XVU7C/mR+E7xBUqCivykuhlzfqxXBXbg==" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
     </div>
  );
};

export default Layout;
