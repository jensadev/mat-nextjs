/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head';
// import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import useSWR from 'swr';

import checkLogin from '../../lib/utils/checklogin';
import storage from '../../lib/utils/storage';
// import Maybe from './maybe';
import Navlink from './nav-link';
import styles from './navbar.module.scss';

export default function Navbar() {
    const router = useRouter();
    const { data: currentUser } = useSWR('user', storage);
    const isLoggedIn = checkLogin(currentUser);
    const { t } = useTranslation(['common', 'glossary']);
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    return (
        <>
            <Head>
                <script src="/javascript/navbar.js" />
            </Head>
            <nav id="navbar" className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Navlink href="/">
                        <a className="navbar-brand">
                            <img
                                alt="logo"
                                className={styles.logo}
                                src="/images/tallrik.svg"
                                height={96}
                                width={96}
                            />
                        </a>
                    </Navlink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded={!isNavCollapsed}
                        aria-label="Toggle navigation"
                        onClick={handleNavCollapse}>
                        {!isNavCollapsed ? (
                            <span className="material-icons-round md-48">
                                menu_open
                            </span>
                        ) : (
                            <span className="material-icons-round md-48">
                                menu
                            </span>
                        )}
                    </button>
                    <div
                        className={`${
                            isNavCollapsed ? 'collapse' : ''
                        } navbar-collapse`}
                        id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Navlink href="/meals">
                                    <a className="nav-link">
                                        {t('glossary:meal_plural')}
                                    </a>
                                </Navlink>
                            </li>
                            <li className="nav-item">
                                <Navlink href="/login">
                                    <a className="nav-link">{t('login')}</a>
                                </Navlink>
                            </li>
                            <li className="nav-item">
                                <Navlink href="/register">
                                    <a className="nav-link">{t('register')}</a>
                                </Navlink>
                            </li>
                        </ul>
                        <Link
                            href=""
                            locale={router.locale === 'en' ? 'sv' : 'en'}>
                            <button type="button" className="btn-icon ps-0">
                                {router.locale === 'en' ? 'sv' : 'en'}
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>
            {/* <Maybe test={isLoggedIn}>
        <Navlink href={`/profile/${currentUser?.handle}`}>
          <a>{currentUser?.handle}</a>
        </Navlink>
      </Maybe> */}
        </>
    );
}
