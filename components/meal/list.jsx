import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import useSWR, { mutate } from 'swr';

import fetcher from '../../lib/utils/fetcher';
// import Alert from './alert';
import ListItem from './list-item';
import styles from './meal.module.scss';

export default function MealList() {
    const [pageIndex, setPageIndex] = useState(1);
    const { addToast } = useToasts();
    const { data, error } = useSWR(
        `${process.env.apiUrl}/meals?page=${pageIndex}`,
        fetcher
    );
    const { t } = useTranslation(['common', 'glossary']);
    if (error) {
        return addToast(
            t('common:cant_load', {
                what: `${t('common:recent')} ${t('glossary:meal_plural')}`
            })
        );
        // return (
        //   <Alert type="danger">
        //     {t('common:cant_load', {
        //       what: `${t('common:recent')} ${t('glossary:meal_plural')}`
        //     })}
        //     ...
        //   </Alert>
        // );
    }
    // if (!data) return <Loading />;

    const onUpdate = (e) => {
        mutate(`${process.env.apiUrl}/meals?page=${pageIndex}`);
    };

    const { pager, pageOfItems } = data || false;

    return (
        <div className="w-100">
            <ul className={styles.list}>
                {pageOfItems &&
                    pageOfItems?.map((meal) => (
                        <ListItem
                            key={meal.id}
                            meal={meal}
                            onChange={onUpdate}
                        />
                    ))}
            </ul>
            {pager && (
                <nav
                    aria-label="Pagination"
                    className={styles.paginationContainer}>
                    <ul
                        className={`${styles.pagination} justify-content-center`}>
                        <li
                            className={`${
                                pager.currentPage === 1 ? styles.disabled : ''
                            }`}>
                            <button
                                className={styles.pageLink}
                                type="button"
                                onClick={() => setPageIndex(1)}>
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
                                onClick={() =>
                                    setPageIndex(pager.currentPage - 1)
                                }>
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
                                    pager.currentPage === page
                                        ? styles.active
                                        : ''
                                }`}>
                                <button
                                    className={styles.pageLink}
                                    type="button"
                                    onClick={() => setPageIndex(page)}>
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
                                onClick={() =>
                                    setPageIndex(pager.currentPage + 1)
                                }>
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
                                onClick={() => setPageIndex(pager.totalPages)}>
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
            )}
        </div>
    );
}
