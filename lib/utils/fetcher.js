import axios from 'axios';

function updateOptions() {
    if (typeof window === 'undefined') return {};

    if (!window.localStorage.user) return {};

    if (Object.keys(window.localStorage.user).length === 0) return {};

    const user = JSON.parse(window.localStorage.user);

    if (user.token) {
        return {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
    }

    return {};
}

export default async function fetcher(url) {
    const { data } = await axios.get(url, updateOptions());
    return data;
}
