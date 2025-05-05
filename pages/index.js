import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopUpWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import {
  nameInput,
  aboutInput,
  editButton,
  addButton,
  initialCards,
  profileForm,
  cardForm,
  formSettings,
  saveCard,
  saveProfile,
  avatarButton,
  inputAvatar,
} from "../components/utils.js";
import api from "../components/api.js";

//Instancias de clases
//Instancia UserInfo para usarla al abrir el formulario "Editar perfil"
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__hobbie",
  avatarSelector: ".profile__avatar",
});

// Instancia para Popup Edición Perfil
const popupProfile = new PopupWithForm("#popup-edit", (inputValues) => {
  // Llamar a la API para actualizar el perfil
  api
    .updateUser(inputValues.name, inputValues.about)
    .then((name, about) => {
      // Actualizar la información del usuario en la interfaz
      userInfo.setUserInfo({ name, about });
      popupProfile.close();
    })
    .catch((err) => {
      console.error("Error al actualizar el perfil:", err);
    });
});
popupProfile.setEventListeners();

//Instancia para cambiar de avatar
const avatarPopup = new PopupWithForm("#popup-avatar", (data) => {
  return api
    .updateUserAvatar(data.avatar)
    .then((updatedData) => {
      userInfo.setUserAvatar(data.avatar);
      avatarPopup.close();
    })
    .catch((err) => console.error("Error al actualizar avatar:", err));
});
avatarPopup.setEventListeners();

//Cargar datos desde la API
// Cargar datos del usuario desde la API
api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
    });
    userInfo.setUserAvatar(userData.avatar);
  })
  .catch((err) => console.error("Error al obtener datos del usuario:", err));

// Abrir formulario Edición perfil con la información actual cargada
editButton.addEventListener("click", () => {
  const userInfoData = userInfo.getUserInfo();
  nameInput.value = userInfoData.name;
  aboutInput.value = userInfoData.about;
  popupProfile.open();
});

//Abrir formulario Edición Avatar
avatarButton.addEventListener("click", () => {
  inputAvatar.value = "";
  avatarPopup.open();
});

// Función para crear una nueva tarjeta
function createCard(name, link) {
  const card = new Card(name, link, "#card-template", (name, link) => {
    popupImage.open(name, link);
  });
  return card.renderCard();
}

// Crear instancia de Section para manejar las tarjetas
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item.name, item.link);
      cardSection.addItem(cardElement);
    },
  },
  ".card__element"
);

// Renderizar tarjetas iniciales
cardSection.renderItems();

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

//Instancia para Popup Agregar card
const popupAddCard = new PopupWithForm("#popup-add-card", () => {
  saveCard((name, link) => {
    const cardElement = createCard(name, link);
    cardSection.addItem(cardElement);
  });
  popupAddCard.close();
});
popupAddCard.setEventListeners();

//Instancia para Agrandar imagen
const popupImage = new PopupWithImage("#popup-big-card");
popupImage.setEventListeners();
