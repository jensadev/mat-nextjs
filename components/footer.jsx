import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

// import styles from './footer.module.scss';

export default function Footer() {
    const router = useRouter();
    const { t } = useTranslation(['common']);

    return (
        <footer className="footer mt-auto">
            <div className="row-calc">
                <div className="container pt-5">
                    <div className="row">
                        <div className="col d-flex align-items-center justify-content-between">
                            <div>
                                {router.locale !== 'en' ? (
                                    <Link href={router.pathname} locale="en">
                                        <a className="link-footer">en</a>
                                    </Link>
                                ) : (
                                    <span className="link-footer active">
                                        en
                                    </span>
                                )}
                                <span className="px-1 text-muted h3">|</span>
                                {router.locale !== 'sv' ? (
                                    <Link href={router.pathname} locale="sv">
                                        <a className="link-footer">sv</a>
                                    </Link>
                                ) : (
                                    <span className="link-footer active">
                                        sv
                                    </span>
                                )}
                            </div>
                            <Link href="/legal">
                                <a className="link-footer">
                                    {`${t('common:terms')}`}
                                    {/* {`${t('cookie')} ${t('policy')} / ${t('privacy')} ${t('policy')}`} */}
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="row pt-4">
                        <div className="col">
                            <p className="text-small text-muted">
                                {t('common:created_by')}{' '}
                                <a
                                    href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#106;&#101;&#110;&#115;&#97;&#110;&#100;&#114;&#101;&#97;&#115;&#115;&#111;&#110;&#55;&#55;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;"
                                    rel="noreferrer"
                                >
                                    &#74;&#101;&#110;&#115;&#32;&#65;&#110;&#100;&#114;&#101;&#97;&#115;&#115;&#111;&#110;
                                </a>{' '}
                                {t('common:using')}{' '}
                                <a
                                    target="_blank"
                                    href="https://nextjs.org/"
                                    rel="noreferrer"
                                >
                                    Next.js
                                </a>{' '}
                                {t('common:deployed_with')}{' '}
                                <a
                                    target="_blank"
                                    href="https://vercel.com/"
                                    rel="noreferrer"
                                >
                                    Vercel
                                </a>
                                .
                            </p>
                            <p className="text-small text-muted">
                                {t('common:source_code')}{' '}
                                <a
                                    target="_blank"
                                    href="https://github.com/jensnti/mat-nextjs"
                                    rel="noreferrer"
                                >
                                    GitHub
                                </a>
                                .
                            </p>
                            <p className="text-small text-muted">
                                {t('common:found_a_bug')}{' '}
                                <a
                                    target="_blank"
                                    href="https://github.com/jensnti/mat-nextjs/issues"
                                    rel="noreferrer"
                                >
                                    {t('common:issue')}
                                </a>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
