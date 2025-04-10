export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this_element = document.querySelector(this._selector);
  }

  //Método público para agregar los detectores de eventos
  setEvenListenes() {
    //Cerrar al hacer click en el ícono para cerrar popup
    this._element
      .querySelector(".popup__close")
      .addEvenListener("click", () => {
        this.close();
      });
    //Cerrar al hacer click en el área sombreada
    this._element.addEvenListener("click", (evt) => {
      if (evt.target === this._element) {
        this.close();
      }
    });
  }

  //Método privado para cerrar con Esc
  _handleEscClose() {
    if (evt.key === "Escape") {
      this._close();
    }
  }

  //Método público para abrir Popup
  open() {
    this._element.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  //Método público para cerrar Popup
  close() {
    this._element.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
