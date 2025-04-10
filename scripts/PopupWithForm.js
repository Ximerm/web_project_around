import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
  }

  // Método público para agregar los Event Listeners
  setEvenListeners() {
    super.setEvenListeners();
    this._form = this._element.querySelector(".popup__form");
    this._form.addEvenListener("submit", (event) => {
      event.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }

  // Método privado para recopilar datos de todos los campos de entrada
  _getInputValues() {
    const inputFields = Array.from(this._form.querySelectorAll("[name]"));
    const inputValues = {};
    inputFields.forEach((input) => {
      inputFields[input.name] = input.value;
    });
    return inputValues;
  }
}
