import Head from 'next/head';

// import { useTranslation } from 'next-i18next';
import Footer from './footer';
import Header from './header';

// import LoginForm from './login-form';

// import RegistrationForm from './registration-form';

export const siteTitle = 'Mat';

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  return (
    <>
      <Head>
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
