import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout, { siteTitle } from '../components/layout';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common', 'glossary']),
    },
  };
}

export default function Home() {
  const easing = [0.6, -0.05, 0.01, 0.99];

  const fadeInUp = {
    initial: {
      y: -400,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      },
    },
    exit: {
      y: -400,
      opacity: 0,
    },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: -400 },
    show: { opacity: 1, y: 0 },
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
        className="d-flex h-100 flex-column justify-content-center"
      >
        <Link
          href="/meals"
        >
          <motion.div variants={item} className="meal">
            <div className="container">
              <h1 className="heroH1">{t('glossary:meal_plural')}</h1>
            </div>
            <span className="bg-meal" />
          </motion.div>
        </Link>

        <Link
          href="/dishes"
        >
          <motion.div variants={item} className="dish">
            <div className="container">
              <h1 className="heroH1">{t('glossary:dish_plural')}</h1>
            </div>
            <span className="bg-dish" />
          </motion.div>
        </Link>

        <Link
          href="/about"
        >
          <motion.div variants={item} className="about">
            <div className="container">
              <h1 className="heroH1">{t('glossary:about')}</h1>
            </div>
            <span className="bg-about" />
          </motion.div>
        </Link>

        {/* <motion.div
          className="h-50 w-100"
          initial={{ x: '20%', opacity: 0 }}
          animate={{
            x: 0, opacity: 1,
          }}
          exit={{ x: '20%', opacity: 0 }}
          transition={spring}
          style={{ backgroundColor: '#44D19D' }}
        >
          <div className="container">
            <h1 className="heroH1">{t('meal')}</h1>
          </div>
        </motion.div> */}
        {/* <motion.section
          key="1"
          // initial={{ y: -400, opacity: 0 }}
          // animate={{ y: 0, opacity: 1 }}
          // exit={{ y: -400, opacity: 0 }}
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          exit="exit"
          className="meal col-4"
        >
          <div className="container">
            <Link
              href="/meals"
            >
              <h1 className="heroH1">{t('glossary:meal_plural')}</h1>
            </Link>
          </div>
        </motion.section>
        <motion.section
          key="2"
          // initial={{ y: -400, opacity: 0 }}
          // animate={{ y: 0, opacity: 1 }}
          // exit={{ y: -400, opacity: 0 }}
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          exit="exit"
          className="dish col-4"
        >
          <div className="container">
            <Link
              href="/dishes"
            >
              <h1 className="heroH1">{t('glossary:dish_plural')}</h1>
            </Link>
          </div>
        </motion.section>
        <motion.section
          key="3"
          // initial={{ y: -400, opacity: 0 }}
          // animate={{ y: 0, opacity: 1 }}
          // exit={{ y: -400, opacity: 0 }}
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          exit="exit"
          className="about col-4"
        >
          <div className="container">
            <Link
              href="/about"
            >
              <h1 className="heroH1">{t('common:about')}</h1>
            </Link>
          </div>
        </motion.section> */}
      </motion.main>
    </Layout>
  );
}
