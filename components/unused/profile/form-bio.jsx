/* eslint-disable react/jsx-props-no-spreading */
import { ErrorMessage } from '@hookform/error-message';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

export default function BioForm({ bio, onChange }) {
    const { addToast } = useToasts();
    const [isLoading, setLoading] = useState(false);
    const { t } = useTranslation(['common', 'glossary']);
    const defaultValues = {
        bio
    };
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields }
    } = useForm({ defaultValues });

    const onSubmit = async (values) => {
        setLoading(true);
        console.log(touchedFields);
        try {
            console.table(values);
            onChange();
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="mb-3">
                <p>{t('glossary:profile_page.account_bio')}</p>
                <label htmlFor="bio" className="form-label visually-hidden">
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
    );
}
