import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._element.querySelector(".popup__form");
    this._submitButton = this._form.querySelector(".popup__form-submit");
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._handleFormSubmit) {
        this._handleFormSubmit();
        this.close();
      }
    });
  }

  open(handleConfirm) {
    super.open();
    this._handleConfirm = handleConfirm;
  }
}
