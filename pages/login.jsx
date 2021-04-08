import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout, { siteTitle } from '../components/layout';
import LoginForm from '../components/login-form';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common', 'glossary']),
    },
  };
}

export default function Login() {
  const { t } = useTranslation(['common', 'glossary']);
  return (
    <Layout login>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1>{t('login')}</h1>
      <LoginForm />
      <p>
        {t('noaccount')}
        {', '}
        <Link href="/register">
          <a>{t('noaccountlink')}</a>
        </Link>
      </p>
    </Layout>
  );
}
