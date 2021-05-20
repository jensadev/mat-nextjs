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
                addToast(
                    t([
                        `validation:error.${response.status}`,
                        'validation:error.unspecific'
                    ]),
                    {
                        appearance: 'error'
                    }
                );
                Object.keys(response.data.errors).forEach((key) => {
                    setError(key, {
                        type: 'manual',
                        message: response.data.errors[key][0]
                    });
                });
            }

            if (response.data?.user) {
                addToast(
                    t('validation:what_success', {
                        what: t('glossary:registration')
                    }),
                    { appearance: 'success' }
                );
                window.localStorage.setItem(
                    'user',
                    JSON.stringify(response.data.user)
                );
                mutate('user', response.data?.user);
                Router.push('/');
            }
        } catch (error) {
            addToast(
                t('validation:what_error', {
                    what: t('glossary:registration')
                }),
                {
                    appearance: 'error'
                }
            );
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="py-5 px-4">
            <header className="">
                <div className="container d-flex justify-content-between">
                    <h1 className={styles.formHeading}>
                        {t('glossary:register')}
                    </h1>
                    <button
                        type="button"
                        className={`btn ${styles.btn}`}
                        onClick={(e) =>
                            setIsRegistrationVisible(!isRegistrationVisible)
                        }>
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
                    }}>
                    <fieldset className="mb-3">
                        <label htmlFor="email" className="visually-hidden">
                            {`${t('glossary:email')}*`}
                        </label>
                        <input
                            id="email"
                            name="email"
                            aria-invalid={errors.user?.email ? 'true' : 'false'}
                            className={`w-100 ${
                                errors.user?.email ? 'invalid' : ''
                            }`}
                            type="text"
                            placeholder={`${t('glossary:email')}*`}
                            {...register('email', {
                                required: true,
                                pattern: /^\S+@\S+$/i
                            })}
                        />
                        <ErrorMessage errors={errors} name="user.email" />
                    </fieldset>
                    <fieldset className="mb-3">
                        <label htmlFor="password" className="visually-hidden">
                            {`${t('glossary:password')}*`}
                        </label>
                        <input
                            id="password"
                            name="password"
                            aria-invalid={
                                errors.user?.password ? 'true' : 'false'
                            }
                            className={`w-100 ${
                                errors.user?.password ? 'invalid' : ''
                            }`}
                            type="password"
                            placeholder={`${t('glossary:password')}*`}
                            {...register('password', { required: true })}
                        />
                        <ErrorMessage errors={errors} name="user.password" />
                    </fieldset>
                    <fieldset className="mb-3">
                        <label
                            htmlFor="passwordConfirmation"
                            className="visually-hidden">
                            {`${t('common:confirm_what', {
                                what: t('glossary:password')
                            })}*`}
                        </label>
                        <input
                            id="passwordConfirmation"
                            name="passwordConfirmation"
                            aria-invalid={
                                errors.user?.passwordConfirmation
                                    ? 'true'
                                    : 'false'
                            }
                            className={`w-100 ${
                                errors.user?.passwordConfirmation
                                    ? 'invalid'
                                    : ''
                            }`}
                            type="password"
                            placeholder={`${t('common:confirm_what', {
                                what: t('glossary:password')
                            })}*`}
                            {...register('passwordConfirmation', {
                                required: true
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="user.passwordConfirmation"
                        />
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
                                {t('common:loading')}
                                ...
                            </>
                        ) : (
                            t('glossary:register')
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
