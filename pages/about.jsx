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

export default function About() {
    const { t } = useTranslation(['common']);

    return (
        <Layout about>
            <Head>
                <title>{`${siteTitle} - ${t('common:about')}`}</title>
            </Head>
            <main className="d-flex flex-column">
                <motion.header
                    initial="hidden"
                    animate="show"
                    variants={pageItem}
                    className="page-header bg-about">
                    <div className="container">
                        <h1 className="page-heading">
                            {`${t('common:what_about', {
                                what: t('common:this_web')
                            })}`}
                        </h1>
                    </div>
                </motion.header>
                <div className="container my-5">
                    <p className="lead">
                        {t('glossary:about_page.lead', { brand: siteTitle })}
                    </p>
                    <p>{t('glossary:about_page.p1')}</p>
                </div>
            </main>
        </Layout>
    );
}
