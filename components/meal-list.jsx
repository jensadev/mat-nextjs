import useSWR from 'swr';

import fetcher from '../lib/utils/fetcher';
import Alert from './alert';
import Loading from './loading';

export default function MealList({ index }) {
  // const getFetchURL = () => `${process.env.apiUrl}/meals`;
  // const fetchURL = useMemo(() => getFetchURL());
  const { data, error } = useSWR(`${process.env.apiUrl}/meals?page=${index || 0}`, fetcher);

  if (error) return <Alert error>Cannot load recent meals...</Alert>;
  if (!data) return <Loading />;

  const { pager, pageOfItems } = data;
  // setPageIndex(pager.currentPage);

  return (
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
  );
}
