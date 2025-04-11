export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._element = document.querySelector(this._selector);
    this._handleEscCloseAux = this._handleEscClose.bind(this);
  }

  //Método público para agregar los detectores de eventos
  setEventListeners() {
    //Cerrar al hacer click en el ícono para cerrar popup
    this._element
      .querySelector(".popup__close")
      .addEventListener("click", () => {
        this.close();
      });

    //Cerrar al hacer click en el área sombreada
    this._element.addEventListener("mousedown", (evt) => {
      if (evt.target === this._element) {
        this.close();
      }
    });
  }

  //Método privado para cerrar con Esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  //Método público para abrir Popup
  open() {
    this._element.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscCloseAux);
  }

  //Método público para cerrar Popup
  close() {
    this._element.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscCloseAux);
  }
}
