import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import useSWR from 'swr';

import fetcher from '../lib/utils/fetcher';
import Alert from './alert';
import ListItem from './list-item';
import styles from './meal.module.scss';

export default function MealList() {
  const [pageIndex, setPageIndex] = useState(1);
  const { data, error } = useSWR(
    `${process.env.apiUrl}/meals?page=${pageIndex}`,
    fetcher
  );
  const { t } = useTranslation(['common', 'glossary']);
  if (error) {
    return (
      <Alert type="danger">
        {t('cantload', { what: `${t('recent')} ${t('glossary:meal_plural')}` })}
        ...
      </Alert>
    );
  }
  // if (!data) return <Loading />;

  const { pager, pageOfItems } = data || false;

  return (
    <div className="w-100">
      <ul className="list-unstyled">
        {pageOfItems &&
          pageOfItems?.map((meal) => (
            // <li key={meal.id}>{meal.Dish.name}</li>
            <ListItem key={meal.id} meal={meal} />
          ))}
      </ul>
      {pager && (
        <nav aria-label="Pagination" className={styles.paginationContainer}>
          <ul className={`${styles.pagination} justify-content-start`}>
            <li className={`${pager.currentPage === 1 ? styles.disabled : ''}`}>
              <button
                className={styles.pageLink}
                type="button"
                onClick={() => setPageIndex(1)}>
                <span className="material-icons-round">first_page</span>
              </button>
            </li>
            <li className={`${pager.currentPage === 1 ? styles.disabled : ''}`}>
              <button
                className={styles.pageLink}
                type="button"
                onClick={() => setPageIndex(pager.currentPage - 1)}>
                <span className="material-icons-round">navigate_before</span>
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
                  onClick={() => setPageIndex(page)}>
                  {page}
                </button>
              </li>
            ))}
            <li
              className={`${
                pager.currentPage === pager.totalPages ? styles.disabled : ''
              }`}>
              <button
                className={styles.pageLink}
                type="button"
                onClick={() => setPageIndex(pager.currentPage + 1)}>
                <span className="material-icons-round">navigate_next</span>
              </button>
            </li>
            <li
              className={`${
                pager.currentPage === pager.totalPages ? styles.disabled : ''
              }`}>
              <button
                className={styles.pageLink}
                type="button"
                onClick={() => setPageIndex(pager.totalPages)}>
                <span className="material-icons-round">last_page</span>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
