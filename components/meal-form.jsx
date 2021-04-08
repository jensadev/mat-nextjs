import 'react-datepicker/dist/react-datepicker.css';

import { format } from 'date-fns';
import { en, sv } from 'date-fns/locale/';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import CreatableSelect from 'react-select/creatable';
import useSWR from 'swr';

import fetcher from '../lib/utils/fetcher';
import Alert from './alert';
import Loading from './loading';

export default function MealForm() {
  const router = useRouter();
  const { t } = useTranslation(['common']);
  const { data, error } = useSWR(`${process.env.apiUrl}/dishes`, fetcher);
  const defaultValues = {
    date: Date.now(),
    type: { value: '3', label: t('dinner') },
    dish: '',
  };

  const {
    handleSubmit, reset, control, watch, register,
  } = useForm({ defaultValues });

  const [values, setValues] = useState(null);
  const watchDate = watch('date');

  if (error) return <Alert error>Cannot load dishes...</Alert>;
  if (!data) return <Loading />;

  console.table(values);
  console.log(watchDate);
  return (
    <form onSubmit={handleSubmit((values) => setValues(values))} className="form">
      <p>
        {format(watchDate, 'eeee', { locale: router.locale === 'en' ? en : sv })}
        {' '}
        {t('the')}
      </p>
      <label className="form-label visually-hidden">
        {t('date')}
      </label>
      <Controller
        control={control}
        name="date"
        render={({ field }) => (
          <ReactDatePicker
            locale={router.locale === 'en' ? en : sv}
            dateFormat="do LLLL"
            className="input"
            placeholderText="Select date"
            onChange={(e) => field.onChange(e)}
            selected={field.value}
          />
        )}
      />
      <p>
        {watchDate > defaultValues.date
          ? t('toeat')
          : t('eaten')}
      </p>
      <label className="form-label visually-hidden">
        {t('dish')}
      </label>
      <Controller
        name="dish"
        control={control}
        render={({ field }) => (
          <CreatableSelect
            placeholder={t('dishplaceholder')}
            isClearable
            options={data.dishes.map((dish) => ({
              label: dish.name,
              value: dish.name,
            }))}
            {...field}
          />
        )}
      />
      <p>{t('for')}</p>
      <label className="form-label visually-hidden">
        {t('mealtype')}
      </label>
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <ReactSelect
            options={[
              { value: '1', label: t('breakfast') },
              { value: '2', label: t('lunch') },
              { value: '3', label: t('dinner') },
            ]}
            {...field}
          />
        )}
      />
      <button
        className="btn btn-warning"
        type="button"
        onClick={() => {
          reset(defaultValues);
        }}
      >
        {t('reset')}
      </button>
      <button type="submit" className="btn btn-primary">{t('create')}</button>
    </form>
  );
}
