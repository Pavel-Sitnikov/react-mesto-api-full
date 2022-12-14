import { url, headers } from "../utils/utils.js";

export class Api {
  constructor(requestData) {
    this._url = requestData.url;
    this._headers = requestData.headers;
  }

  _confirmStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      headers: this._headers,
    }).then(this._confirmStatus);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
      headers: this._headers,
    }).then(this._confirmStatus);
  }

  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._confirmStatus);
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._confirmStatus);
  }

  toggleLike(_id, isLiked) {
    return fetch(`${this._url}/cards/${_id}/likes`, {
      credentials: 'include',
      method: `${isLiked ? "DELETE" : "PUT"}`,
      headers: this._headers,
    }).then(this._confirmStatus);
  }

  deleteCard(_id) {
    return fetch(`${this._url}/cards/${_id}`, {
      credentials: 'include',
      method: "DELETE",
      headers: this._headers,
    }).then(this._confirmStatus);
  }

  editProfileAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      credentials: 'include',
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._confirmStatus);
  }
}

const api = new Api({ url, headers });

export default api;
