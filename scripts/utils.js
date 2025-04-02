//Variables
export const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__hobbie");
export const addButton = document.querySelector(".profile__add-button");

export const cardsContainer = document.querySelector(".card__element");
const cardTemplate = document.querySelector("#card-template").content;

export const closePopupButton = document.querySelectorAll(".popup__close");
const nameInput = document.querySelector("#input-name");
const aboutInput = document.querySelector("#input-about");
const titleInput = document.querySelector("#input-title");
const linkInput = document.querySelector("#input-link");

const formElement = document.querySelector(".popup__form");
export const profileForm = document.querySelector("#form-profile");
export const cardForm = document.querySelector("#form-addCard");

const bigCard = document.querySelector("#popup-big-card");
const bigImageCard = document.querySelector(".popup__image-card");
const bigImageName = document.querySelector(".popup__image-title");
const closeBigImage = document.querySelector(".popup__close_big-card");

const inputSelector = document.querySelector(".popup__form-input");
const buttonElement = document.querySelector(".popup__form-submit");

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

//Agrandar imagen
export const toggleOpenBigImage = (name, link) => {
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
export function editProfile() {
  openPopup("popup-edit");
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

//Abrir añadir card
export function addCard() {
  openPopup("popup-add-card");
}

//Cerrar Popup
export function closePopup(popup) {
  if (popup) {
    popup.classList.remove("popup_opened");
  }
}

//Enviar Formulario
export function formSubmit(evt) {
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
function saveProfile() {
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  nameInput.value = "";
  aboutInput.value = "";
}

//Añadir nueva card
function saveCard() {
  const card = {
    name: titleInput.value,
    link: linkInput.value,
  };
  let cardElem = createCard(card);
  cardsContainer.prepend(cardElem);
}

//Cerrar con click en la superposición
export const setPopupEventListeners = () => {
  const popupList = Array.from(document.querySelectorAll(".popup"));
  popupList.forEach((popup) => {
    // Cerrar cualquier formulario abierto al dar click en la superposición
    popup.addEventListener("click", function (evt) {
      // Verificar si el click ocurrió fuera de la ventana modal y en el popup
      if (evt.target === popup) {
        closePopup(popup);
      }
    });
  });
};

//Cerrar con tecla Escape
export function EscCloseHandler(evt) {
  const popup = document.querySelector(".popup_opened");
  if (evt.key === "Escape" && popup) {
    closePopup(popup);
  }
}

export const formSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-submit",
  inactiveButtonClass: "popup__form-submit_disable",
  inputErrorClass: "popup__form-input_type_error",
  errorClass: "input-error",
};
