import { ErrorMessage } from '@hookform/error-message';
import Router from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';

import { login } from '../lib/api/user';
import Alert from './alert';

export default function App() {
  const { t } = useTranslation(['common', 'glossary']);
  const [isLoading, setLoading] = useState(false);
  const {
    register, handleSubmit, formState: { errors }, setError,
  } = useForm();

  const onSubmit = async (values) => {
    setLoading(true);
    if (Object.keys(errors).length > 0) {
      return (
        <Alert error>
          Fel
          ...
        </Alert>
      );
    }

    try {
      const response = await login(values.email, values.password);
      if (response.status !== 200) {
        Object.keys(response.data.errors).map((key, index) => {
          setError(key, {
            type: 'manual',
            message: response.data.errors[key][0],
          });
        });
      }

      if (response.data?.user) {
        window.localStorage.setItem('user', JSON.stringify(response.data.user));
        mutate('user', response.data?.user);
        Router.push('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder={t('common:email')} {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
      <ErrorMessage errors={errors} name="email" />
      <input type="password" placeholder={t('common:password')} {...register('password', { required: true })} />
      <ErrorMessage errors={errors} name="password" />
      <button
        className="btn btn-primary"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            {t('loading')}
            ...
          </>
        )
          : (
            <>
              { t('login') }
            </>
          )}
      </button>
    </form>
  );
}
