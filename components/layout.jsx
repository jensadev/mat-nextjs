import Head from 'next/head';

import Footer from './footer';
import Header from './header';

export const siteTitle = 'Mat';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-H5GZSB80BD"></script>
        <script async src="/javascript/ga.js"></script>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Måltider" />
        <meta name="og:title" content={siteTitle} />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://use.typekit.net/yis5dme.css" />
        <script src="/javascript/scrollhide.js" key="scrollhide" />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
}
