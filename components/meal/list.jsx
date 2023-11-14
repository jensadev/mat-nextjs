/* eslint-disable no-nested-ternary */
import { useTranslation } from 'next-i18next';
import { useEffect, useRef } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useSWRInfinite } from 'swr';

import { useAppContext } from '../../context/app-context';
import fetcher from '../../lib/utils/fetcher';
import ListItem from './list-item';
import styles from './meal.module.scss';

const PAGE_SIZE = 7;

export default function MealList() {
  // const [pageIndex, setPageIndex] = useState(1);
  const { addToast } = useToasts();
  const { t } = useTranslation(['common', 'glossary']);
  const { updated, toggleUpdate } = useAppContext();
  // const { data, error } = useSWR(
  //     `${process.env.apiUrl}/meals?page=${pageIndex}`,
  //     fetcher
  // );
  const loader = useRef(null);
  // const { data, error, mutate, size, setSize } = useSWRInfinite(
  //     (index) =>
  //         `${process.env.apiUrl}/meals?size=${PAGE_SIZE}&page=${index}`,
  //     fetcher
  // );
  const { data, error, mutate, size, setSize } = {};

  // const meals = data ? [].concat(...data) : [];

  const meals = [
    {
      id: 2,
      date: '2021-03-20T15:36:49.000Z',
      typeId: 3,
      Dish: {
        name: 'Falukorv och makaroner',
      },
    },
    {
      id: 3,
      date: '2021-03-20T15:36:49.000Z',
      typeId: 2,
      Dish: {
        name: 'Havregrynsgröt',
      },
    },
    {
      id: 1,
      date: '2021-03-20T11:27:29.000Z',
      typeId: 3,
      Dish: {
        name: 'Falukorv och makaroner',
      },
    },
  ];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  // const isRefreshing = isValidating && data && data.length === size;

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      loader.current.click();
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };
    // initialize IntersectionObserver
    // and attaching to Load More div
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  if (error) {
    return addToast(
      t('common:cant_load', {
        what: `${t('common:recent')} ${t('glossary:meal_plural')}`,
      })
    );
  }

  const onUpdate = () => {
    // mutate(`${process.env.apiUrl}/meals?page=${pageIndex}`);
    mutate();
  };

  // const { pager, pageOfItems } = data || false;

  if (updated) {
    onUpdate();
    toggleUpdate(false);
  }

  // if (meals) {
  //     currentUser.meals = meals.length;
  //     localStorage.setItem('user', JSON.stringify(currentUser));
  // }

  // const setIndex = (page) => {
  //     setPageIndex(page);
  // };

  return (
    <div className="w-100">
      {data ||
        (isLoadingMore && (
          <div className="position-absolute top-50 start-50 translate-middle">
            <div
              className="spinner-border"
              style={{ width: '4rem', height: '4rem' }}
              role="status"
            >
              <span className="visually-hidden">
                {t('common:loading')}...
              </span>
            </div>
          </div>
        ))}
      {/* <p>
                showing {size} page(s) of {isLoadingMore ? '...' : meals.length}{' '}
                issue(s){' '}

                <button
                    type="button"
                    disabled={isRefreshing}
                    onClick={() => mutate()}>
                    {isRefreshing ? 'refreshing...' : 'refresh'}
                </button>
                <button
                    type="button"
                    disabled={!size}
                    onClick={() => setSize(0)}>
                    clear
                </button>
            </p> */}
      <ul className={styles.list}>
        {meals.length > 0 ? (
          meals.map((meal) => (
            <ListItem
              key={meal.id}
              meal={meal}
              onUpdate={onUpdate}
            />
          ))
        ) : (
          <li>
            {t('common:no_what_yet', {
              what: t('glossary:meal_plural'),
            })}
          </li>
        )}
      </ul>
      <nav className="d-flex justify-content-center">
        <button
          ref={loader}
          className="btn btn-meal d-flex align-items-center justify-content-center"
          type="button"
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => {
            setSize(size + 1);
          }}
        >
          {isLoadingMore ? (
            <>
              <span
                className="spinner-border me-3"
                role="status"
                aria-hidden="true"
              />
              {t('common:loading')}
              ...
            </>
          ) : isReachingEnd ? (
            t('common:no_more', { what: t('glossary:meal_plural') })
          ) : (
            t('common:load_more', {
              what: t('glossary:meal_plural'),
            })
          )}
        </button>
      </nav>

      {/* {pager && <Pagination pager={pager} setIndex={setIndex} />} */}
    </div>
  );
}
