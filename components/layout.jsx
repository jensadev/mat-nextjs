import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
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
import LoginForm from './login-form';
import Maybe from './maybe';

const MealForm = dynamic(() => import('./meal-form'));
// import MealForm from './meal-form';
// import Navbar from './navbar';

export const siteTitle = 'Mat';

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  // const { height, width } = useWindowDimensions();
  const [open, setOpen] = useState({
    login: false,
    register: false,
    addMeal: false
  });
  const { data: currentUser } = useSWR('user', storage);
  const isLoggedIn = checkLogin(currentUser);
  const { t } = useTranslation(['glossary', 'common']);

  const openClose = (e) => {
    switch (e) {
      case 'login':
        setOpen({
          login: !open.login,
          register: false,
          addMeal: false
        });
        break;
      case 'register':
        setOpen({
          login: false,
          register: !open.register,
          addMeal: false
        });
        break;
      case 'meal':
        setOpen({
          login: false,
          register: false,
          addMeal: !open.addMeal
        });
        break;
      default:
        setOpen({
          login: false,
          register: false,
          addMeal: false
        });
        break;
    }
  };

  const hideShowAddMeal = {
    expanded: {
      y: 0,
      opacity: 1,
      zIndex: 1020,
      transition: 'easeInOut'
    },
    collapsed: {
      y: -200,
      opacity: 0,
      transition: 'easeInOut'
    }
  };

  const hideShowForm = {
    expanded: {
      y: '0%',
      opacity: 1,
      zIndex: 1020,
      transition: 'easeInOut'
    },
    collapsed: {
      y: '50%',
      opacity: 0,
      zIndex: 100,
      transition: 'easeInOut'
    }
  };

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
        <script src="/javascript/scrollhide.js" />
      </Head>
      <Header handleForm={openClose} open={open} />
      <Maybe test={isLoggedIn} key="loggedIn">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            className={`${styles.overlayAddMeal} bg-addmeal col-12 col-md-6`}
            variants={hideShowAddMeal}
            animate={open.addMeal ? 'expanded' : 'collapsed'}
            initial={false}>
            {open.addMeal && <MealForm />}
          </motion.div>
        </AnimatePresence>
      </Maybe>
      <Maybe test={!isLoggedIn} key="notLoggedIn">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            className={`${styles.overlayLogin} bg-profile`}
            variants={hideShowForm}
            animate={open.login ? 'expanded' : 'collapsed'}
            initial={false}
            exit={{ opacity: 0 }}>
            {open.login && <LoginForm />}
          </motion.div>
        </AnimatePresence>
      </Maybe>
      {children}
      <Footer />
    </>
  );
}
