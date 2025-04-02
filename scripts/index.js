import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  cardsContainer,
  initialCards,
  closePopupButton,
  closePopup,
  setPopupEventListeners,
  editButton,
  editProfile,
  addButton,
  addCard,
  profileForm,
  formSubmit,
  cardForm,
  EscCloseHandler,
  formSettings,
  saveCard,
} from "./utils.js";

//Añadir tarjetas iniciales al contenedor
initialCards.forEach((card) => {
  let cardTemplate = new Card(card.name, card.link, "#card-template");
  cardsContainer.prepend(cardTemplate.renderCard());
});

//LLamado Cierre Popup
closePopupButton.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});

//LLamdo EvenListeners
setPopupEventListeners();

editButton.addEventListener("click", editProfile);
addButton.addEventListener("click", addCard);
profileForm.addEventListener("submit", formSubmit);
cardForm.addEventListener("submit", formSubmit);
document.addEventListener("keydown", EscCloseHandler);

//Validación formulario perfil
const formValidatorProfile = new FormValidator(profileForm, formSettings);
formValidatorProfile.enableValidation();

//Validación formulario añadir card
const formValidatorAddCard = new FormValidator(cardForm, formSettings);
formValidatorAddCard.enableValidation();
