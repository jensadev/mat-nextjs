import axios from 'axios';

export async function suggest() {
  if (!window.localStorage.user) return { errors: 'Not logged in' };
  if (Object.keys(window.localStorage.user).length === 0)
    return { errors: 'Not logged in' };
  const currentUser = JSON.parse(window.localStorage.user);
  try {
    // const response = await axios.get(
    //     `${process.env.apiUrl}/dishes/suggest`,
    //     {
    //         headers: {
    //             Authorization: `Bearer ${currentUser.token}`,
    //         },
    //     }
    // );
    const response = {};
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function get() {
  return {};
}
