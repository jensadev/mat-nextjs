import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout, { siteTitle } from '../components/layout';
import RegisterForm from '../components/register-form';

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
    <Layout register>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <main
        className="d-flex h-100 justify-content-center flex-column"
      >
        <div className="h-50 w-100" style={{ backgroundColor: '#956FDE' }}>
          <div className="container">
            <h1>{t('register')}</h1>
            <RegisterForm />
          </div>

        </div>
      </main>
    </Layout>
  );
}
