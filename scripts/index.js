import Card from "./Card.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopUpWithImage.js";
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
  let cardTemplate = new Card(
    card.name,
    card.link,
    "#card-template",
    (name, link) => {
      popupImage.open(name, link);
    }
  );
  cardsContainer.prepend(cardTemplate.renderCard());
});

//Abrir formulario Edición perfil
editButton.addEventListener("click", () => {
  popupProfile.open();
});

//Abrir formulario Agregar Card
addButton.addEventListener("click", () => {
  popupAddCard.open();
});

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

//Instancia para Popup Agregar card
const popupAddCard = new PopupWithForm("#popup-add-card", (inputValues) => {
  saveCard(inputValues.title, inputValues.link);
  popupAddCard.close();
});

//Instancia para Agrandar imagen
const popupImage = new PopupWithImage("#popup-big-card");
