//Variables edición de perfil
export const nameInput = document.querySelector("#input-name");
export const aboutInput = document.querySelector("#input-about");
export const editButton = document.querySelector(".profile__edit-button");

//Variables añadir tarjeta
export const addButton = document.querySelector(".profile__add-button");
const titleInput = document.querySelector("#input-title");
const linkInput = document.querySelector("#input-link");

//Variables formularios
export const profileForm = document.querySelector("#form-profile");
export const cardForm = document.querySelector("#form-addCard");

//Tarjetas iniciales
export const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

//Guardar edición perfil
export function saveProfile(name, about, updateUserInfo) {
  if (updateUserInfo) {
    updateUserInfo(name, about);
  }
}

//Añadir nueva tarjeta
export function saveCard(addNewCard) {
  const cardData = {
    name: titleInput.value,
    link: linkInput.value,
  };

  if (addNewCard) {
    addNewCard(cardData.name, cardData.link);
  }

  titleInput.value = "";
  linkInput.value = "";
}

//Definir formSettings para validación de formularios
export const formSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-submit",
  inactiveButtonClass: "popup__form-submit_disable",
  inputErrorClass: "popup__form-input_type_error",
  errorClass: "input-error",
};
