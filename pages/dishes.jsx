import { motion } from 'framer-motion';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSWR from 'swr';

import Layout, { siteTitle } from '../components/layout';
import Maybe from '../components/maybe';
import { pageContainer, pageItem } from '../lib/utils/animations';
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
                    <motion.header
                        variants={pageItem}
                        initial="hidden"
                        animate="show"
                        className="page-header bg-dish">
                        <div className="container">
                            <h1 className="page-heading">
                                {t('glossary:list_of', {
                                    whos:
                                        currentUser && currentUser.family
                                            ? t('glossary:era')
                                            : t('glossary:dina'),
                                    what: t('glossary:dish_plural')
                                })}
                            </h1>
                        </div>
                    </motion.header>
                    <div className="container my-3">
                        <div className="container" />
                    </div>
                </Maybe>
            </main>
        </Layout>
    );
}
