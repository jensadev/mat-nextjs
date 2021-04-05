import Router from 'next/router';
import { mutate } from 'swr';
import { useState, useCallback } from 'react';
import ListErrors from './list-errors';
import { register } from '../lib/api/user';

export default function RegisterForm() {
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleEmailChange = useCallback(
    (e) => setEmail(e.target.value),
    [],
  );
  const handlePasswordChange = useCallback(
    (e) => setPassword(e.target.value),
    [],
  );
  const handlePasswordConfirmationChange = useCallback(
    (e) => setPasswordConfirmation(e.target.value),
    [],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, status } = await register(email, password, passwordConfirmation);
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

  return (
    <>
      <ListErrors errors={errors} />
      <form onSubmit={handleSubmit}>
        <fieldset>
          <fieldset>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </fieldset>

          <fieldset>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </fieldset>

          <fieldset>
            <input
              type="password"
              placeholder="Password Confirmation"
              value={passwordConfirmation}
              onChange={handlePasswordConfirmationChange}
            />
          </fieldset>

          <button
            type="submit"
            disabled={isLoading}
          >
            Sign up
          </button>
        </fieldset>
      </form>

    </>
  );
}
