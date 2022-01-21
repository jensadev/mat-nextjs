import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import CookieConsent from 'react-cookie-consent';

import Footer from './footer';
import Header from './header';

export const siteTitle = 'Måltidsloggen';

export default function Layout({ children }) {
    const { t } = useTranslation(['common']);

    return (
        <>
            <Head>
                <link
                    rel="preload"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
                    as="style"
                />
                <link
                    rel="preload"
                    href="https://use.typekit.net/yis5dme.css"
                    as="style"
                />
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="What do you eat and when? Save your meals to simplify everyday life."
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="canonical" href="https://mat.jensa.xyz" />
                <meta
                    name="keywords"
                    content="meal, meals, dish, dishes, eat, mealplan, ideas, inspiration, måltider, rätter"
                />
                <meta name="author" content="Jens Andreasson" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
                />
                <link
                    rel="stylesheet"
                    href="https://use.typekit.net/yis5dme.css"
                />
                <script async src="/javascript/scrollhide.js" />
                <script
                    async
                    src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-p34f1UUtsS3wqzfto5wAAmdvj+osOnFyQFpp4Ua3gs/ZVWx6oOypYoCJhGGScy+8"
                    crossOrigin="anonymous"
                />
            </Head>
            <Header />
            {children}
            <Footer />
            <CookieConsent
                disableButtonStyles="true"
                buttonClasses="btn btn-consent d-flex align-items-center justify-content-center px-3 m-3"
                buttonText={t('common:cookie_consent')}
                contentClasses="pb-3"
            >
                {t('common:cookie_text')}
            </CookieConsent>
            <script src="/javascript/scrollhide.js" defer />
        </>
    );
}
