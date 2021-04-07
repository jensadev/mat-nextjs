import { useState } from 'react';
import useSWR from 'swr';

import fetcher from '../lib/utils/fetcher';
import Alert from './alert';
import Loading from './loading';

const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null; // reached the end
  return `${process.env.apiUrl}/meals?page=${pageIndex}`; // SWR key
};

export default function MealList() {
  const [pageIndex, setPageIndex] = useState(1);
  // const getFetchURL = () => `${process.env.apiUrl}/meals`;
  // const fetchURL = useMemo(() => getFetchURL());
  const { data, error } = useSWR(`${process.env.apiUrl}/meals?page=${pageIndex}`, fetcher);

  if (error) return <Alert error>Cannot load recent meals...</Alert>;
  if (!data) return <Loading />;

  const { pager, pageOfItems } = data;

  return (
    <div className="w-100">
      <ul>
        {pageOfItems?.map((meal) => (
          <li key={meal.id}>{meal.Dish.name}</li>
          // <Listitem
          //   key={meal.id}
          //   meal={meal}
          //   onMealDelete={handleListUpdate}
          //   onMealEdit={handleMealEdit}
          // />
        ))}
      </ul>
      <nav aria-label="Pagination">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              type="button"
              onClick={() => setPageIndex(pager.startPage)}
            >
              <span className="material-icons-round">
                first_page
              </span>
            </button>
          </li>
          <li className={`page-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
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
              className={`page-item number-item ${
                pager.currentPage === page ? 'active' : ''
              }`}
            >
              <button
                className="page-link"
                type="button"
                onClick={() => setPageIndex(page)}
              >
                {page}
              </button>
            </li>
          ))}
          <li className={`page-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link"
              type="button"
              onClick={() => setPageIndex(pager.currentPage + 1)}
            >
              <span className="material-icons-round">
                navigate_next
              </span>
            </button>
          </li>
          <li className={`page-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link"
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
