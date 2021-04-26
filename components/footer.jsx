import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

// import styles from './footer.module.scss';

export default function Footer() {
  const router = useRouter();
  const { t } = useTranslation(['common']);

  return (
    <footer
      className="footer mt-auto pt-4 pb-5">
      <div className="container d-flex justify-content-between align-items-center">
        <Link href="/" locale={router.locale === 'en' ? 'sv' : 'en'}>
          <a className="link-footer">
            {router.locale === 'en' ? 'sv' : 'en'}
          </a>
        </Link>
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
