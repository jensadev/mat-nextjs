import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';

import styles from './dish.module.scss';

export default function ListItem({ dish, count }) {
    const { t } = useTranslation(['glossary']);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [editDish, setEditDish] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const defaultValues = {
        dish: dish.name
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, touchedFields }
    } = useForm({ defaultValues });

    const openDeleteModal = () => {
        setDeleteModalIsOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalIsOpen(false);
    };

    const deleteDish = async (e) => {
        console.log(e);
    };

    const onSubmit = (values) => {
        console.log(dish.id);
        console.log(values);
        setEditDish(false);
    };

    // const closeDeleteModal = () => {
    //     setDeleteModalIsOpen(false);
    // };

    return (
        <motion.li
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`${styles.listItem} ${
                count ? styles.noFlow : styles.listFlex
            }`}>
            {count && (
                <span className={`${styles.badge} me-2 me-md-3`}>{count}</span>
            )}
            {editDish ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('dish')} />
                </form>
            ) : (
                dish.name
            )}
            {!count && (
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
                                onClick={setEditDish}
                                className={`btn btn-icon  ${styles.btn}`}>
                                <span className="visually-hidden">
                                    {t('common:edit')}
                                </span>
                                <span className="material-icons-round">
                                    edit
                                </span>
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
                                <span className="material-icons-round">
                                    delete
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            )}
            <Modal
                isOpen={deleteModalIsOpen}
                onRequestClose={closeDeleteModal}
                className={styles.modal}
                overlayClassName={styles.overlay}
                contentLabel="Delete Dish Model">
                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>
                        {t('common:delete_something', {
                            what: t('glossary:dish')
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
                    {t('common:confirm_delete')} {dish.name}?
                </div>
                <div className={styles.modalFooter}>
                    <button
                        type="button"
                        className="btn btn-cancel"
                        disabled={isLoading}
                        onClick={closeDeleteModal}>
                        {t('common:no')}
                    </button>
                    <button
                        type="submit"
                        className="btn btn-delete ms-4"
                        disabled={isLoading}
                        onClick={deleteDish}>
                        {t('common:yes')}
                    </button>
                </div>
            </Modal>
        </motion.li>
    );
}
