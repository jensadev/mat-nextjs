/* eslint-disable react/jsx-props-no-spreading */
import { ErrorMessage } from '@hookform/error-message';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import useSWR, { mutate } from 'swr';

import { useAppContext } from '../context/app-context';
import { update } from '../lib/api/user';
import fetcher from '../lib/utils/fetcher';
import Loading from './loading';

export default function ProfileForm() {
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation(['common', 'glossary', 'validation']);
  const { addToast } = useToasts();
  const router = useRouter();
  const { currentUser } = useAppContext();

  const { data, error } = {};
  // useSWR(`${process.env.apiUrl}/users`, fetcher);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, dirtyFields },
  } = useForm({});

  useEffect(() => {
    reset({
      family: data?.user.family,
      email: data?.user.email,
      public: data?.user.public,
      bio: data?.user.bio,
    });
  }, [data, reset]);

  if (error) {
    return addToast(
      t('common:cant_load', {
        what: t('common:user'),
      })
    );
  }

  const onSubmit = async (values) => {
    if (Object.entries(dirtyFields).length === 0) return;
    setLoading(true);
    try {
      const updateValues = {};

      if (dirtyFields.family) {
        updateValues.family = values.family;
      }

      if (dirtyFields.public) {
        updateValues.public = values.public;
      }

      if (dirtyFields.email) {
        updateValues.email = values.email;
      }

      if (dirtyFields.bio) {
        updateValues.bio = values.bio;
      }

      const response = await update(updateValues, router.locale);
      if (response.status !== 200) {
        // addToast(t('validation:something_went_wrong'), {
        //     appearance: 'error'
        // });
        console.log(response.data.errors);
        // eslint-disable-next-line array-callback-return
        Object.keys(response.data.errors).map((key) => {
          setError(key, {
            type: 'manual',
            message: response.data.errors[key][0],
          });
        });
      }
      if (response.status === 200) {
        addToast(t('common:updated', { what: t('glossary:meal') }), {
          appearance: 'success',
        });
        if (dirtyFields.family) {
          currentUser.family = response.data.updatedUser.family;
        }
        if (dirtyFields.public) {
          currentUser.public = response.data.updatedUser.public;
        }
        if (dirtyFields.email) {
          currentUser.email = response.data.updatedUser.email;
        }
        if (dirtyFields.bio) {
          currentUser.bio = response.data.updatedUser.bio;
        }
        localStorage.setItem('user', JSON.stringify(currentUser));
        const user = await mutate('user', response.data.updatedUser);
        window.localStorage.setItem('user', JSON.stringify(user));
        reset(response.data.updatedUser);
      }
    } catch (err) {
      addToast(t('validation:something_went_wrong'), {
        appearance: 'error',
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!data && <Loading />}
      {currentUser && (
        <p className="lead">{`${t('common:welcome_back')} ${currentUser.handle
          }`}</p>
      )}
      {data && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="mb-3 d-flex">
            <p>{t('glossary:profile_page.account_family')}</p>
            <label
              htmlFor="family"
              className="form-label visually-hidden"
            >
              {t('glossary:family')}
            </label>
            <input
              type="checkbox"
              name="family"
              {...register('family')}
            />
          </fieldset>
          <fieldset className="mb-3 d-flex">
            <p>{t('glossary:profile_page.account_public')}</p>
            <label
              htmlFor="public"
              className="form-label visually-hidden"
            >
              {t('glossary:public')}
            </label>
            <input
              type="checkbox"
              name="public"
              {...register('public', {})}
            />
          </fieldset>
          <fieldset className="mb-3">
            <p>{t('glossary:profile_page.account_email')}</p>
            <label
              htmlFor="email"
              className="form-label visually-hidden"
            >
              {t('common:email')}
            </label>
            <input
              id="email"
              type="text"
              name="email"
              aria-invalid={errors.user?.email ? 'true' : 'false'}
              className={`w-100 ${errors.user?.email ? 'invalid' : ''
                }`}
              placeholder="Email"
              {...register('email', {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            <ErrorMessage errors={errors} name="user.email" />
          </fieldset>
          <fieldset className="mb-3">
            <p>{t('glossary:profile_page.account_bio')}</p>
            <label
              htmlFor="bio"
              className="form-label visually-hidden"
            >
              {t('glossary:bio')}
            </label>
            <textarea
              type="text"
              name="bio"
              aria-invalid={errors.bio ? 'true' : 'false'}
              className={`w-100 ${errors.bio ? 'invalid' : ''}`}
              placeholder="Bio"
              {...register('bio', {
                maxLength: {
                  value: 255,
                  message: t('validation:max', { num: 255 }),
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="bio"
              render={({ message }) => (
                <p className="text-invalid">{message}</p>
              )}
            />
          </fieldset>
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-edit w-100 d-flex align-items-center justify-content-center"
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border me-3"
                  role="status"
                  aria-hidden="true"
                />
                {t('common:loading')}
                ...
              </>
            ) : (
              t('common:update')
            )}
          </button>
        </form>
      )}
    </>
  );
}
