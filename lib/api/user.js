import axios from 'axios';

export async function login(email, password, locale) {
    try {
        const response = await axios.post(
            `${process.env.apiUrl}/users/login`,
            JSON.stringify({ user: { email, password } }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': locale
                }
            }
        );
        return response;
    } catch (error) {
        return error.response;
    }
}

export async function store(email, password, passwordConfirmation, locale) {
    try {
        const response = await axios.post(
            `${process.env.apiUrl}/users`,
            JSON.stringify({ user: { email, password, passwordConfirmation } }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': locale
                }
            }
        );
        return response;
    } catch (error) {
        return error.response;
    }
}

export async function current(locale) {
    const user = window.localStorage.getItem('user');
    const token = user?.token;
    try {
        const response = await axios.get('/users', {
            headers: {
                Authorization: `Bearer ${encodeURIComponent(token)}`,
                'Accept-Language': locale
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

// get: async (username) => axios.get(`${SERVER_BASE_URL}/profiles/${username}`),

export async function get(userId) {
    const user = window.localStorage.getItem('user');
    const token = user?.token;
    try {
        const response = await axios.get(
            `${process.env.apiUrl}/users/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${encodeURIComponent(token)}`
                }
            }
        );

        return response;
    } catch (error) {
        return error.response;
    }
}

export async function update(user) {
    if (!window.localStorage.user) return { errors: 'Not logged in' };
    if (Object.keys(window.localStorage.user).length === 0)
        return { errors: 'Not logged in' };
    const currentUser = JSON.parse(window.localStorage.user);
    try {
        const response = await axios.patch(
            `${process.env.apiUrl}/users`,
            JSON.stringify({ user }),
            {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response;
    } catch (error) {
        return error.response;
    }
}
