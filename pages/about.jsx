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
  return (
    <Layout about>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <main className="d-flex flex-shrink-0 flex-column justify-content-center">
        <header className="page-header">
          <div className="container">
            <h1 className="page-heading">
              {`${t('about', { what: t('thisweb') })}`}
            </h1>
          </div>
          <span className="bg-about" />
        </header>
        <div className="content w-100">
          <div className="container">
            <h1>Infos</h1>
          </div>
        </div>
      </main>
    </Layout>
  );
}
