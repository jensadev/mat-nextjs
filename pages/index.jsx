import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout, { siteTitle } from '../components/layout';
import Maybe from '../components/maybe';
import { useAppContext } from '../context/app-context';

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

export default function Home() {
    const { isLoggedIn, currentUser } = useAppContext();

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

    const { t } = useTranslation('glossary', 'common');
    return (
        <Layout home>
            <Head>
                <title>{`${siteTitle} - ${t('common:index')}`}</title>
            </Head>
            <motion.main
                variants={container}
                initial="hidden"
                animate="show"
                className="d-flex h-100 flex-column">
                <Maybe test={isLoggedIn}>
                    <Link href="/meals">
                        <motion.div
                            variants={item}
                            className="bg-meal meal pointer">
                            <div className="row-calc container py-5">
                                <h1 className="hero-h1 pt-5">
                                    {t('glossary:meal_plural')}
                                </h1>
                                <p className="lead">
                                    {currentUser &&
                                        t('glossary:have_logged', {
                                            who: currentUser?.family
                                                ? t('glossary:yous')
                                                : t('glossary:you'),
                                            num: currentUser?.meals,
                                            what: currentUser?.meals
                                                ? t('glossary:meal_plural')
                                                : t('glossary:meal')
                                        })}
                                </p>
                            </div>
                        </motion.div>
                    </Link>
                    <Link href="/dishes">
                        <motion.div
                            variants={item}
                            className="bg-dish dish pointer">
                            <div className="row-calc container py-5">
                                <h1 className="hero-h1">
                                    {t('glossary:dish_plural')}
                                </h1>
                                <p className="lead">
                                    {t('glossary:users_dishes')}
                                </p>
                            </div>
                        </motion.div>
                    </Link>
                    <Link href="/profile">
                        <motion.div
                            variants={item}
                            className="bg-profile profile pointer">
                            <div className="row-calc container py-5 mb-md-3">
                                <h1 className="hero-h1">
                                    {currentUser && currentUser.family
                                        ? t('common:our_page')
                                        : t('common:my_page')}
                                </h1>
                                <p className="lead pb-5">
                                    {t('glossary:about_profile')}
                                </p>
                            </div>
                        </motion.div>
                    </Link>
                </Maybe>
                <Maybe test={!isLoggedIn}>
                    <motion.div variants={item} className="bg-meal meal">
                        <div className="row-calc container py-5">
                            <h1 className="hero-h1-nolink pt-5">
                                {t('glossary:meal_plural')}
                            </h1>
                            <p className="lead">{t('glossary:about_meals')}</p>
                        </div>
                    </motion.div>
                    <motion.div variants={item} className="bg-dish dish">
                        <div className="row-calc container py-5">
                            <h1 className="hero-h1-nolink">
                                {t('glossary:dish_plural')}
                            </h1>
                            <p className="lead">{t('glossary:about_dishes')}</p>
                        </div>
                    </motion.div>
                    <Link href="/about">
                        <motion.div
                            variants={item}
                            className="bg-about about pointer">
                            <div className="row-calc container py-5 mb-md-3">
                                <h1 className="hero-h1">{t('common:about')}</h1>
                                <p className="lead">
                                    {t('glossary:about_intro', {
                                        brand: siteTitle,
                                        who: t('glossary:you')
                                    })}
                                </p>
                            </div>
                        </motion.div>
                    </Link>
                </Maybe>
            </motion.main>
        </Layout>
    );
}
