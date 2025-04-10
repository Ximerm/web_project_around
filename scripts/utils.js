import Card from "./Card.js";

//Variables edición de perfil
export const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__hobbie");
const nameInput = document.querySelector("#input-name");
const aboutInput = document.querySelector("#input-about");

//Variables añadir tarjeta
const addButton = document.querySelector(".profile__add-button");
const cardsContainer = document.querySelector(".card__element");
const titleInput = document.querySelector("#input-title");
const linkInput = document.querySelector("#input-link");

//Variables Popup
const closePopupButton = document.querySelectorAll(".popup__close");

//Variables formularios
const profileForm = document.querySelector("#form-profile");
const cardForm = document.querySelector("#form-addCard");

//Variables agrandar tarjeta
const bigCard = document.querySelector("#popup-big-card");
const bigImageCard = document.querySelector(".popup__image-card");
const bigImageName = document.querySelector(".popup__image-title");

//Tarjetas iniciales
const initialCards = [
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

//Agrandar imagen
const toggleOpenBigImage = (name, link) => {
  bigCard.classList.toggle("popup_opened");
  bigImageCard.src = link;
  bigImageCard.alt = name;
  bigImageName.textContent = name;
};

//Abrir Popup general
function openPopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.classList.add("popup_opened");
  }
}

//Abrir edición perfil
function editProfile() {
  openPopup("popup-edit");
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

//Abrir añadir tarjeta
function addCard() {
  openPopup("popup-add-card");
}

//Cerrar Popup
function closePopup(popup) {
  if (popup) {
    popup.classList.remove("popup_opened");
  }
}

//Enviar Formulario
function formSubmit(evt) {
  evt.preventDefault();
  const form = evt.currentTarget;
  if (form.id === "form-profile") {
    saveProfile();
  } else if (form.id === "form-addCard") {
    saveCard();
  }

  closePopup(form.closest(".popup"));
}

//Guardar edición perfil
export function saveProfile(name, about) {
  profileName.textContent = name;
  profileAbout.textContent = about;
  nameInput.value = "";
  aboutInput.value = "";
}

//Añadir nueva tarjeta
function saveCard() {
  const card = {
    name: titleInput.value,
    link: linkInput.value,
  };

  let cardTemplate = new Card(card.name, card.link, "#card-template");
  let cardElement = cardTemplate.renderCard();
  cardsContainer.prepend(cardElement);

  titleInput.value = " ";
  linkInput.value = " ";
}

//Definir formSettings para validación de formularios
const formSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-submit",
  inactiveButtonClass: "popup__form-submit_disable",
  inputErrorClass: "popup__form-input_type_error",
  errorClass: "input-error",
};

export {
  toggleOpenBigImage,
  cardsContainer,
  initialCards,
  editProfile,
  addButton,
  addCard,
  profileForm,
  formSubmit,
  cardForm,
  formSettings,
  saveCard,
};
