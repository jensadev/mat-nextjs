import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

// import styles from './footer.module.scss';

export default function Footer() {
  const router = useRouter();
  const { t } = useTranslation(['common']);

  return (
    <footer
      className={`${
        router.pathname === '/' ? 'fixed-bottom' : ''
      } mt-auto pb-5`}>
      <div className="container d-flex justify-content-between align-items-center">
        <Link href="/" locale={router.locale === 'en' ? 'sv' : 'en'}>
          <button type="button" className="btn link-dark">
            {router.locale === 'en' ? 'sv' : 'en'}
          </button>
        </Link>
        <Link href="/legal">
          <a className="btn link-legal">
            {`${t('terms')}`}
            {/* {`${t('cookie')} ${t('policy')} / ${t('privacy')} ${t('policy')}`} */}
          </a>
        </Link>
      </div>
    </footer>
  );
}
