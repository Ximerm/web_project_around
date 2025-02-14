const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__hobbie");
const addButton = document.querySelector(".profile__add-button");

const cardsContainer = document.querySelector(".card__element");
const cardTemplate = document.querySelector("#card-template").content;

const popup = document.querySelector(".popup");
const closePopupButton = document.querySelector(".popup__close");
const popupFormTitle = document.querySelector(".popup__form-title");
const popupFormButton = document.querySelector(".popup__form-submit");
const firstInput = document.querySelector("#inputFirst");
const secondInput = document.querySelector("#inputSecond");

const formElement = document.querySelector(".popup__form");

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

//Create cards
initialCards.forEach((card) => {
  let cardTemplate = createCard(card);
  cardsContainer.prepend(cardTemplate);
});

function createCard(card) {
  let cardElm = cardTemplate.querySelector(".card__content").cloneNode(true);

  cardElm.querySelector(".card__photo").src = card.link;
  cardElm.querySelector(".card__photo-name").textContent = card.name;

  return cardElm;
}

//Abrir, cerrar y enviar Popup
function openEditAddPopup(evt) {
  const className = evt.currentTarget.className;

  switch (className) {
    case "profile__edit-button":
      popupFormTitle.textContent = "Editar perfil";
      popupFormButton.textContent = "Guardar";
      firstInput.placeholder = "Nombre";
      secondInput.placeholder = "Acerca de mí";
      firstInput.value = profileName.textContent;
      secondInput.value = profileAbout.textContent;
      break;
    case "profile__add-button":
      popupFormTitle.textContent = "Nuevo lugar";
      popupFormButton.textContent = "Crear";
      firstInput.placeholder = "Título";
      secondInput.placeholder = "Enlace a la imagen";
      break;
  }
  popup.classList.add("popup_opened");
}

function closeEditPopup(evt) {
  popup.classList.remove("popup_opened");
}

function FormSubmit(evt) {
  evt.preventDefault();
  const buttonText = evt.currentTarget.innerText;

  switch (buttonText) {
    case "Guardar":
      profileName.textContent = firstInput.value;
      profileAbout.textContent = secondInput.value;
      firstInput.value = "";
      secondInput.value = "";
      break;
    case "Crear":
      const card = {
        name: firstInput.value,
        link: secondInput.value,
      };
      let cardElem = createCard(card);
      cardsContainer.prepend(cardElem);
      break;
  }
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", openEditAddPopup);
addButton.addEventListener("click", openEditAddPopup);
closePopupButton.addEventListener("click", closeEditPopup);
formElement.addEventListener("submit", FormSubmit);
