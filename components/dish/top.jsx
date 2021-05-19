import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useToasts } from 'react-toast-notifications';
import useSWR from 'swr';

import fetcher from '../../lib/utils/fetcher';
import styles from './dish.module.scss';
import ListItem from './list-item';

export default function TopDishes() {
    const { t } = useTranslation(['common', 'glossary']);
    const { addToast } = useToasts();
    const { data, error } = useSWR(
        `${process.env.apiUrl}/dishes/top?limit=5`,
        fetcher
    );

    if (error) {
        return addToast(
            t('common:cant_load', {
                what: `${t('common:recent')} ${t('glossary:dish_plural')}`
            })
        );
    }

    return (
        <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            className={`col-md mb-3 m-2 ${styles.bgTop}`}>
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
            <div className="px-1 py-3">
                <motion.h2
                    className="hero-h2-nolink"
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}>
                    {t('glossary:top_list')}
                </motion.h2>
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
        </motion.div>
    );
}
