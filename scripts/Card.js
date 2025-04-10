export default class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    this._element = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card__content")
      .cloneNode(true);
    this._element.querySelector(".card__photo").src = this._link;
    this._element.querySelector(".card__photo").alt = this._name;
    this._element.querySelector(".card__photo-name").textContent = this._name;
  }

  _setEvenListeners() {
    this._toggleLikeButton();
    this._trashButton();
    const image = this._element.querySelector(".card__photo");
    image.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  _trashButton() {
    let trashButton = this._element.querySelector(".card__photo-delete");
    trashButton.addEventListener("click", () => {
      this._element.remove();
    });
  }

  _toggleLikeButton() {
    let likeButton = this._element.querySelector(".card__photo-like");
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__photo-like_active");
    });
  }

  renderCard() {
    this._getTemplate();
    this._setEvenListeners();
    return this._element;
  }
}
