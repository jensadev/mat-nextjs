import { motion } from 'framer-motion';
import { throttle } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useCallback, useState } from 'react';
import { useToasts } from 'react-toast-notifications';

import { suggest } from '../../lib/api/dish';
import { suggestButton } from '../../lib/utils/animations';
import styles from './dish.module.scss';

export default function SuggestDish() {
    const [isLoading, setLoading] = useState(false);
    const { addToast } = useToasts();
    const { t } = useTranslation(['common', 'glossary', 'validation']);
    const [suggestion, setSuggestion] = useState();

    const getSuggestion = useCallback(
        throttle(async () => {
            setLoading(true);
            try {
                const response = await suggest();
                if (response.status === 200) {
                    setSuggestion(response.data.dish.name);
                }
            } catch (err) {
                addToast(t('validation:something_went_wrong'), {
                    appearance: 'error'
                });
                console.error(err);
            } finally {
                setLoading(false);
            }
        }, 2000),
        []
    );

    return (
        <motion.div
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            className={`col-md-6 mb-3 m-2 ${styles.bgSuggest}`}>
            <div className="mx-1 py-3 d-flex flex-column h-100">
                <motion.h2
                    className="hero-h2-nolink mb-auto"
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}>
                    {t('glossary:suggest_what', { what: t('glossary:dish') })}
                </motion.h2>
                {suggestion && (
                    <h3 className={`h2 ${styles.textSuggestion}`}>
                        {suggestion}
                    </h3>
                )}
                <button
                    className="mt-auto btn btn-suggest d-flex align-items-center justify-content-center"
                    type="button"
                    onClick={() => {
                        setLoading(true);
                        getSuggestion();
                    }}>
                    {' '}
                    {t('glossary:get_what', {
                        what: t('glossary:dish')
                    })}
                    <motion.span
                        variants={suggestButton}
                        animate={isLoading ? 'spun' : 'spin'}
                        className="material-icons-round md-48">
                        mood
                    </motion.span>
                </button>
            </div>
        </motion.div>
    );
}
