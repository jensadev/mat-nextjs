import { useTranslation } from 'next-i18next';
import { useToasts } from 'react-toast-notifications';
import useSWR from 'swr';

import fetcher from '../../lib/utils/fetcher';
import styles from './dish.module.scss';
import ListItem from './list-item';

export default function TopDishes() {
    const { t } = useTranslation(['common', 'glossary']);
    const { addToast } = useToasts();
    const { data, error } = useSWR(`${process.env.apiUrl}/dishes/top`, fetcher);

    if (error) {
        return addToast(
            t('common:cant_load', {
                what: `${t('common:recent')} ${t('glossary:dish_plural')}`
            })
        );
    }

    return (
        <div className="col-md-6">
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
                {data &&
                    data.dishes?.map((dish) => (
                        <ListItem
                            key={dish.Dish.id}
                            dish={dish.Dish}
                            count={dish.count}
                        />
                    ))}
            </ul>
        </div>
    );
}
