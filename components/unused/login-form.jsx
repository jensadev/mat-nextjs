import Router from 'next/router';
import { useTranslation } from 'next-i18next';
import { useCallback, useState } from 'react';
import { mutate } from 'swr';

import { login } from '../lib/api/user';
import styles from './form.module.css';
import ListErrors from './list-errors';

export default function LoginForm() {
    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = useCallback((e) => setEmail(e.target.value), []);
    const handlePasswordChange = useCallback(
        (e) => setPassword(e.target.value),
        []
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, status } = await login(email, password);
            if (status !== 200) {
                setErrors(data.errors);
            }

            if (data?.user) {
                window.localStorage.setItem('user', JSON.stringify(data.user));
                mutate('user', data?.user);
                Router.push('/');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const { t } = useTranslation(['common', 'glossary']);

    return (
        <>
            <ListErrors errors={errors} />

            <form onSubmit={handleSubmit}>
                <fieldset className={styles.formGroup}>
                    <label htmlFor="email" className="visually-hidden">
                        {t('email')}
                    </label>
                    <input
                        name="email"
                        type="email"
                        placeholder={t('email')}
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <label htmlFor="password" className="visually-hidden">
                        {t('password')}
                    </label>
                    <input
                        type="password"
                        placeholder={t('password')}
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </fieldset>
                <button type="submit" disabled={isLoading}>
                    {t('login')}
                </button>
            </form>
        </>
    );
}
