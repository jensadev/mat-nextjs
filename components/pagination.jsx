import { useTranslation } from 'next-i18next';

import styles from './pagination.module.scss';

export default function Pagination({ pager, setIndex }) {
    const { t } = useTranslation(['common', 'glossary']);
    return (
        <nav aria-label="Pagination" className={styles.paginationContainer}>
            <ul className={`${styles.pagination} justify-content-center`}>
                <li
                    className={`${
                        pager.currentPage === 1 ? styles.disabled : ''
                    }`}>
                    <button
                        className={styles.pageLink}
                        type="button"
                        onClick={() => setIndex(1)}>
                        <span className="visually-hidden">
                            {t('common:first_page')}
                        </span>
                        <span className="material-icons-round md-48">
                            first_page
                        </span>
                    </button>
                </li>
                <li
                    className={`${
                        pager.currentPage === 1 ? styles.disabled : ''
                    }`}>
                    <button
                        className={styles.pageLink}
                        type="button"
                        onClick={() => setIndex(pager.currentPage - 1)}>
                        <span className="visually-hidden">
                            {t('common:before')}
                        </span>
                        <span className="material-icons-round md-48">
                            navigate_before
                        </span>
                    </button>
                </li>
                {pager.pages.map((page) => (
                    <li
                        key={page}
                        className={`${styles.pageItem} number-item ${
                            pager.currentPage === page ? styles.active : ''
                        }`}>
                        <button
                            className={styles.pageLink}
                            type="button"
                            onClick={() => setIndex(page)}>
                            {page}
                        </button>
                    </li>
                ))}
                <li
                    className={`${
                        pager.currentPage === pager.totalPages
                            ? styles.disabled
                            : ''
                    }`}>
                    <button
                        className={styles.pageLink}
                        type="button"
                        onClick={() => setIndex(pager.currentPage + 1)}>
                        <span className="visually-hidden">
                            {t('common:next')}
                        </span>
                        <span className="material-icons-round md-48">
                            navigate_next
                        </span>
                    </button>
                </li>
                <li
                    className={`${
                        pager.currentPage === pager.totalPages
                            ? styles.disabled
                            : ''
                    }`}>
                    <button
                        className={styles.pageLink}
                        type="button"
                        onClick={() => setIndex(pager.totalPages)}>
                        <span className="visually-hidden">
                            {t('common:last_page')}
                        </span>
                        <span className="material-icons-round md-48">
                            last_page
                        </span>
                    </button>
                </li>
            </ul>
        </nav>
    );
}
