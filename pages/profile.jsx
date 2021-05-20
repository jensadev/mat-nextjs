import { motion } from 'framer-motion';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ProfileForm from '../components/form-profile';
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

export default function Profile() {
    const { t } = useTranslation(['common', 'glossary']);
    const { isLoggedIn, currentUser } = useAppContext();

    return (
        <Layout profile>
            <Head>
                <title>{`${
                    currentUser && currentUser.family
                        ? t('glossary:yours_what', {
                              what: t('glossary:page', {
                                  count: 1
                              })
                          })
                        : t('glossary:my_what', {
                              count: 1,
                              what: t('glossary:page', {
                                  count: 1
                              })
                          })
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
                                    ? t('glossary:yours_what', {
                                          what: t('glossary:page', {
                                              count: 1
                                          })
                                      })
                                    : t('glossary:my_what', {
                                          count: 1,
                                          what: t('glossary:page', {
                                              count: 1
                                          })
                                      })}
                            </h1>
                        </div>
                    </motion.header>
                    <div className="container my-3">
                        <ProfileForm />
                    </div>
                </Maybe>
            </main>
        </Layout>
    );
}
