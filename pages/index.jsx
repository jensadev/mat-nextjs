import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSWR from 'swr';

import Layout, { siteTitle } from '../components/layout';
import Maybe from '../components/maybe';
import checkLogin from '../lib/utils/checklogin';
import storage from '../lib/utils/storage';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'glossary']))
    }
  };
}

export default function Home() {
  const { data: currentUser } = useSWR('user', storage);
  const isLoggedIn = checkLogin(currentUser);
  // const easing = [0.6, -0.05, 0.01, 0.99];

  // const fadeInUp = {
  //   initial: {
  //     y: -400,
  //     opacity: 0,
  //   },
  //   animate: {
  //     y: 0,
  //     opacity: 1,
  //     transition: {
  //       duration: 0.6,
  //       ease: 'easeInOut',
  //     },
  //   },
  //   exit: {
  //     y: -400,
  //     opacity: 0,
  //   },
  // };

  // const stagger = {
  //   animate: {
  //     transition: {
  //       staggerChildren: 0.2,
  //     },
  //   },
  // };
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: -400 },
    show: { opacity: 1, y: 0 }
  };
  // const variants = {
  //   visible: { opacity: 1 },
  //   hidden: {
  //     opacity: 0,
  //   },
  // };

  const { t } = useTranslation('glossary');
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="d-flex h-100 flex-column justify-content-center">
        <Maybe test={isLoggedIn}>
          <Link href="/meals">
            <motion.div variants={item} className="row-3 meal pointer">
              <div className="container">
                <h1 className="heroH1">{t('glossary:meal_plural')}</h1>
              </div>
              <span className="bg-meal" />
            </motion.div>
          </Link>
          <Link href="/dishes">
            <motion.div variants={item} className="row-3 dish pointer">
              <div className="container">
                <h1 className="heroH1">{t('glossary:dish_plural')}</h1>
              </div>
              <span className="bg-dish" />
            </motion.div>
          </Link>
          <Link href="/profile">
            <motion.div variants={item} className="row-3 profile pointer">
              <div className="container">
                <h1 className="heroH1">
                  {currentUser && currentUser.family
                    ? t('common:ourpage')
                    : t('common:mypage')}
                </h1>
              </div>
              <span className="bg-profile" />
            </motion.div>
          </Link>
        </Maybe>
        <Maybe test={!isLoggedIn}>
          <motion.div variants={item} className="row-3 meal">
            <div className="container">
              <h1 className="heroH1-nolink">{t('glossary:meal_plural')}</h1>
              <p className="lead">{t('aboutmeals')}</p>
            </div>
            <span className="bg-meal" />
          </motion.div>
          <motion.div variants={item} className="row-3 dish">
            <div className="container">
              <h1 className="heroH1-nolink">{t('glossary:dish_plural')}</h1>
              <p className="lead">{t('aboutdishes')}</p>
            </div>
            <span className="bg-dish" />
          </motion.div>
          <Link href="/about">
            <motion.div variants={item} className="row-6 about pointer">
              <div className="container">
                <h1 className="heroH1">{t('common:about')}</h1>
                <p className="lead">
                  {t('aboutintro', {
                    brand: 'Måltidsmatloggen',
                    who: t('you')
                  })}
                </p>
              </div>
              <span className="bg-about" />
            </motion.div>
          </Link>
        </Maybe>
      </motion.main>
    </Layout>
  );
}
