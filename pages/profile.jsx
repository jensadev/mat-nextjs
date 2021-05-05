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

export default function Profile() {
    const { t } = useTranslation(['common']);
    const { data: currentUser } = useSWR('user', storage);
    const isLoggedIn = checkLogin(currentUser);

    return (
        <Layout profile>
            <Head>
                <title>{`${siteTitle} - ${
                    currentUser && currentUser.family
                        ? t('common:our_page')
                        : t('common:my_page')
                }`}</title>
            </Head>
            <motion.main
                variants={pageContainer}
                initial="hidden"
                animate="show"
                className="d-flex flex-column">
                <Maybe test={isLoggedIn}>
                    <motion.header
                        variants={pageItem}
                        className="page-header bg-profile">
                        <div className="container">
                            <h1 className="page-heading">
                                {currentUser && currentUser.family
                                    ? t('common:our_page')
                                    : t('common:my_page')}
                            </h1>
                        </div>
                    </motion.header>
                    <div className="container my-5">
                        {currentUser && (
                            <h1>{`${t('common:welcome_back')} ${
                                currentUser.handle
                            }`}</h1>
                        )}
                    </div>
                </Maybe>
            </motion.main>
        </Layout>
    );
}
