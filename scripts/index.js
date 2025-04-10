import Card from "./Card.js";
import PopupWithForm from "./PopupWithForm.js";
import FormValidator from "./FormValidator.js";
import {
  cardsContainer,
  initialCards,
  editButton,
  editProfile,
  addButton,
  addCard,
  profileForm,
  formSubmit,
  cardForm,
  formSettings,
  saveCard,
  saveProfile,
} from "./utils.js";

//Añadir tarjetas iniciales al contenedor
initialCards.forEach((card) => {
  let cardTemplate = new Card(card.name, card.link, "#card-template");
  cardsContainer.prepend(cardTemplate.renderCard());
});

editButton.addEventListener("click", () => {
  popupProfile.open();
});
addButton.addEventListener("click", addCard);

//Validación formulario perfil
const formValidatorProfile = new FormValidator(profileForm, formSettings);
formValidatorProfile.enableValidation();

//Validación formulario añadir card
const formValidatorAddCard = new FormValidator(cardForm, formSettings);
formValidatorAddCard.enableValidation();

//Instancia para Popup Edición Perfil
const popupProfile = new PopupWithForm("#popup-edit", (inputValues) => {
  saveProfile(inputValues.name, inputValues.about);
  popupProfile.close();
});

//Instancia para Popup Edición Perfil
