import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import checkLogin from '../lib/utils/checklogin';
import storage from '../lib/utils/storage';
import styles from './header.module.scss';
import Maybe from './maybe';
import useVisible from './use-visible';

const LoginForm = dynamic(() => import('./login-form'));
const RegistrationForm = dynamic(() => import('./registration-form'));
const MealForm = dynamic(() => import('./meal-form'));

export default function Header() {
  const router = useRouter();
  const { data: currentUser } = useSWR('user', storage);
  const isLoggedIn = checkLogin(currentUser);
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation(['glossary', 'common']);
  const pages = ['meals', 'dishes', 'profile'];
  const {
    ref: loginForm,
    isVisible: isLoginVisible,
    setIsVisible: setIsLoginVisible
  } = useVisible(false);
  const {
    ref: registerForm,
    isVisible: isRegisterVisible,
    setIsVisible: setIsRegisterVisible
  } = useVisible(false);
  const {
    ref: addMealForm,
    isVisible: isAddMealVisible,
    setIsVisible: setIsAddMealVisible
  } = useVisible(false);
  // const handleClick = (e) => {
  //   showHideForm(e.target.dataset.action);
  // };
  const authFormAnimation = {
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
  const mealFormAnimation = {
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
  useEffect(() => {
    if (isLoggedIn) {
      const bubble = localStorage.getItem('bubble');
      if (!bubble) {
        setVisible(true);
        localStorage.setItem('bubble', 1);
      }
    }
  }, [visible]);

  return (
    <>
      <header id="header" className={`${styles.header} fixed-top`}>
        <div className="container d-flex justify-content-between align-items-center py-3">
          <div className="d-flex">
            <Link href="/">
              <img
                alt="logo"
                className={styles.logo}
                src="/images/logo.svg"
                height={64}
                width={64}
              />
            </Link>
            <Maybe test={isLoggedIn}>
              <nav className="d-none d-md-flex">
                <ul className="nav-list">
                  {router.pathname !== '/' &&
                    pages.map((page) =>
                      router.pathname.replace('/', '') !== page ? (
                        <li className="ps-5" key={page}>
                          <Link href={`/${page}`}>
                            <a className={`link-${page}`}>
                              {t(`glossary:${page}`)}
                            </a>
                          </Link>
                        </li>
                      ) : (
                        ''
                      )
                    )}
                </ul>
              </nav>
            </Maybe>
          </div>
          <Maybe test={!isLoggedIn}>
            <div className="d-flex">
              <div>
                <button
                  type="button"
                  onClick={(e) => setIsLoginVisible(!isLoginVisible)}
                  className="btn link-header">
                  {t('common:login')}
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={(e) => setIsRegisterVisible(!isRegisterVisible)}
                  className="btn link-header">
                  {t('common:register')}
                </button>
              </div>
            </div>
          </Maybe>
          <Maybe test={isLoggedIn}>
            <div className="position-relative">
              {isAddMealVisible && (
                <div
                  style={{
                    position: 'absolute',
                    width: '90px',
                    height: '80px'
                  }}
                />
              )}
              <button
                type="button"
                onClick={() => setIsAddMealVisible(!isAddMealVisible)}
                className={`btn ${styles.btnAdd}`}>
                <span className="visually-hidden">
                  {t('common:add', { what: t('glossary:meal') })}
                </span>
                {isAddMealVisible ? (
                  <motion.span
                    initial={{ rotate: 0 }}
                    animate={{
                      rotate: 180
                    }}
                    className={`material-icons-round md-64 ${styles.close}`}>
                    cancel
                  </motion.span>
                ) : (
                  <motion.span
                    className={`material-icons-round md-64 ${styles.open}`}>
                    add
                  </motion.span>
                )}
              </button>
              {visible && (
                <motion.div
                  initial={{
                    opacity: 0,
                    x: -200
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  className="position-absolute end-0">
                  <button
                    type="button"
                    onClick={() => setVisible(false)}
                    className={`${styles.bubble} ${styles.speech}`}>
                    {t('glossary:clickheretoadd')}
                  </button>
                </motion.div>
              )}
            </div>
          </Maybe>
        </div>
      </header>
      <Maybe test={!isLoggedIn} key="notLoggedIn">
        <AnimatePresence>
          <motion.div
            ref={loginForm}
            key="login"
            className={`${styles.overlayLogin} bg-auth`}
            variants={authFormAnimation}
            animate={isLoginVisible ? 'expanded' : 'collapsed'}
            initial={false}
            exit={{ opacity: 0 }}>
            {isLoginVisible && <LoginForm />}
          </motion.div>
          <motion.div
            ref={registerForm}
            key="register"
            className={`${styles.overlayLogin} bg-auth`}
            variants={authFormAnimation}
            animate={isRegisterVisible ? 'expanded' : 'collapsed'}
            initial={false}
            exit={{ opacity: 0 }}>
            {isRegisterVisible && <RegistrationForm />}
          </motion.div>
        </AnimatePresence>
      </Maybe>
      <Maybe test={isLoggedIn} key="loggedIn">
        <AnimatePresence>
          <motion.div
            ref={addMealForm}
            key="meal"
            className={`${styles.overlayAddMeal} bg-addmeal col-12 col-md-6`}
            variants={mealFormAnimation}
            animate={isAddMealVisible ? 'expanded' : 'collapsed'}
            initial={false}
            exit={{ opacity: 0 }}>
            {isAddMealVisible && <MealForm />}
          </motion.div>
        </AnimatePresence>
      </Maybe>
    </>
  );
}
