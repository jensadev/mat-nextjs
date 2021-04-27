import Date from '../date';
import styles from './meal.module.scss';
import { useTranslation } from 'next-i18next';

export default function ListItem({ meal }) {
    const { t } = useTranslation(['glossary']);
    
    const mealIcon = (type) => {
        switch (type) {
            case 1:
                return (
                    <div className="position-relative me-3">
                        <span className={styles.breakfast}>
                            {t('glossary:breakfast')[0]}
                        </span>
                        <img
                            alt="breakfast"
                            src="/images/breakfast.svg"
                            height={48}
                            width={48}
                        />
                    </div>
                );
            case 2:
                return (
                    <div className="position-relative me-3">
                        <span className={styles.lunch}>
                            {t('glossary:lunch')[0]}
                        </span>
                        <img
                            alt="lunch"
                            src="/images/lunch.svg"
                            height={48}
                            width={48}
                        />
                    </div>
                );
            case 3:
                return (
                    <div className="position-relative me-3">
                        <span className={styles.dinner}>
                            {t('glossary:dinner')[0]}
                        </span>
                        <img
                            alt="dinner"
                            src="/images/dinner.svg"
                            height={48}
                            width={48}
                        />
                    </div>
                );
            default:
                return 'tom';
        }
    };
    return (
        <li className={styles.listItem}>
            <div className="d-flex">
                {mealIcon(meal.typeId)}
                <p>
                    <Date
                        classNames={`${styles.date}`}
                        dateString={meal.date}
                    />
                    {meal.Dish.name}
                </p>
            </div>
            <div className="dropdown">
                <button
                    className={`btn btn-icon ${styles.dropdownToggle}`}
                    type="button"
                    id="more"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <span className="material-icons-round">more_vert</span>
                </button>
                <ul className={styles.dropdownMenu} aria-labelledby="more">
                    <li>
                        <button className={`btn btn-icon ${styles.btn}`}>
                            <span className="visually-hidden">{t('common:edit')}</span>
                            <span className="material-icons-round">edit</span>
                        </button>
                    </li>
                    <li>
                        <button className={`btn btn-icon ${styles.btn}`}>
                            <span className="visually-hidden">{t('common:delete')}</span>
                            <span className="material-icons-round">delete</span>
                        </button>
                    </li>
                </ul>
            </div>
        </li>
    );
}
