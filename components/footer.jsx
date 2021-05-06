import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

// import styles from './footer.module.scss';

export default function Footer() {
    const router = useRouter();
    const { t } = useTranslation(['common']);

    return (
        <footer className="footer mt-auto">
            <div className="row-calc container d-flex justify-content-between align-items-center pt-3 pb-5">
                <div>
                    {router.locale !== 'en' ? (
                        <Link href={router.pathname} locale="en">
                            <a className="link-footer">en</a>
                        </Link>
                    ) : (
                        <span className="link-footer active">en</span>
                    )}
                    <span className="px-1 text-muted h3">|</span>
                    {router.locale !== 'sv' ? (
                        <Link href={router.pathname} locale="sv">
                            <a className="link-footer">sv</a>
                        </Link>
                    ) : (
                        <span className="link-footer active">sv</span>
                    )}
                </div>
                <Link href="/legal">
                    <a className="link-footer">
                        {`${t('common:terms')}`}
                        {/* {`${t('cookie')} ${t('policy')} / ${t('privacy')} ${t('policy')}`} */}
                    </a>
                </Link>
            </div>
        </footer>
    );
}
