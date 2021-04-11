import Head from 'next/head';
// import Link from 'next/link';
// import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSWR from 'swr';

import Layout, { siteTitle } from '../components/layout';
import Maybe from '../components/maybe';
import MealForm from '../components/meal-form';
import MealList from '../components/meal-list';
import checkLogin from '../lib/utils/checklogin';
import storage from '../lib/utils/storage';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common', 'glossary']),
    },
  };
}

export default function Home() {
  const { data: currentUser } = useSWR('user', storage);
  const isLoggedIn = checkLogin(currentUser);
  // const { t } = useTranslation('common');
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <main
        className="d-flex h-100 justify-content-center flex-column"
      >
        <Maybe test={isLoggedIn}>
          <MealForm />
          <div className="h-50 w-100" style={{ backgroundColor: '#FF4D3C' }}>
            <div className="container">
              <MealList />
            </div>
          </div>
        </Maybe>
      </main>
    </Layout>
  );
}
