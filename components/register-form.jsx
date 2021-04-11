import { ErrorMessage } from '@hookform/error-message';
import Router from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';

import { store } from '../lib/api/user';
import Alert from './alert';

export default function RegisterForm() {
  const { t } = useTranslation(['common', 'glossary']);
  const [isLoading, setLoading] = useState(false);
  const {
    register, handleSubmit, formState: { errors }, setError, reset,
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
      const response = await store(
        values.email,
        values.password,
        values.passwordConfirmation,
      );

      if (response.status !== 200) {
        console.table(response.data.errors);
        Object.keys(response.data.errors).map((key, index) => {
          setError(key.replace('users.', ''), {
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
      {/* {errors.email && t('valuerequired', { what: t('email') })}
      {errors.email && t('valueinvalid', { what: t('email') })} */}
      <input type="password" placeholder={t('common:password')} {...register('password', { required: true })} />
      <ErrorMessage errors={errors} name="password" />
      <input type="password" placeholder={t('common:passwordConfirmation')} {...register('passwordConfirmation', { required: true })} />
      <ErrorMessage errors={errors} name="passwordConfirmation" />
      <button
        className="btn btn-warning"
        type="button"
        disabled={isLoading}
        onClick={() => {
          reset();
        }}
      >
        {t('reset')}
      </button>
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
              { t('register') }
            </>
          )}
      </button>
    </form>
  );
}
