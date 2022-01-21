/* eslint-disable react/jsx-props-no-spreading */
import { ErrorMessage } from '@hookform/error-message';
import Router, { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { mutate } from 'swr';

import { login } from '../lib/api/user';
import styles from './form.module.scss';

export default function LoginForm({ setIsLoginVisible, isLoginVisible }) {
    const [isLoading, setLoading] = useState(false);
    const { t } = useTranslation(['common', 'glossary', 'validation']);
    const router = useRouter();
    const { addToast } = useToasts();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted, isDirty },
        setError,
        clearErrors,
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
                console.table(response.data.errors);
                // eslint-disable-next-line array-callback-return
                Object.keys(response.data.errors).map((key) => {
                    setError(key, {
                        type: 'manual',
                        message: response.data.errors[key][0],
                    });
                });
            }

            if (response.data?.user) {
                addToast(
                    t('validation:what_success', { what: t('common:login') }),
                    {
                        appearance: 'success',
                    }
                );
                window.localStorage.setItem(
                    'user',
                    JSON.stringify(response.data.user)
                );
                mutate('user', response.data?.user);
                Router.push('/');
            }
        } catch (error) {
            addToast(t('validation:what_error', { what: t('common:login') }), {
                appearance: 'error',
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-5 px-4">
            <header>
                <div className="container d-flex justify-content-between">
                    <h1 className={styles.formHeading}>{t('common:login')}</h1>
                    <button
                        type="button"
                        className={`btn ${styles.btn}`}
                        onClick={() => setIsLoginVisible(!isLoginVisible)}
                    >
                        <span className="visually-hidden">
                            {t('common:close')}
                        </span>
                        <span className="material-icons-round md-48">
                            close
                        </span>
                    </button>
                </div>
            </header>
            <div className="container">
                <form
                    className={styles.form}
                    onSubmit={handleSubmit(onSubmit)}
                    onChange={() => {
                        if (isSubmitted && isDirty) clearErrors();
                    }}
                >
                    <fieldset className="mb-3">
                        <label htmlFor="email" className="visually-hidden">
                            {`${t('common:email')}`}
                        </label>
                        <input
                            id="email"
                            name="email"
                            aria-invalid={errors.email ? 'true' : 'false'}
                            className={`w-100 ${errors.email ? 'invalid' : ''}`}
                            type="text"
                            placeholder={`${t('common:email')}`}
                            {...register('email', {
                                required: true,
                                pattern: /^\S+@\S+$/i,
                            })}
                        />
                        <ErrorMessage errors={errors} name="email" />
                    </fieldset>
                    <fieldset className="mb-3">
                        <label htmlFor="password" className="visually-hidden">
                            {`${t('common:password')}`}
                        </label>
                        <input
                            id="password"
                            name="password"
                            aria-invalid={errors.password ? 'true' : 'false'}
                            className={`w-100 ${
                                errors.password ? 'invalid' : ''
                            }`}
                            type="password"
                            placeholder={`${t('common:password')}`}
                            {...register('password', { required: true })}
                        />
                        <ErrorMessage errors={errors} name="password" />
                    </fieldset>
                    <button
                        className="btn btn-auth w-100 d-flex align-items-center justify-content-center"
                        type="submit"
                        disabled={isLoading}
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
                            t('common:login')
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
