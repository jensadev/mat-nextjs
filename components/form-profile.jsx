/* eslint-disable react/jsx-props-no-spreading */
import { ErrorMessage } from '@hookform/error-message';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import useSWR from 'swr';

import { useAppContext } from '../context/app-context';
import fetcher from '../lib/utils/fetcher';

export default function ProfileForm() {
    const [isLoading, setLoading] = useState(false);
    const { t } = useTranslation(['common', 'glossary']);
    const { currentUser } = useAppContext();
    const { addToast } = useToasts();
    const { data, error } = useSWR(`${process.env.apiUrl}/users`, fetcher);

    const {
        register,
        reset,
        handleSubmit,
        setValue,
        formState: { errors, touchedFields }
    } = useForm();
    //     defaultValues: useMemo(() => {
    //         return data?.user;
    //     }, [data])
    // });

    useEffect(() => {
        // reset(data?.user);
        setValue('family', data?.user.family);
        setValue('public', data?.user.public);
        setValue('email', data?.user.email);
        setValue('bio', data?.user.bio);
    }, [data]);

    if (error) {
        return addToast(
            t('common:cant_load', {
                what: `${t('common:recent')} ${t('glossary:meal_plural')}`
            })
        );
    }

    // const user = (data && data.user) || false;

    const onSubmit = async (values) => {
        setLoading(true);
        console.log(touchedFields);
        try {
            console.table(values);
        } catch (err) {
            addToast(t('validation:something_went_wrong'), {
                appearance: 'error'
            });
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!data && (
                <div className="position-absolute top-50 start-50 translate-middle">
                    <div
                        className="spinner-border"
                        style={{ width: '4rem', height: '4rem' }}
                        role="status">
                        <span className="visually-hidden">
                            {t('common:loading')}...
                        </span>
                    </div>
                </div>
            )}
            {currentUser && (
                <p className="lead">{`${t('common:welcome_back')} ${
                    currentUser.handle
                }`}</p>
            )}
            {data && (
                <>
                    <form onChange={handleSubmit(onSubmit)}>
                        <fieldset className="mb-3 d-flex">
                            <p>{t('glossary:profile_page.account_family')}</p>
                            <label
                                htmlFor="family"
                                className="form-label visually-hidden">
                                {t('glossary:family')}
                            </label>
                            <input
                                type="checkbox"
                                name="family"
                                {...register('family')}
                            />
                        </fieldset>
                    </form>
                    <form onChange={handleSubmit(onSubmit)}>
                        <fieldset className="mb-3 d-flex">
                            <p>{t('glossary:profile_page.account_public')}</p>
                            <label
                                htmlFor="public"
                                className="form-label visually-hidden">
                                {t('glossary:public')}
                            </label>
                            <input
                                type="checkbox"
                                name="public"
                                {...register('public', {})}
                            />
                        </fieldset>
                    </form>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="mb-3">
                            <p>{t('glossary:profile_page.account_email')}</p>
                            <label
                                htmlFor="email"
                                className="form-label visually-hidden">
                                {t('common:email')}
                            </label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                {...register('email', {
                                    required: true,
                                    pattern: /^\S+@\S+$/i
                                })}
                            />
                            <ErrorMessage errors={errors} name="email" />
                        </fieldset>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-edit w-100">
                            {t('common:edit')}
                        </button>
                    </form>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="mb-3">
                            <p>{t('glossary:profile_page.account_bio')}</p>
                            <label
                                htmlFor="bio"
                                className="form-label visually-hidden">
                                {t('glossary:bio')}
                            </label>
                            <input
                                type="text"
                                name="bio"
                                placeholder="Bio"
                                {...register('bio', {})}
                            />
                            <ErrorMessage errors={errors} name="bio" />
                        </fieldset>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-edit w-100">
                            {t('common:edit')}
                        </button>
                    </form>
                </>
            )}
        </>
    );
}
