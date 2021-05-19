import { throttle } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useCallback, useState } from 'react';
import { useToasts } from 'react-toast-notifications';

import { suggest } from '../../lib/api/dish';

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
                    console.table(response.data.dish);
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
        <div className="col-md-6">
            <button
                type="button"
                onClick={() => {
                    getSuggestion();
                }}>
                hämta
            </button>
            {suggestion && <p>{suggestion}</p>}
        </div>
    );
}
