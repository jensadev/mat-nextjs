import Head from 'next/head';
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
      ...(await serverSideTranslations(locale, [
        'common',
        'glossary',
        'validation'
      ]))
    }
  };
}

export default function Dishes() {
  const { t } = useTranslation(['glossary']);
  const { data: currentUser } = useSWR('user', storage);
  const isLoggedIn = checkLogin(currentUser);
  return (
    <Layout dishes>
      <Head>
        <title>{`${siteTitle} - ${t('glossary:dishes')}`}</title>
      </Head>
      <main className="d-flex flex-column">
        <Maybe test={isLoggedIn}>
          <header className="page-header">
            <div className="container">
              <h1 className="page-heading">{t('glossary:dish_plural')}</h1>
            </div>
            <span className="bg-dish" />
          </header>
          <div className="content w-100">
            <div className="container" />
          </div>
        </Maybe>
      </main>
    </Layout>
  );
}
