import { motion } from 'framer-motion';
import Head from 'next/head';
// import Link from 'next/link';
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
      y: 60,
      opactity: 0,
    },
    animate: {
      y: 0,
      opactity: 1,
      transition: {
        duration: 0.6,
        ease: easing,
      },
    },
  };
  const spring = {
    type: 'spring',
    stiffness: 500,
    damping: 30,
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const { t } = useTranslation('glossary');
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <motion.main
        className="d-flex h-100 align-items-center"
      >
        <motion.div
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
        </motion.div>
      </motion.main>
    </Layout>
  );
}
