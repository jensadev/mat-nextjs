import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

export default function PublicForm({ profilePublic, onChange }) {
    const { addToast } = useToasts();
    const [isLoading, setLoading] = useState(false);
    const { t } = useTranslation(['common', 'glossary']);
    const defaultValues = {
        profilePublic
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
        <form onChange={handleSubmit(onSubmit)}>
            <fieldset className="mb-3 d-flex">
                <p>{t('glossary:profile_page.account_public')}</p>
                <label htmlFor="public" className="form-label visually-hidden">
                    {t('glossary:public')}
                </label>
                <input
                    type="checkbox"
                    name="profilePublic"
                    {...register('profilePublic', {})}
                />
            </fieldset>
        </form>
    );
}
