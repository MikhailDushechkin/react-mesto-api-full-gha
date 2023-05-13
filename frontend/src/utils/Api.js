import { BASE_URL } from "./auth";
class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  //проверка ответа
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }

  //выгрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  //добавление новой карточки
  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._checkResponse)
  }

  //удаление карточки
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  changeLikeStatus(id, isLiked) {
    if(isLiked) {
      return this.setLike(id)
    } else {
      return this.deleteLike(id)
    }
  }

  //установка лайка
  setLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  //удаление лайка
  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  //получение данные профиля
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  //установка/изменение данные профиля
  setUserData(userData) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
    .then(this._checkResponse)
  }

  //установка/изменение аватара
  setUserAvatar(userData) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: userData.avatar
      })
    })
    .then(this._checkResponse)
  }

  //вернуть результат выполнения нужных промисов
  getInitialData() {
    return Promise.all([this.getInitialCards(), this.getUserData()])
  }
}

const api = new Api({
  url: BASE_URL,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${ localStorage.getItem('token') }`,
  }
});

export default api;
