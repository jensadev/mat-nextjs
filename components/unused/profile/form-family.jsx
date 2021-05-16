/* eslint-disable react/jsx-props-no-spreading */
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import { update } from '../../lib/api/user';

export default function FamilyForm({ family, onChange }) {
    const { addToast } = useToasts();
    const [isLoading, setLoading] = useState(false);
    const { t } = useTranslation(['common', 'glossary', 'validation']);
    const defaultValues = {
        family
    };
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues });

    const onSubmit = async (values) => {
        setLoading(true);
        try {
            const user = {
                family: values.family
            };
            console.log(user);
            const response = await update(user);
            if (response.status !== 200) {
                addToast(t('validation:something_went_wrong'), {
                    appearance: 'error'
                });
                // console.log(response.data.errors);
                // Object.keys(response.data.errors).map((key, index) => {
                //     setError(key, {
                //         type: 'manual',
                //         message: response.data.errors[key][0]
                //     });
                // });
            }
            if (response.status === 200) {
                addToast(t('common:updated', { what: t('glossary:meal') }), {
                    appearance: 'success'
                });
                onChange(response.updatedUser);
            }
        } catch (err) {
            addToast(t('validation:something_went_wrong'), {
                appearance: 'error'
            });
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    console.log(family);

    return (
        <form onChange={handleSubmit(onSubmit)}>
            <fieldset className="mb-3 d-flex">
                <p>{t('glossary:profile_page.account_family')}</p>
                <label htmlFor="family" className="form-label visually-hidden">
                    {t('glossary:family')}
                </label>
                <input
                    disabled={isLoading}
                    type="checkbox"
                    name="family"
                    {...register('family')}
                />
            </fieldset>
        </form>
    );
}
