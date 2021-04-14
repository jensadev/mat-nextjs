import { AnimatePresence, motion } from 'framer-motion';
// import useWindowDimensions from './wd';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import useSWR from 'swr';

import checkLogin from '../lib/utils/checklogin';
import storage from '../lib/utils/storage';
// import { useEffect, useState } from 'react';
import Footer from './footer';
import Header from './header';
import styles from './layout.module.scss';
import Maybe from './maybe';

const MealForm = dynamic(() => import('./meal-form'));
// import MealForm from './meal-form';
// import Navbar from './navbar';

export const siteTitle = 'Mat';

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  // const { height, width } = useWindowDimensions();
  const [open, setOpen] = useState(false);
  const { data: currentUser } = useSWR('user', storage);
  const isLoggedIn = checkLogin(currentUser);
  const { t } = useTranslation(['glossary', 'common']);

  const openClose = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const hideShowForm = {
    expanded: {
      y: 0,
      opacity: 1,
      zIndex: 200,
      transition: 'easeInOut',
    },
    collapsed: {
      y: -200,
      opacity: 0,
      zIndex: -1,
      transition: 'easeInOut',
    },
  };
  return (
    // <motion.div
    //   className="d-flex h-100 flex-column"
    //   initial={{ x: '20%', opacity: 0 }}
    //   animate={{
    //     x: 0, opacity: 1, backgroundColor: '#fee4d1',
    //   }}
    //   exit={{ x: '20%', opacity: 0 }}
    //   transition={spring} // {{ ease: 'easeOut', duration: 0.2 }}
    // >
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
        <script src="/javascript/scrollhide.js" />
      </Head>
      <Header handleForm={openClose} />
      {/* {open
        && ( */}
      <Maybe test={isLoggedIn}>
        <AnimatePresence>
          <motion.div
            className={`${styles.overlay} col-12 col-md-6`}
            variants={hideShowForm}
            animate={open ? 'expanded' : 'collapsed'}
            // style={open ? { zIndex: 200 } : { zIndex: 0 }}
            initial={false}
          >
            <div className="d-flex flex-column h-100 px-md-5">
              <header className="page-header">
                <div className="container ">
                  <h1 className="page-heading">{t('common:add', { what: t('glossary:meal') })}</h1>
                </div>
              </header>
              <div className="content w-100">
                <div className="container ">
                  <MealForm />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Maybe>
      {/* )} */}
      {children}
      <Footer />
      {/* </motion.div> */}
    </>
  );
}
