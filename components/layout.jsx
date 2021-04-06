import Head from 'next/head';
import Link from 'next/link';

import styles from './layout.module.css';
import Navbar from './navbar';

export const siteTitle = 'Mat';

// eslint-disable-next-line react/prop-types
export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Måltider"
        />
        <meta name="og:title" content={siteTitle} />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link rel="stylesheet" href="https://use.typekit.net/yis5dme.css" />
      </Head>
      <header className={styles.header}>
        <Navbar />
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
  );
}
