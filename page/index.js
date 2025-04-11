import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopUpWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import {
  editButton,
  addButton,
  cardsContainer,
  initialCards,
  profileForm,
  cardForm,
  formSubmit,
  formSettings,
  saveCard,
  saveProfile,
} from "../components/utils.js";

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
  //get user info
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
  console.log(inputValues);
  saveProfile(inputValues.name, inputValues.about);
  popupProfile.close();
});

popupProfile.setEventListeners();

//Instancia para Popup Agregar card
const popupAddCard = new PopupWithForm("#popup-add-card", (inputValues) => {
  saveCard(inputValues.title, inputValues.link);
  popupAddCard.close();
});

popupAddCard.setEventListeners();

//Instancia para Agrandar imagen
const popupImage = new PopupWithImage("#popup-big-card");
popupImage.setEventListeners();
