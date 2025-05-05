export default class Card {
  constructor(
    { name, link, _id, owner, isLiked },
    currentUser,
    templateSelector,
    handleCardClick,
    { handleAddLike, handleRemoveLike, handleRemoveCard }
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._owner = owner;
    this._isLiked = isLiked;
    this._currentUser = currentUser;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
    this._handleRemoveCard = handleRemoveCard;
  }

  _getTemplate() {
    this._element = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card__content")
      .cloneNode(true);
    this._element.querySelector(".card__photo").src = this._link;
    this._element.querySelector(".card__photo-name").alt = this._name;
    this._element.querySelector(".card__photo-name").textContent = this._name;
  }

  _setEventListeners() {
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
      this._handleRemoveCard(this._id, () => {
        this._element.remove();
      });
    });
  }

  _toggleLikeButton() {
    let likeButton = this._element.querySelector(".card__photo-like");
    //Cargar el like en la tarjeta desde el inicio
    if (this._isLiked) {
      likeButton.classList.add("card__photo-like_active");
    }

    likeButton.addEventListener("click", () => {
      if (!this._isLiked) {
        this._handleAddLike(this._id).then((card) => {
          this._isLiked = card.isLiked;
          likeButton.classList.add("card__photo-like_active");
        });
      } else {
        this._handleRemoveLike(this._id).then((card) => {
          this._isLiked = card.isLiked;
          likeButton.classList.remove("card__photo-like_active");
        });
      }
    });
  }

  renderCard() {
    this._getTemplate();
    this._setEventListeners();
    return this._element;
  }
}
