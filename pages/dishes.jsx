import { motion } from 'framer-motion';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AllDishes from '../components/dish/all';
import SuggestDish from '../components/dish/suggest';
import TopDishes from '../components/dish/top';
import Layout, { siteTitle } from '../components/layout';
import Maybe from '../components/maybe';
import { useAppContext } from '../context/app-context';
import { pageItem } from '../lib/utils/animations';

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
    const { isLoggedIn, currentUser } = useAppContext();
    return (
        <Layout dishes>
            <Head>
                <title>{`${t('glossary:dishes')} - ${siteTitle}`}</title>
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
                        <div className="row">
                            <TopDishes />
                            <SuggestDish />
                        </div>
                        <div className="row">
                            <AllDishes />
                        </div>
                    </div>
                </Maybe>
            </main>
        </Layout>
    );
}
