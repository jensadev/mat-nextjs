import { motion } from 'framer-motion';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useToasts } from 'react-toast-notifications';
import useSWR from 'swr';

import Layout, { siteTitle } from '../components/layout';
import Maybe from '../components/maybe';
import { useAppContext } from '../context/app-context';
import { pageItem } from '../lib/utils/animations';
import fetcher from '../lib/utils/fetcher';

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
    const { t } = useTranslation(['common', 'glossary']);
    const { isLoggedIn, currentUser } = useAppContext();
    const { addToast } = useToasts();
    const { data, error } = useSWR(`${process.env.apiUrl}/users`, fetcher);

    if (error) {
        return addToast(
            t('common:cant_load', {
                what: `${t('common:recent')} ${t('glossary:meal_plural')}`
            })
        );
    }

    console.log(data.user);

    return (
        <Layout profile>
            <Head>
                <title>{`${
                    currentUser && currentUser.family
                        ? t('common:our_page')
                        : t('common:my_page')
                } - ${siteTitle}`}</title>
            </Head>
            <main className="d-flex flex-column">
                <Maybe test={isLoggedIn}>
                    <motion.header
                        variants={pageItem}
                        initial="hidden"
                        animate="show"
                        className="page-header bg-profile">
                        <div className="container">
                            <h1 className="page-heading">
                                {currentUser && currentUser.family
                                    ? t('common:our_page')
                                    : t('common:my_page')}
                            </h1>
                        </div>
                    </motion.header>
                    <div className="container my-3">
                        {!data && (
                            <div className="position-absolute top-50 start-50 translate-middle">
                                <div
                                    className="spinner-border"
                                    style={{ width: '4rem', height: '4rem' }}
                                    role="status">
                                    <span className="visually-hidden">
                                        {t('common:loading')}...
                                    </span>
                                </div>
                            </div>
                        )}
                        {currentUser && (
                            <p className="lead">{`${t('common:welcome_back')} ${
                                currentUser.handle
                            }`}</p>
                        )}
                        {data && (
                            <>
                                <p>
                                    {t('glossary:whos_what', {
                                        whos: data.user.family
                                            ? t('yourss')
                                            : t('your'),
                                        what: t('email')
                                    })}
                                    : {data.user.email}
                                </p>
                                <p>
                                    {/* {t('glossary:profile_page.account_type')}:{' '} */}
                                    {data.user.family}
                                </p>
                                <p>
                                    {/* {t('glossary:profile_page.account_public')}:{' '} */}
                                    {data.user.public}
                                </p>
                                <p>
                                    {/* {t('glossary:profile_page.bio')}:  */}
                                    {data.user.bio}
                                </p>
                            </>
                        )}
                    </div>
                </Maybe>
            </main>
        </Layout>
    );
}
