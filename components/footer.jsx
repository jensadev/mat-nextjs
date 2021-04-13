import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './footer.module.scss';

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="fixed-bottom pb-5">
      <div className="container">
        <Link
          href="/"
          locale={router.locale === 'en' ? 'sv' : 'en'}
        >
          <button type="button" className={`btn-icon ${styles.btnLang}`}>
            {router.locale === 'en' ? 'sv' : 'en'}
          </button>
        </Link>
      </div>
    </footer>
  );
}
