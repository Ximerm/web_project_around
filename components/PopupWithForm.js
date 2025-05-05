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
    this._submitButton = this._form.querySelector(".popup__form-submit");
    this._submitButtonText = this._submitButton.textContent;

    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      const inputValues = this._getInputValues();
      this._toggleLoadingState(true); // Mostrar "Guardando..."

      // Llamar a la función de manejo de envío y asegurarse de que devuelva una promesa
      this._handleFormSubmit(inputValues)
        .then(() => {
          this.close(); // Cerrar si la solicitud fue exitosa
        })
        .catch((err) => {
          console.error("Error al enviar formulario:", err);
          // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
        })
        .finally(() => {
          this._toggleLoadingState(false); // Restaurar el botón
        });
    });
  }

  // Método privado para recopilar datos de todos los campos de entrada
  _getInputValues() {
    const inputFields = Array.from(
      this._form.querySelectorAll(".popup__form-input")
    );
    const inputValues = {};
    inputFields.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  // Método privado para cambiar el estado del botón
  _toggleLoadingState(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Guardando...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  close() {
    super.close();
    this._form.reset(); // Reiniciar el formulario
  }
}
