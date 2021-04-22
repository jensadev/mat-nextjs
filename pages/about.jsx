import { motion } from 'framer-motion';
import Head from 'next/head';
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

export default function About() {
  const { t } = useTranslation(['common', 'glossary']);

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

  return (
    <Layout about>
      <Head>
        <title>{`${siteTitle} - ${t('common:about')}`}</title>
      </Head>
      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="d-flex h-100 flex-column justify-content-center">
        <motion.header variants={item} className="page-header bg-about">
          <div className="container">
            <h1 className="page-heading">
              {`${t('about', { what: t('thisweb') })}`}
            </h1>
          </div>
        </motion.header>
          <div className="container my-5">
            <h1>Infos</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore labore optio commodi harum asperiores dignissimos rem. Consequuntur quas tenetur vel nobis aliquid nisi cum ratione quasi consequatur. Ab, nesciunt explicabo.</p>
          </div>
      </motion.main>
    </Layout>
  );
}
