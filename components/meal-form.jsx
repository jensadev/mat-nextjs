import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import ListErrors from './list-errors';
import Search from './search';

export default function MealForm() {
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [dish, setDish] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(dish);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDishSelect = (e) => { setDish(e); console.log(dish); };

  const { t } = useTranslation('common');
  return (
    <>
      <ListErrors errors={errors} />

      <form onSubmit={handleSubmit}>
        <fieldset>
          <Search onDishSelect={handleDishSelect} />
        </fieldset>
        <button
          type="submit"
          disabled={isLoading}
        >
          {t('createmeal')}
        </button>
      </form>
    </>
  );
}
