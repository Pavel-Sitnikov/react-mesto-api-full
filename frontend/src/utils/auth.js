export const BASE_URL = "http://localhost:4000";

const checkResponse = (res) =>
  res.ok
    ? res.json()
    : Promise.reject(new Error(`Ошибка ${res.status}: ${res.statusText}`));

export function register({ email, password }) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => checkResponse(res));
}

export function authorize({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => checkResponse(res));
}

// export function getContent(token) {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${token}`,
//     },
//   }).then((res) => checkResponse(res));
// }

export function logout(res) {
  return fetch(`${BASE_URL}/signout`, {
    credentials: "include",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then((res) => checkResponse(res));
}
