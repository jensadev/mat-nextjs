import axios from 'axios';

export async function store(date, type, dish) {
  try {
    if (!window.localStorage.user) return { errors: 'Not logged in' };
    if (Object.keys(window.localStorage.user).length === 0)
      return { errors: 'Not logged in' };
    const user = JSON.parse(window.localStorage.user);

    // const response = await axios.post(
    //     `${process.env.apiUrl}/meals`,
    //     JSON.stringify({ meal: { date, type, dish } }),
    //     {
    //         headers: {
    //             Authorization: `Bearer ${user.token}`,
    //             'Content-Type': 'application/json',
    //         },
    //     }
    // );
    const response = {};
    return response;
  } catch (error) {
    return error;
  }
}

export async function update(id, date, type, dish) {
  // try {
  //   if (!window.localStorage.user) return { errors: 'Not logged in' };
  //   if (Object.keys(window.localStorage.user).length === 0)
  //     return { errors: 'Not logged in' };
  //   const user = JSON.parse(window.localStorage.user);
  //   const response = await axios.patch(
  //     `${process.env.apiUrl}/meals`,
  //     JSON.stringify({ meal: { id, date, type, dish } }),
  //     {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   );
  //   return response;
  // } catch (error) {
  //   return error;
  // }
}

export async function destroy(mealId) {
  // try {
  //   if (!window.localStorage.user) return { errors: 'Not logged in' };
  //   if (Object.keys(window.localStorage.user).length === 0)
  //     return { errors: 'Not logged in' };
  //   const user = JSON.parse(window.localStorage.user);
  //   const response = await axios.delete(
  //     `${process.env.apiUrl}/meals/${mealId}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   );
  //   return response;
  // } catch (error) {
  //   return error.response;
  // }
}

export async function get() {
  return {};
}
