import { useState } from 'react';
import useSWR from 'swr';

import fetcher from '../lib/utils/fetcher';
import Alert from './alert';
import ListItem from './list-item';
import Loading from './loading';
import styles from './meal.module.scss';

export default function MealList() {
  const [pageIndex, setPageIndex] = useState(1);
  // const getFetchURL = () => `${process.env.apiUrl}/meals`;
  // const fetchURL = useMemo(() => getFetchURL());
  const { data, error } = useSWR(`${process.env.apiUrl}/meals?page=${pageIndex}`, fetcher);

  if (error) return <Alert error>Cannot load recent meals...</Alert>;
  if (!data) return <Loading />;

  const { pager, pageOfItems } = data;
  // console.table(pager);
  return (
    <div className="w-100">
      <ul>
        {pageOfItems?.map((meal) => (
          // <li key={meal.id}>{meal.Dish.name}</li>
          <ListItem
            key={meal.id}
            meal={meal}
          />
        ))}
      </ul>
      <nav aria-label="Pagination" className={styles.paginationContainer}>
        <ul className={`${styles.pagination} justify-content-center`}>
          <li className={`${pager.currentPage === 1 ? styles.disabled : ''}`}>
            <button
              className={styles.pageLink}
              type="button"
              onClick={() => setPageIndex(1)}
            >
              <span className="material-icons-round">
                first_page
              </span>
            </button>
          </li>
          <li className={`${pager.currentPage === 1 ? styles.disabled : ''}`}>
            <button
              className={styles.pageLink}
              type="button"
              onClick={() => setPageIndex(pager.currentPage - 1)}
            >
              <span className="material-icons-round">
                navigate_before
              </span>
            </button>
          </li>
          {pager.pages.map((page) => (
            <li
              key={page}
              className={`${styles.pageItem} number-item ${
                pager.currentPage === page ? styles.active : ''
              }`}
            >
              <button
                className={styles.pageLink}
                type="button"
                onClick={() => setPageIndex(page)}
              >
                {page}
              </button>
            </li>
          ))}
          <li className={`${pager.currentPage === pager.totalPages ? styles.disabled : ''}`}>
            <button
              className={styles.pageLink}
              type="button"
              onClick={() => setPageIndex(pager.currentPage + 1)}
            >
              <span className="material-icons-round">
                navigate_next
              </span>
            </button>
          </li>
          <li className={`${pager.currentPage === pager.totalPages ? styles.disabled : ''}`}>
            <button
              className={styles.pageLink}
              type="button"
              onClick={() => setPageIndex(pager.totalPages)}
            >
              <span className="material-icons-round">
                last_page
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </div>

  );
}
