import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
  }

  // Método público para agregar los Event Listeners
  setEventListeners() {
    super.setEventListeners();
    this._form = this._element.querySelector(".popup__form");
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }

  // Método privado para recopilar datos de todos los campos de entrada
  _getInputValues() {
    const inputFields = Array.from(
      this._form.querySelectorAll(".popup__form-input")
    );
    console.log(inputFields);
    const inputValues = {};
    inputFields.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  close() {
    super.close();
    this._form.reset();
  }
}
