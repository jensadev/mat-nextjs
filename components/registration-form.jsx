import { ErrorMessage } from '@hookform/error-message';
import Router, { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { mutate } from 'swr';

import { store } from '../lib/api/user';
import styles from './form.module.scss';

export default function RegistrationForm({
  setIsRegistrationVisible,
  isRegistrationVisible
}) {
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation(['common', 'glossary', 'validation']);
  const router = useRouter();
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitted, isDirty }
  } = useForm();

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const response = await store(
        values.email,
        values.password,
        values.passwordConfirmation,
        router.locale
      );
      if (response.status !== 201) {
        // console.table(response.data.errors);
        Object.keys(response.data.errors).map((key, index) => {
          setError(key, {
            type: 'manual',
            message: response.data.errors[key][0]
          });
        });
      }

      if (response.data?.user) {
        addToast(
          t('validation:what_success', { what: t('common:registration') }),
          { appearance: 'success' }
        );
        window.localStorage.setItem('user', JSON.stringify(response.data.user));
        mutate('user', response.data?.user);
        Router.push('/');
      }
    } catch (error) {
      addToast(t('validation:what_error', { what: t('common:registration') }), {
        appearance: 'error'
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="position-absolute top-0 end-0 p-1">
        <button
          type="button"
          className="btn"
          onClick={(e) => setIsRegistrationVisible(!isRegistrationVisible)}>
          <span className="visually-hidden">{t('common:close')}</span>
          <span className="material-icons-round md-48">close</span>
        </button>
      </div>
      <div className="py-5 px-4">
        <header className="">
          <div className="container">
            <h1 className={styles.formHeading}>{t('common:register')}</h1>
          </div>
        </header>
        <div className="container">
          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            onChange={() => {
              if (isSubmitted && isDirty) clearErrors();
            }}>
            <fieldset className="mb-3">
              <label htmlFor="email" className="visually-hidden">
                {`${t('common:email')}*`}
              </label>
              <input
                id="email"
                name="email"
                aria-invalid={errors.user?.email ? 'true' : 'false'}
                className={`w-100 ${errors.user?.email ? 'invalid' : ''}`}
                type="text"
                placeholder={`${t('common:email')}*`}
                {...register('email', {
                  required: true,
                  pattern: /^\S+@\S+$/i
                })}
              />
              <ErrorMessage errors={errors} name="user.email" />
            </fieldset>
            <fieldset className="mb-3">
              <label htmlFor="password" className="visually-hidden">
                {`${t('common:password')}*`}
              </label>
              <input
                id="password"
                name="password"
                aria-invalid={errors.user?.password ? 'true' : 'false'}
                className={`w-100 ${errors.user?.password ? 'invalid' : ''}`}
                type="password"
                placeholder={`${t('common:password')}*`}
                {...register('password', { required: true })}
              />
              <ErrorMessage errors={errors} name="user.password" />
            </fieldset>
            <fieldset className="mb-3">
              <label htmlFor="passwordConfirmation" className="visually-hidden">
                {`${t('common:password_confirmation')}*`}
              </label>
              <input
                id="passwordConfirmation"
                name="passwordConfirmation"
                aria-invalid={
                  errors.user?.passwordConfirmation ? 'true' : 'false'
                }
                className={`w-100 ${
                  errors.user?.passwordConfirmation ? 'invalid' : ''
                }`}
                type="password"
                placeholder={`${t('common:password_confirmation')}*`}
                {...register('passwordConfirmation', { required: true })}
              />
              <ErrorMessage errors={errors} name="user.passwordConfirmation" />
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
                t('register')
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
