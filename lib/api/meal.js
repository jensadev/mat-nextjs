import axios from 'axios';

export async function store(date, typeId, dish) {
  try {
    if (!window.localStorage.user) return { errors: 'Not logged in' };
    if (Object.keys(window.localStorage.user).length === 0) return { errors: 'Not logged in' };
    const user = JSON.parse(window.localStorage.user);

    const response = await axios.post(
      `${process.env.apiUrl}/meals`,
      JSON.stringify({ meal: { date, typeId, dish } }),
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response;
  } catch (error) {
    return error;
  }
}

export async function get() {
  return {};
}
