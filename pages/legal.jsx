import { motion } from 'framer-motion';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout, { siteTitle } from '../components/layout';
import { pageContainer, pageItem } from '../lib/utils/animations';

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

export default function Legal() {
    const { t } = useTranslation(['common', 'glossary']);

    return (
        <Layout legal>
            <Head>
                <title>{`${siteTitle} - ${t('common:terms')}`}</title>
            </Head>
            <main className="d-flex flex-column">
                <motion.header
                    variants={pageItem}
                    initial="hidden"
                    animate="show"
                    className="page-header bg-legal">
                    <div className="container">
                        <h1 className="page-heading">{t('common:terms')}</h1>
                    </div>
                </motion.header>
                <div className="container my-3">
                    <p className="lead">
                        {t('glossary:legal_page.cookie_header')}.{' '}
                        {t('glossary:legal_page.cookie_lead')}
                    </p>
                    <h2>{t('common:cookie_plural')}</h2>
                    <p>{t('glossary:legal_page.cookie_text_1')}</p>
                    <p>{t('glossary:legal_page.cookie_text_2')}</p>
                    <h2>{t('common:contact')}</h2>
                    <p>{t('glossary:legal_page.cookie_text_3')}</p>
                </div>
            </main>
        </Layout>
    );
}
