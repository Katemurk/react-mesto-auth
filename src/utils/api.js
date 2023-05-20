class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    _getError(res) {
      if (!res.ok) {
        return Promise.reject(`Произошла ошибка ${res.status}`);
      }
      return res.json();
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}cards`, {
        method: "GET",
        headers: this._headers,
      }).then((res) => this._getError(res));
    }
  
    setCard({ name, link }) {
      return fetch(`${this._baseUrl}cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({ name, link }),
      }).then((res) => this._getError(res));
    }
  
    getUserInfo() {
      return fetch(`${this._baseUrl}users/me`, {
        method: "GET",
        headers: this._headers,
      }).then((res) => this._getError(res));
    }
  
    setUserInfo({ name, about }) {
      return fetch(`${this._baseUrl}users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about,
        }),
      }).then((res) => this._getError(res));
    }
    setAvatar(data) {
      return fetch(`${this._baseUrl}users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar
        }),
      }).then((res) => this._getError(res));
    }
  
    deleteCard(_id) {
      return fetch(`${this._baseUrl}cards/${_id}`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => this._getError(res));
    }


    _putLike(_id) {
      return fetch(`${this._baseUrl}cards/${_id}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then((res) => this._getError(res));
    }
  
    _deleteLike(_id) {
      return fetch(`${this._baseUrl}cards/${_id}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => this._getError(res));
    }
    
    changeLikeCardStatus(_id, isLiked) {
      return isLiked ? this._deleteLike(_id) : this._putLike(_id)
          }
  }
  
export const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63/",
    headers: {
      authorization: "8a88ecbc-dc1c-499d-af88-db3d07049f66",
      "Content-Type": "application/json",
    },
  });
 
