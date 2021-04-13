import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
// import router from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';

import checkLogin from '../lib/utils/checklogin';
import storage from '../lib/utils/storage';
import styles from './header.module.scss';
import Maybe from './maybe';

export default function Header(props) {
  const { data: currentUser } = useSWR('user', storage);
  const isLoggedIn = checkLogin(currentUser);
  const [open, setOpen] = useState(false);

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
      <Head>
        <script src="/javascript/scrollhide.js" />
      </Head>
      <header id="header" className={`${styles.header} fixed-top`}>
        <div className="container d-flex justify-content-between align-items-center">
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
