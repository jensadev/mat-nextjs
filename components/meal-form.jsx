import 'react-datepicker/dist/react-datepicker.css';

import { ErrorMessage } from '@hookform/error-message';
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

import { store } from '../lib/api/meal';
import fetcher from '../lib/utils/fetcher';
import Alert from './alert';
import Loading from './loading';

export default function MealForm() {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useTranslation(['common', 'glossary']);
  const { data, error } = useSWR(`${process.env.apiUrl}/dishes`, fetcher);
  const defaultValues = {
    date: Date.now(),
    type: { value: '3', label: t('glossary:dinner') },
    dish: '',
  };

  const {
    handleSubmit, reset, control, watch, formState: { errors },
  } = useForm({ defaultValues });

  const watchDate = watch('date');

  if (error) {
    return (
      <Alert type="danger">
        {t('cantload', { what: t('glossary:dish_plural') })}
        ...
      </Alert>
    );
  }
  if (!data) return <Loading />;

  const onSubmit = async (values) => {
    setLoading(true);
    if (Object.entries(errors).length !== 0) {
      return (
        <Alert error>
          Fel
          ...
        </Alert>
      );
    }
    try {
      const response = await store(
        new Date(values.date).toISOString(),
        values.type.value,
        values.dish.value,
      );
      if (response.status !== 201) {
        console.log(response.data.errors);
      }
      console.table(response.data.meal);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <p>
        {format(watchDate, 'eeee', { locale: router.locale === 'en' ? en : sv })}
        {' '}
        {t('glossary:the')}
      </p>
      <label className="form-label visually-hidden">
        {t('date')}
      </label>
      <Controller
        control={control}
        name="date"
        rules={{
          required: true,
          valueAsDate: true,
        }}
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
      <ErrorMessage errors={errors} name="date" />
      <p>
        {watchDate > defaultValues.date
          ? t('glossary:toeat')
          : t('glossary:eaten')}
      </p>
      <label className="form-label visually-hidden">
        {t('dish')}
      </label>
      <Controller
        name="dish"
        control={control}
        rules={{
          required: true,
          minLength: 4,
        }}
        render={({ field }) => (
          <CreatableSelect
            isValidNewOption={(option) => (option.length > 3)}
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
      <ErrorMessage errors={errors} name="dish" />
      <p>{t('glossary:for')}</p>
      <label className="form-label visually-hidden">
        {t('mealtype')}
      </label>
      <Controller
        name="type"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <ReactSelect
            options={[
              { value: '1', label: t('glossary:breakfast') },
              { value: '2', label: t('glossary:lunch') },
              { value: '3', label: t('glossary:dinner') },
            ]}
            {...field}
          />
        )}
      />
      <ErrorMessage errors={errors} name="type" />
      <button
        className="btn btn-warning"
        type="button"
        disabled={isLoading}
        onClick={() => {
          reset(defaultValues);
        }}
      >
        {t('reset')}
      </button>
      <button type="submit" disabled={isLoading} className="btn btn-primary">{t('create')}</button>
    </form>
  );
}
