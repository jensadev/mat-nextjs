import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout, { siteTitle } from '../layout';
import LoginForm from '../login-form';

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'glossary']))
        }
    };
}
const spring = {
    type: 'spring',
    stiffness: 500,
    damping: 30
};

export default function Login() {
    const { t } = useTranslation(['common', 'glossary']);
    return (
        <Layout login>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <main className="d-flex h-100 justify-content-center flex-column">
                <div
                    className="h-50 w-100"
                    style={{ backgroundColor: '#FEDA3C' }}>
                    <div className="container">
                        <h1 className="heroH1">{t('login')}</h1>
                        <LoginForm />
                        <p>
                            {t('noaccount')}
                            {', '}
                            <Link href="/register">
                                <a>{t('noaccountlink')}</a>
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
