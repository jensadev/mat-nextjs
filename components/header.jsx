import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import router from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import useSWR from 'swr';

import checkLogin from '../lib/utils/checklogin';
import storage from '../lib/utils/storage';
import styles from './header.module.scss';
import Maybe from './maybe';

export default function Header(props) {
  const router = useRouter();
  const { data: currentUser } = useSWR('user', storage);
  const isLoggedIn = checkLogin(currentUser);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation(['glossary', 'common']);
  const pages = ['meals', 'dishes', 'profile'];
  const handleOpen = () => {
    // window.history.pushState('mealform', 'Add meal', '?mealform');
    // router.push('', undefined, { shallow: true });

    open ? setOpen(false) : setOpen(true);
    props.handleForm();
  };
  // const handleClose = () => {
  //   window.history.pushState('page2', 'Title of this page', '?/Home-URL');
  //   // router.push(p, undefined, { shallow: true })
  //   // setOpen(false);
  // };

  return (
    <>
      <header id="header" className={`${styles.header} fixed-top`}>
        <div className="container d-flex justify-content-between align-items-center py-3">
          <div className="d-flex">
            <Link
              href="/"
            >
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
                  {router.pathname !== '/'
                && pages.map((page) => (
                  router.pathname.replace('/', '') !== page
                    ? (
                      <li className="ps-3" key={page}>
                        <Link href={`/${page}`}>
                          <a className={`link-${page}`}>{t(`glossary:${page}`)}</a>
                        </Link>
                      </li>
                    )
                    : ''
                ))}
                </ul>
              </nav>
            </Maybe>
          </div>
          <Maybe test={!isLoggedIn}>
            <div>
              <Link
                href="/login"
              >
                <a className="btn">{t('common:login')}</a>
              </Link>
              <Link
                href="/register"
              >
                <a className="btn">{t('common:register')}</a>
              </Link>
            </div>
          </Maybe>
          <Maybe test={isLoggedIn}>
            <button
              type="button"
              className="btn rounded-circle"
              onClick={handleOpen}
            >
              {open
                ? (
                  <motion.span
                    initial={
                      { rotate: 0 }
                    }
                    animate={{
                      rotate: 180,
                    }}
                    className={`material-icons-round md-64 ${styles.close}`}
                  >
                    cancel
                  </motion.span>
                )
                : (
                  <motion.span
                    className={`material-icons-round md-64 ${styles.open}`}
                  >
                    add
                  </motion.span>
                )}
            </button>
          </Maybe>
        </div>
      </header>
    </>
  );
}
