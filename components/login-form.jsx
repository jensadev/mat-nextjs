import { ErrorMessage } from '@hookform/error-message';
import { usePresence } from 'framer-motion';
import Router from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';

import { login } from '../lib/api/user';
import Alert from './alert';

export default function LoginForm({ handleForm }) {
  const [isPresent, safeToRemove] = usePresence();
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation(['common', 'glossary']);

  useEffect(() => {
    if (!isPresent) setTimeout(safeToRemove, 1000);
  }, [isPresent, safeToRemove]);

  const handleOpen = (e) => {
    handleForm(e.target.dataset.action);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();

  const onSubmit = async (values) => {
    setLoading(true);

    if (Object.keys(errors).length > 0) {
      return <Alert error>Fel ...</Alert>;
    }

    try {
      const response = await login(values.email, values.password);
      if (response.status !== 200) {
        Object.keys(response.data.errors).map((key, index) => {
          setError(key, {
            type: 'manual',
            message: response.data.errors[key][0]
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
    <div className="d-flex flex-column h-100 px-md-5">
      <header>
        <div className="container">
          <h1 className="page-heading">{t('common:login')}</h1>
        </div>
      </header>
      <div className="mt-4 w-100">
        <div className="container">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="mb-3">
              <label htmlFor="email" className="visually-hidden">
                {t('common:email')}
              </label>
              <input
                className="w-100"
                type="text"
                placeholder={t('common:email')}
                {...register('email', {
                  required: true,
                  pattern: /^\S+@\S+$/i
                })}
              />
              <ErrorMessage errors={errors} name="email" />
            </fieldset>
            <fieldset className="mb-3">
              <label htmlFor="password" className="visually-hidden">
                {t('common:password')}
              </label>
              <input
                className="w-100"
                type="password"
                placeholder={t('common:password')}
                {...register('password', { required: true })}
              />
              <ErrorMessage errors={errors} name="password" />
            </fieldset>
            <button
              className="btn btn-auth w-100 d-flex align-items-center justify-content-center"
              type="submit"
              disabled={isLoading}>
              {isLoading ? (
                <>
                  <span
                    className="spinner-border me-3"
                    role="status"
                    aria-hidden="true"
                  />
                  {t('loading')}
                  ...
                </>
              ) : (
                t('login')
              )}
            </button>
          </form>
          <p className="mt-4">
            {t('common:noaccount')}
            <button
              data-action="register"
              type="button"
              style={{ textTransform: 'lowercase' }}
              onClick={handleOpen}
              className="btn link-blue capitalize-first">
              {t('common:noaccountlink')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
