// import 'react-datepicker/dist/react-datepicker.css';
import { ErrorMessage } from '@hookform/error-message';
import { format } from 'date-fns';
import { en, sv } from 'date-fns/locale/';
import { usePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useToasts } from 'react-toast-notifications';
import useSWR from 'swr';

import { store } from '../../lib/api/meal';
import fetcher from '../../lib/utils/fetcher';
// import Loading from './loading';
import styles from './meal.module.scss';
// import Alert from './unused/alert';

export default function MealForm() {
    const [isPresent, safeToRemove] = usePresence();
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();
    const { t } = useTranslation(['common', 'glossary', 'validation']);
    const { data, error } = useSWR(`${process.env.apiUrl}/dishes`, fetcher);
    const { addToast } = useToasts();
    const defaultValues = {
        date: Date.now(),
        type: { value: '3', label: t('glossary:dinner') },
        dish: ''
    };

    useEffect(() => {
        if (!isPresent) setTimeout(safeToRemove, 1000);
    }, [isPresent, safeToRemove]);

    const {
        handleSubmit,
        reset,
        control,
        watch,
        setError,
        formState: { errors }
    } = useForm({ defaultValues });

    const watchDate = watch('date');

    if (error) {
        return addToast(
            t('common:cant_load', { what: t('glossary:dish_plural') }),
            {
                appearance: 'error'
            }
        );
        // return (
        //   <Alert type="danger">
        //     {t('common:cant_load', { what: t('glossary:dish_plural') })}
        //     ...
        //   </Alert>
        // );
    }

    // if (!data) return <Loading />;
    const dishes = (data && data.dishes) || false;

    const onSubmit = async (values) => {
        setLoading(true);

        // if (Object.entries(errors).length !== 0) {
        //   return <Alert error>Fel ...</Alert>;
        // }

        try {
            const response = await store(
                new Date(values.date).toISOString(),
                values.type.value,
                values.dish.value
            );
            if (response.status !== 201) {
                console.log(response.data.errors);
                Object.keys(response.data.errors).map((key, index) => {
                    setError(key, {
                        type: 'manual',
                        message: response.data.errors[key][0]
                    });
                });
            }
            if (response.status === 201) {
                addToast(t('common:created', { what: t('glossary:meal') }), {
                    appearance: 'success'
                });
                console.table(response.data.meal);
                reset(defaultValues);
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

    return (
        <div className="d-flex flex-column h-100 px-md-5">
            <header className="page-header">
                <div className="container ">
                    <h1 className="page-heading">
                        {t('common:add', { what: t('glossary:meal') })}
                    </h1>
                </div>
            </header>
            <div className="content w-100">
                <div className="container ">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={styles.mealForm}>
                        <p className="capitalize-first mb-1 mb-md-2">
                            {format(watchDate || Date.now(), 'eeee', {
                                locale: router.locale === 'en' ? en : sv
                            })}{' '}
                            {t('glossary:the')}
                        </p>
                        <label
                            htmlFor="date"
                            className="form-label visually-hidden">
                            {`${t('common:date')}*`}
                        </label>
                        <Controller
                            control={control}
                            name="date"
                            rules={{
                                required: true,
                                valueAsDate: true
                            }}
                            render={({ field }) => (
                                <ReactDatePicker
                                    closeOnScroll
                                    // popperClassName="some-custom-class"
                                    popperPlacement="bottom-start"
                                    popperModifiers={{
                                        preventOverflow: {
                                            enabled: true,
                                            escapeWithReference: false,
                                            boundariesElement: 'viewport'
                                        }
                                    }}
                                    locale={router.locale === 'en' ? en : sv}
                                    dateFormat="do LLLL"
                                    className="w-100"
                                    placeholderText="Select date"
                                    onChange={(e) => field.onChange(e)}
                                    selected={field.value}
                                />
                            )}
                        />
                        <ErrorMessage errors={errors} name="date" />
                        <p className="pt-1 pt-md-4 mb-1 mb-md-2">
                            {watchDate > defaultValues.date
                                ? t('glossary:to_eat')
                                : t('glossary:eaten')}
                        </p>
                        <label
                            htmlFor="dish"
                            className="form-label visually-hidden">
                            {`${t('glossary:dish')}*`}
                        </label>
                        <Controller
                            name="dish"
                            control={control}
                            rules={{
                                required: true,
                                minLength: 4
                            }}
                            render={({ field }) => (
                                <CreatableSelect
                                    formatCreateLabel={(inputValue) =>
                                        `${t(
                                            'common:form_create'
                                        )} "${inputValue}"`
                                    }
                                    noOptionsMessage={() =>
                                        `${t('common:form_no_options')}`
                                    }
                                    theme={(theme) => ({
                                        ...theme,
                                        borderRadius: 0,
                                        borderWidth: '2px',
                                        colors: {
                                            ...theme.colors,
                                            primary25: '#77D7DB',
                                            primary: '#231F20',
                                            neutral20: '#fff',
                                            neutral30: '#fff'
                                        }
                                    })}
                                    isValidNewOption={(option) =>
                                        option.length > 3
                                    }
                                    placeholder={`${t(
                                        'glossary:dish_placeholder'
                                    )}`}
                                    isClearable
                                    options={
                                        dishes &&
                                        dishes.map((dish) => ({
                                            label: dish.name,
                                            value: dish.name
                                        }))
                                    }
                                    {...field}
                                />
                            )}
                        />
                        <ErrorMessage errors={errors} name="dish" />
                        <p className="pt-1 pt-md-4 mb-1 mb-md-2">
                            {t('glossary:for')}
                        </p>
                        <label
                            htmlFor="type"
                            className="form-label visually-hidden">
                            {`${t('glossary:meal_type')}*`}
                        </label>
                        <Controller
                            name="type"
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={({ field }) => (
                                <ReactSelect
                                    theme={(theme) => ({
                                        ...theme,
                                        borderRadius: 0,
                                        borderWidth: '2px',
                                        colors: {
                                            ...theme.colors,
                                            primary25: '#77D7DB',
                                            primary: '#231F20',
                                            neutral20: '#fff',
                                            neutral30: '#fff'
                                        }
                                    })}
                                    options={[
                                        {
                                            value: '1',
                                            label: t('glossary:breakfast')
                                        },
                                        {
                                            value: '2',
                                            label: t('glossary:lunch')
                                        },
                                        {
                                            value: '3',
                                            label: t('glossary:dinner')
                                        }
                                    ]}
                                    {...field}
                                />
                            )}
                        />
                        <ErrorMessage errors={errors} name="type" />
                        <div className="pt-3 pt-md-4 pb-3">
                            <button
                                className="btn btn-clear w-100"
                                type="button"
                                disabled={isLoading}
                                onClick={() => {
                                    reset(defaultValues);
                                }}>
                                {t('common:reset')}
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn btn-create w-100 mt-3 mt-md-4">
                                {t('common:create')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
