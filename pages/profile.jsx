import { motion } from 'framer-motion';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useToasts } from 'react-toast-notifications';
import useSWR, { mutate } from 'swr';

import Layout, { siteTitle } from '../components/layout';
import Loading from '../components/loading';
import Maybe from '../components/maybe';
import BioForm from '../components/profile/form-bio';
import EmailForm from '../components/profile/form-email';
import FamilyForm from '../components/profile/form-family';
import PublicForm from '../components/profile/form-public';
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
                what: t('common:user')
            })
        );
    }

    const onUpdate = () => {
        mutate(`${process.env.apiUrl}/users`);
        console.table(data);
    };

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
                        {!data && <Loading />}
                        {currentUser && (
                            <p className="lead">{`${t('common:welcome_back')} ${
                                currentUser.handle
                            }`}</p>
                        )}
                        {data && (
                            <>
                                <FamilyForm
                                    family={data.user.family}
                                    onChange={onUpdate}
                                />
                                <PublicForm
                                    profilePublic={data.user.public}
                                    onChange={onUpdate}
                                />
                                <EmailForm
                                    email={data.user.email}
                                    onChange={onUpdate}
                                />
                                <BioForm
                                    bio={data.user.bio}
                                    onChange={onUpdate}
                                />
                            </>
                        )}
                    </div>
                </Maybe>
            </main>
        </Layout>
    );
}
