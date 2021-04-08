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
  const { t } = useTranslation('glossary');
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <main className="container d-flex h-100 align-items-center">
        <h1 className="heroH1">{t('meal')}</h1>
      </main>
    </Layout>
  );
}
