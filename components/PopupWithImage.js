import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(link, name) {
    super.open();
    const image = this._element.querySelector(".popup__image-card");
    const text = this._element.querySelector(".popup__image-title");
    image.src = link;
    image.alt = name;
    text.textContent = name;
  }
}
