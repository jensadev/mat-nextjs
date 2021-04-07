import Head from 'next/head';
// import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import useSWR from 'swr';

import Layout, { siteTitle } from '../components/layout';
import Maybe from '../components/maybe';
import MealList from '../components/meal-list';
import checkLogin from '../lib/utils/checklogin';
import storage from '../lib/utils/storage';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common', 'navbar']),
    },
  };
}

export default function Home() {
  const { data: currentUser } = useSWR('user', storage);
  const isLoggedIn = checkLogin(currentUser);
  const [pageIndex, setPageIndex] = useState(1);

  const { t } = useTranslation('common');
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <main className="container d-flex h-100 align-items-center">
        <Maybe test={isLoggedIn}>
          <div>
            <MealList index={pageIndex} />
            <div style={{ display: 'none' }}><MealList index={pageIndex + 1} /></div>
            <button type="button" onClick={() => setPageIndex(pageIndex - 1)}>{t('previous')}</button>
            <button type="button" onClick={() => setPageIndex(pageIndex - 1)}>{pageIndex - 1}</button>
            <button type="button" onClick={() => setPageIndex(pageIndex)}>{pageIndex}</button>
            <button type="button" onClick={() => setPageIndex(pageIndex + 1)}>{pageIndex + 1}</button>
            <button type="button" onClick={() => setPageIndex(pageIndex + 1)}>{t('next')}</button>
          </div>
        </Maybe>
      </main>
    </Layout>
  );
}
