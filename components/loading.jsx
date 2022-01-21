import { useTranslation } from 'next-i18next';

export default function Loading() {
    const { t } = useTranslation(['common']);
    return (
        <div className="position-absolute top-50 start-50 translate-middle">
            <div
                className="spinner-border"
                style={{ width: '4rem', height: '4rem' }}
                role="status"
            >
                <span className="visually-hidden">
                    {t('common:loading')}...
                </span>
            </div>
        </div>
    );
}
