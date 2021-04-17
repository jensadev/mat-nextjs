import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import router from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import checkLogin from '../lib/utils/checklogin';
import storage from '../lib/utils/storage';
import styles from './header.module.scss';
import Maybe from './maybe';

export default function Header({ open, handleForm }) {
  const router = useRouter();
  const { data: currentUser } = useSWR('user', storage);
  const isLoggedIn = checkLogin(currentUser);

  const { t } = useTranslation(['glossary', 'common']);
  const pages = ['meals', 'dishes', 'profile'];
  const handleOpen = (e) => {
    handleForm(e.target.dataset.action);
  };

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (isLoggedIn) {
      const bubble = localStorage.getItem('bubble');
      if (!bubble) {
        setVisible(true);
        localStorage.setItem('bubble', 1);
      }
    }
  }, [visible]);

  // const showBubble = localStorage.getItem('bubble');
  // const handleBubble = () => {
  //   localStorage.setItem('bubble', false);
  // };

  return (
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
                data-action="login"
                type="button"
                onClick={handleOpen}
                className="btn link-header">
                {t('common:login')}
              </button>
            </div>
            <div>
              <button
                data-action="register"
                type="button"
                onClick={handleOpen}
                className="btn link-header">
                {t('common:register')}
              </button>
            </div>
          </div>
        </Maybe>
        <Maybe test={isLoggedIn}>
          <div className="position-relative">
            <button
              data-action="meal"
              type="button"
              className={`btn ${styles.btnAdd}`}
              onClick={handleOpen}>
              <span className="visually-hidden">
                {t('common:add', { what: t('glossary:meal') })}
              </span>
              {open.addMeal ? (
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
  );
}
