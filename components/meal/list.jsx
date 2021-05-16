import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import useSWR, { mutate } from 'swr';

import { useAppContext } from '../../context/app-context';
import fetcher from '../../lib/utils/fetcher';
import Pagination from '../pagination';
import ListItem from './list-item';
import styles from './meal.module.scss';

export default function MealList() {
    const [pageIndex, setPageIndex] = useState(1);
    const { addToast } = useToasts();
    const { t } = useTranslation(['common', 'glossary']);
    const { currentUser, updated, toggleUpdate } = useAppContext();
    const { data, error } = useSWR(
        `${process.env.apiUrl}/meals?page=${pageIndex}`,
        fetcher
    );

    if (error) {
        return addToast(
            t('common:cant_load', {
                what: `${t('common:recent')} ${t('glossary:meal_plural')}`
            })
        );
    }

    const onUpdate = () => {
        mutate(`${process.env.apiUrl}/meals?page=${pageIndex}`);
    };

    const { pager, pageOfItems } = data || false;

    if (updated) {
        onUpdate();
        toggleUpdate(false);
    }

    if (pager) {
        currentUser.meals = pager.totalItems;
        localStorage.setItem('user', JSON.stringify(currentUser));
    }

    const setIndex = (page) => {
        setPageIndex(page);
    };

    return (
        <div className="w-100">
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
            <ul className={styles.list}>
                {pageOfItems &&
                    pageOfItems?.map((meal) => (
                        <ListItem
                            key={meal.id}
                            meal={meal}
                            onUpdate={onUpdate}
                        />
                    ))}
            </ul>
            {pager && <Pagination pager={pager} setIndex={setIndex} />}
        </div>
    );
}
