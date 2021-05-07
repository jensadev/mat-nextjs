import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import Modal from 'react-modal';

import Date from '../date';
import styles from './meal.module.scss';

export default function ListItem({ meal }) {
    const { t } = useTranslation(['glossary']);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    // const [editModalIsOpen, setEditModalIsOpen] = useState(false);

    const openDeleteModal = () => {
        setDeleteModalIsOpen(true);
    };

    const afterOpenModal = (modal) => {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    };

    const closeDeleteModal = () => {
        setDeleteModalIsOpen(false);
    };

    const editMeal = (e) => {
        console.log(meal.id);
    };

    const deleteMeal = (e) => {
        console.log(meal.id);
        // if (window.confirm('Är du säker på att du vill ta bort måltiden?')) {
        //     console.log(meal.id);
        // }
    };

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
                {mealIcon(meal.type)}
                <p>
                    <Date
                        classNames={`${styles.date}`}
                        dateString={meal.date}
                    />
                    {meal.Dish.name}
                </p>
            </div>
            <div className="dropstart">
                <button
                    className={`btn btn-icon ${styles.dropdownToggle}`}
                    type="button"
                    id="more"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <span className="material-icons-round">more_vert</span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="more">
                    <li>
                        <button
                            type="submit"
                            onClick={(e) => {
                                editMeal(e);
                            }}
                            className={`btn btn-icon  ${styles.btn}`}>
                            <span className="visually-hidden">
                                {t('common:edit')}
                            </span>
                            <span className="material-icons-round">edit</span>
                        </button>
                    </li>
                    <li>
                        <button
                            type="submit"
                            onClick={openDeleteModal}
                            className={`btn btn-icon  ${styles.btn}`}>
                            <span className="visually-hidden">
                                {t('common:delete')}
                            </span>
                            <span className="material-icons-round">delete</span>
                        </button>
                    </li>
                </ul>
                <ul className={styles.dropdownMenu} aria-labelledby="more">
                    <li>
                        <button
                            type="submit"
                            onClick={(e) => {
                                editMeal(e);
                            }}
                            className={`btn btn-icon  ${styles.btn}`}>
                            <span className="visually-hidden">
                                {t('common:edit')}
                            </span>
                            <span className="material-icons-round">edit</span>
                        </button>
                    </li>
                    <li>
                        <button
                            type="submit"
                            onClick={openDeleteModal}
                            className={`btn btn-icon  ${styles.btn}`}>
                            <span className="visually-hidden">
                                {t('common:delete')}
                            </span>
                            <span className="material-icons-round">delete</span>
                        </button>
                    </li>
                </ul>
            </div>
            <Modal
                isOpen={deleteModalIsOpen}
                onRequestClose={closeDeleteModal}
                className={styles.modal}
                overlayClassName={styles.overlay}
                contentLabel="Example Modal">
                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>
                        {t('common:delete_something', {
                            what: t('glossary:meal')
                        })}
                    </h3>
                    <button
                        type="button"
                        className={`btn ${styles.btnClose}`}
                        onClick={closeDeleteModal}>
                        <span className="visually-hidden">
                            {t('common:close')}
                        </span>
                        <span className="material-icons-round md-48">
                            close
                        </span>
                    </button>
                </div>
                <div className={styles.modalBody}>
                    {t('common:confirm_delete', { what: t('glossary:meal') })}
                </div>
                <div className={styles.modalFooter}>
                    <button
                        type="button"
                        className="btn btn-cancel"
                        onClick={closeDeleteModal}>
                        {t('common:cancel')}
                    </button>
                    <button
                        type="submit"
                        className="btn btn-delete ms-4"
                        onClick={deleteMeal}>
                        {t('common:delete')}
                    </button>
                </div>
            </Modal>
        </li>
    );
}
