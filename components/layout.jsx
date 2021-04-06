import Head from 'next/head';

import Footer from './footer';
import Navbar from './navbar';

export const siteTitle = 'Mat';

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Måltider"
        />
        <meta name="og:title" content={siteTitle} />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://use.typekit.net/yis5dme.css" />
      </Head>
      <Navbar />
      {children}
      {/* {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )} */}
      <Footer />
    </>
  );
}
