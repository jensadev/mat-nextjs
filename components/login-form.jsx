import { ErrorMessage } from '@hookform/error-message';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import styles from './form.module.scss'
import { login } from '../lib/api/user';
import { useToasts } from 'react-toast-notifications';
export default function LoginForm({ setIsLoginVisible, isLoginVisible }) {
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation(['common', 'glossary']);
  const router = useRouter();
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const response = await login(
        values.email,
        values.password,
        router.locale
      );
      if (response.status !== 200) {
        // console.table(response.data.errors);
        Object.keys(response.data.errors).map((key, index) => {
          setError(key, {
            type: 'manual',
            message: response.data.errors[key][0]
          });
        });
      }

      if (response.data?.user) {
        addToast(t('glossary:loginsuccess'), { appearance: 'success' });
        window.localStorage.setItem('user', JSON.stringify(response.data.user));
        mutate('user', response.data?.user);
        Router.push('/');
      }
    } catch (error) {
      addToast(t('glossary:loginerror'), { appearance: 'error' });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="position-absolute top-0 end-0 p-1">
      <button class="btn" onClick={e => setIsLoginVisible(!isLoginVisible)}>
        <span class="material-icons-round md-48">
          close
        </span>
      </button>
    </div>
    <div className="py-5 px-4">
      <header>
        <div className="container">
          <h1 className={styles.formHeading}>{t('common:login')}</h1>
        </div>
      </header>
        <div className="container">
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="mb-3">
              <label htmlFor="email" className="visually-hidden">
                {t('common:email')}
              </label>
              <input
                id="email"
                name="email"
                aria-invalid={errors.user.email ? 'true' : 'false'}
                className={`w-100 ${errors.user.email ? 'invalid' : ''}`}
                type="text"
                placeholder={t('common:email')}
                {...register('email', {
                  required: true,
                  pattern: /^\S+@\S+$/i
                })}
              />
              <ErrorMessage errors={errors} name="user.email" />
            </fieldset>
            <fieldset className="mb-3">
              <label htmlFor="password" className="visually-hidden">
                {t('common:password')}
              </label>
              <input
                id="password"
                name="password"
                aria-invalid={errors.user.password ? 'true' : 'false'}
                className={`w-100 ${errors.user.password ? 'invalid' : ''}`}
                type="password"
                placeholder={t('common:password')}
                {...register('password', { required: true })}
              />
              <ErrorMessage errors={errors} name="user.password" />
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
          {/* <div className="mt-4 d-flex align-items-center">
            <p>{t('common:noaccount')}</p>
            <button
              data-action="register"
              type="button"
              // style={{ textTransform: 'lowercase' }}
              // onClick={handleOpen}
              className="btn link-blue capitalize-first mb-2">
              {t('common:noaccountlink')}
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}
