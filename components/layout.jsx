import { AnimatePresence, motion } from 'framer-motion';
// import useWindowDimensions from './wd';
import dynamic from 'next/dynamic';
import Head from 'next/head';
// import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';

import checkLogin from '../lib/utils/checklogin';
import storage from '../lib/utils/storage';
import Footer from './footer';
import Header from './header';
import styles from './layout.module.scss';
// import LoginForm from './login-form';
import Maybe from './maybe';
// import RegistrationForm from './registration-form';

const MealForm = dynamic(() => import('./meal-form'));
const LoginForm = dynamic(() => import('./login-form'));
const RegistrationForm = dynamic(() => import('./registration-form'));

export const siteTitle = 'Mat';

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showMeal, setShowMeal] = useState(false);
  const { data: currentUser } = useSWR('user', storage);
  const isLoggedIn = checkLogin(currentUser);
  // const { t } = useTranslation(['glossary', 'common']);
  const login = useRef(null);
  const register = useRef(null);
  const meal = useRef(null);

  useEffect(() => {
    // only add the event listener when the dropdown is opened
    if (!showLogin) return;
    function handleClick(e) {
      if (login.current && !login.current.contains(e.target)) {
        setShowLogin(false);
      }
    }
    window.addEventListener('click', handleClick);
    // clean up
    return () => window.removeEventListener('click', handleClick);
  }, [showLogin]);

  useEffect(() => {
    // only add the event listener when the dropdown is opened
    if (!showRegister) return;
    function handleClick(e) {
      if (register.current && !register.current.contains(e.target)) {
        setShowRegister(false);
      }
    }
    window.addEventListener('click', handleClick);
    // clean up
    return () => window.removeEventListener('click', handleClick);
  }, [showRegister]);

  const openClose = (e) => {
    switch (e) {
      case 'login':
        setShowLogin(true);
        break;
      case 'register':
        setShowRegister(true);
        break;
      case 'meal':
        setShowMeal(!showMeal);
        break;
      default:
        setShowLogin(false);
        setShowRegister(false);
        setShowMeal(false);
        break;
    }
  };

  const hideShowAddMeal = {
    expanded: {
      y: 0,
      opacity: 1,
      zIndex: 800,
      transition: 'easeInOut'
    },
    collapsed: {
      y: -200,
      opacity: 0,
      zIndex: 100,
      transition: 'easeInOut'
    }
  };

  const hideShowForm = {
    expanded: {
      y: '0%',
      x: '50%',
      opacity: 1,
      zIndex: 800,
      transition: 'easeInOut'
    },
    collapsed: {
      y: '50%',
      x: '50%',
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
        <script src="/javascript/scrollhide.js" key="scrollhide" />
      </Head>
      <Header handleForm={openClose} open={showMeal} />
      <Maybe test={isLoggedIn} key="loggedIn">
        <AnimatePresence>
          <motion.div
            ref={meal}
            key="meal"
            className={`${styles.overlayAddMeal} bg-addmeal col-12 col-md-6`}
            variants={hideShowAddMeal}
            animate={showMeal ? 'expanded' : 'collapsed'}
            initial={false}
            exit={{ opacity: 0 }}>
            {showMeal && <MealForm />}
          </motion.div>
        </AnimatePresence>
      </Maybe>
      <Maybe test={!isLoggedIn} key="notLoggedIn">
        <AnimatePresence>
          <motion.div
            ref={login}
            key="login"
            className={`${styles.overlayLogin} bg-auth`}
            variants={hideShowForm}
            animate={showLogin ? 'expanded' : 'collapsed'}
            initial={false}
            exit={{ opacity: 0 }}>
            {showLogin && <LoginForm handleForm={openClose} />}
          </motion.div>
          <motion.div
            ref={register}
            key="register"
            className={`${styles.overlayLogin} bg-auth`}
            variants={hideShowForm}
            animate={showRegister ? 'expanded' : 'collapsed'}
            initial={false}
            exit={{ opacity: 0 }}>
            {showRegister && <RegistrationForm />}
          </motion.div>
        </AnimatePresence>
      </Maybe>
      {children}
      <Footer />
    </>
  );
}
