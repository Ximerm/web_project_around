export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  // Método público para obtener la información del usuario
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  // Método público para establecer la nueva información del usuario
  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }

  // Método público para establecer la nueva Url del avatar
  setUserAvatar(newAvatarUrl) {
    this._avatarElement.src = newAvatarUrl;
  }
}
