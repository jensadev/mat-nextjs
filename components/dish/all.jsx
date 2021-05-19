import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import useSWR from 'swr';

import fetcher from '../../lib/utils/fetcher';
import Pagination from '../pagination';
import styles from './dish.module.scss';
import ListItem from './list-item';

export default function AllDishes() {
    const [pageIndex, setPageIndex] = useState(1);
    const { t } = useTranslation(['common', 'glossary']);
    const { addToast } = useToasts();
    const { data, error } = useSWR(
        `${process.env.apiUrl}/dishes?page=${pageIndex}`,
        fetcher
    );

    if (error) {
        return addToast(
            t('common:cant_load', {
                what: `${t('common:recent')} ${t('glossary:dish_plural')}`
            })
        );
    }

    const { pager, pageOfItems } = data || false;
    const setIndex = (page) => {
        setPageIndex(page);
    };

    return (
        <div className="col">
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
                    pageOfItems?.map((dish) => (
                        <ListItem key={dish.id} dish={dish} />
                    ))}
            </ul>
            {pager && <Pagination pager={pager} setIndex={setIndex} />}
        </div>
    );
}
