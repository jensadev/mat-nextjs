import { motion } from 'framer-motion';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout, { siteTitle } from '../components/layout';

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
        <Layout legal>
            <Head>
                <title>{`${siteTitle} - ${t('common:terms')}`}</title>
            </Head>
            <motion.main
                variants={container}
                initial="hidden"
                animate="show"
                className="d-flex flex-column">
                <motion.header variants={item} className="page-header bg-legal">
                    <div className="container">
                        <h1 className="page-heading">{t('common:terms')}</h1>
                    </div>
                </motion.header>
                <div className="container my-5">
                    <h1>{t('glossary:legal_page.cookie_header')}</h1>
                    <p className="lead">
                        {t('glossary:legal_page.cookie_lead')}
                    </p>
                    <h2>{t('common:cookie_plural')}</h2>
                    <p>{t('glossary:legal_page.cookie_text_1')}</p>
                    <p>{t('glossary:legal_page.cookie_text_2')}</p>
                    <h2>{t('common:contact')}</h2>
                    <p>{t('glossary:legal_page.cookie_text_3')}</p>
                </div>
            </motion.main>
        </Layout>
    );
}
