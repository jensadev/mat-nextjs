/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import useSWR from 'swr';

import checkLogin from '../lib/utils/checklogin';
import storage from '../lib/utils/storage';
import Maybe from './maybe';
import Link from './nav-link';
import styles from './navbar.module.scss';

export default function Navbar() {
  const { data: currentUser } = useSWR('user', storage);
  const isLoggedIn = checkLogin(currentUser);
  const { t } = useTranslation('navbar');
  return (
    <>
      <Head>
        <script src="/javascript/navbar.js" />
      </Head>
      <nav id="navbar" className={styles.navbar}>
        <Link href="/">
          <a>{t('home')}</a>
        </Link>
        <Link href="/login">
          <a>{t('login')}</a>
        </Link>
        <Link href="/register">
          <a>{t('register')}</a>
        </Link>
        <Maybe test={isLoggedIn}>
          <Link href={`/profile/${currentUser?.handle}`}>
            <a>{currentUser?.handle}</a>
          </Link>
        </Maybe>
      </nav>
    </>
  );
}
