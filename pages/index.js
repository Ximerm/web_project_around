import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopUpWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import {
  nameInput,
  aboutInput,
  editButton,
  addButton,
  profileForm,
  cardForm,
  formSettings,
  avatarButton,
  inputAvatar,
} from "../components/utils.js";
import api from "../components/api.js";

// Variable vacía para después crear las tarjetas
let cardSection = null;

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
  return api
    .updateUser(inputValues.name, inputValues.about)
    .then((data) => {
      // Actualiza la información del usuario en la interfaz
      userInfo.setUserInfo({ name: data.name, about: data.about });
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

// Instancia para Popup Agregar card
const popupAddCard = new PopupWithForm("#popup-add-card", (data) => {
  console.log("Datos de la tarjeta:", data);
  return api
    .addNewCard(data.name, data.link)
    .then((newCard) => {
      console.log("Tarjeta añadida:", newCard);
      const cardElement = createCard(newCard);
      cardSection.addItem(cardElement);
      popupAddCard.close();
    })
    .catch((err) => {
      console.error("Error al agregar la tarjeta:", err);
    });
});
popupAddCard.setEventListeners();

//Instancia popupConfirmation para usarla al abrir el popup de confirmación de "Borrar tarjeta"
const popupConfirmation = new PopupWithConfirmation("#popup-delete-card");
popupConfirmation.setEventListeners();

//Instancia para Agrandar imagen
const popupImage = new PopupWithImage("#popup-big-card");
popupImage.setEventListeners();

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

// Cargar tarjetas desde la API
api
  .getInitialCards()
  .then((initialCards) => {
    cardSection = new Section(
      {
        items: initialCards.reverse(),
        renderer: (item) => {
          const newCard = createCard({
            name: item.name,
            link: item.link,
          });
          cardSection.addItem(newCard);
        },
      },
      ".card__element"
    );
    cardSection.renderItems();
  })
  .catch((err) => console.error("Error al cargar tarjetas:", err));

// Función para crear una nueva tarjeta
function createCard({ name, link, _id, owner, isLiked }, currentUser) {
  const card = new Card(
    { name, link, _id, owner, isLiked },
    currentUser,
    "#card-template",
    (name, link) => {
      popupImage.open(name, link);
    },
    {
      handleAddLike: (cardId) => {
        return api.addLike(cardId);
      },
      handleRemoveLike: (cardId) => {
        return api.removeLike(cardId);
      },
      handleRemoveCard: (cardId) => {
        popupConfirmation.open(() => {
          api
            .removeCard(cardId)
            .then(() => {
              popupConfirmation.close();
            })
            .catch((err) => {
              console.error("Error al eliminar la tarjeta:", err);
            });
        });
      },
    }
  );
  return card.renderCard();
}

//Abrir formularios
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

//Abrir formulario Agregar Card
addButton.addEventListener("click", () => {
  popupAddCard.open();
});

//Validación formularios
//Validación formulario perfil
const formValidatorProfile = new FormValidator(profileForm, formSettings);
formValidatorProfile.enableValidation();

//Validación formulario añadir card
const formValidatorAddCard = new FormValidator(cardForm, formSettings);
formValidatorAddCard.enableValidation();
