import { useTranslation } from 'next-i18next';
import { useEffect, useRef } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useSWRInfinite } from 'swr';

import fetcher from '../../lib/utils/fetcher';
// import Pagination from '../pagination';
import styles from './dish.module.scss';
import ListItem from './list-item';

const PAGE_SIZE = 7;

export default function AllDishes() {
    // const [pageIndex, setPageIndex] = useState(1);
    const { t } = useTranslation(['common', 'glossary']);
    const { addToast } = useToasts();
    const loader = useRef(null);
    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
        (index) =>
            `${process.env.apiUrl}/dishes?size=${PAGE_SIZE}&page=${index}`,
        fetcher
    );

    const dishes = data ? [].concat(...data) : [];
    const isLoadingInitialData = !data && !error;
    const isLoadingMore =
        isLoadingInitialData ||
        (size > 0 && data && typeof data[size - 1] === 'undefined');
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
    const isRefreshing = isValidating && data && data.length === size;

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {
            loader.current.click();
        }
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0
        };
        // initialize IntersectionObserver
        // and attaching to Load More div
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current);
        }
    }, []);

    if (error) {
        return addToast(
            t('common:cant_load', {
                what: `${t('common:recent')} ${t('glossary:dish', {
                    count: 0
                })}`
            })
        );
    }

    return (
        <div className="col my-3">
            {!data ||
                (isLoadingMore && (
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
                ))}
            <h2 className="hero-h2-nolink text-dark">
                {t('glossary:show_all', {
                    what: t('glossary:dish', { count: 0 })
                })}
            </h2>
            <ul className={styles.list}>
                {dishes &&
                    dishes?.map((dish) => (
                        <ListItem key={dish.id} dish={dish} />
                    ))}
            </ul>
            <nav className="d-flex justify-content-center">
                <button
                    ref={loader}
                    className="btn btn-dish d-flex align-items-center justify-content-center"
                    type="button"
                    disabled={isLoadingMore || isReachingEnd}
                    onClick={() => {
                        setSize(size + 1);
                    }}>
                    {isLoadingMore ? (
                        <>
                            <span
                                className="spinner-border me-3"
                                role="status"
                                aria-hidden="true"
                            />
                            {t('common:loading')}
                            ...
                        </>
                    ) : isReachingEnd ? (
                        t('common:no_more', {
                            what: t('glossary:dish', { count: 0 })
                        })
                    ) : (
                        <>
                            {t('common:load_more', {
                                what: t('glossary:dish', { count: 0 })
                            })}
                            <span className="material-icons-round md-48">
                                read_more
                            </span>
                        </>
                    )}
                </button>
            </nav>
        </div>
    );
}
