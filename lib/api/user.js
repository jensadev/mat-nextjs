import axios from 'axios';

export async function login(email, password) {
  try {
    const response = await axios.post(
      `${process.env.apiUrl}/users/login`,
      JSON.stringify({ user: { email, password } }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    // console.table(response);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function store(email, password, passwordConfirmation) {
  try {
    const response = await axios.post(
      `${process.env.apiUrl}/users`,
      JSON.stringify({ user: { email, password, passwordConfirmation } }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function current() {
  const user = window.localStorage.getItem('user');
  const token = user?.token;
  try {
    const response = await axios.get('/user', {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(token)}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

// get: async (username) => axios.get(`${SERVER_BASE_URL}/profiles/${username}`),

export async function get(user) {
  try {
    const response = await axios.get(
      `${process.env.apiUrl}/users/${user}`,
    );

    return response;
  } catch (error) {
    return error.response;
  }
}
