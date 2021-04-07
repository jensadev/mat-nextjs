import { matchSorter } from 'match-sorter';
import {
  useEffect, useRef, useState,
} from 'react';
import useSWR from 'swr';

import fetcher from '../lib/utils/fetcher';
import Alert from './alert';
import Loading from './loading';

export default function Search({ onDishSelect }) {
  const searchRef = useRef(null);
  const [filteredItems, setFilteredItems] = useState([]);
  const [open, setOpen] = useState(false);
  const { data, error } = useSWR(`${process.env.apiUrl}/dishes`, fetcher);
  const [dish, setDish] = useState('');

  if (error) return <Alert error>Cannot load dishes...</Alert>;
  if (!data) return <Loading />;

  const filterItems = (inputValue) => {
    // console.log(dishes);
    setFilteredItems(
      matchSorter(data.dishes, inputValue, {
        keys: ['name'],
        maxRanking: matchSorter.rankings.STARTS_WITH,
      }),
    );
  };

  const onChange = (e) => {
    setDish(e.target.value);
    filterItems(e.target.value);
    setOpen(true);
  };

  const handleClick = (e) => {
    setOpen(false);
    setDish(e.target.textContent);
  };

  // useEffect(() => {
  //   onDishSelect(dish);
  // }, [dish]);

  // const onChange = useCallback((e) => {
  //   const q = e.target.value;
  //   console.log(q);
  //   // setQuery(q);
  //   // if (q.length) {
  //   //   setQuery(q);
  //   // } else {
  //   //   setResults(data);
  //   // }
  // }, []);

  // const onClick = useCallback((e) => {
  //   if (searchRef.current && !searchRef.current.contains(e.target)) {
  //     setOpen(false);
  //     window.removeEventListener('click', onClick);
  //   }
  // }, [open]);

  // const onFocus = useCallback(() => {
  //   setOpen(true);
  //   window.addEventListener('click', onClick);
  // }, [open]);
  // const onClick = (e) => {
  //   if (searchRef.current && !searchRef.current.contains(e.target)) {
  //     setOpen(false);
  //     window.removeEventListener('click', onClick);
  //   }
  // };

  // const onFocus = () => {
  //   setOpen(true);
  //   window.addEventListener('click', onClick);
  // };

  return (
    <fieldset ref={searchRef}>
      <label htmlFor="dish" className="visually-hidden">Dish</label>
      <input
        name="dish"
        value={dish}
        // onFocus={onFocus}
        onChange={onChange}
        placeholder="search"
        type="text"
      />
      {open && !!filteredItems.length && (
      <ul>
        {filteredItems.map(({ id, name }) => (
          <li key={id}>
            <button type="button" onClick={handleClick}>{name}</button>
          </li>
        ))}
      </ul>
      )}
    </fieldset>
  );
}
