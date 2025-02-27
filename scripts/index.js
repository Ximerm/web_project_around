const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__hobbie");
const addButton = document.querySelector(".profile__add-button");

const cardsContainer = document.querySelector(".card__element");
const cardTemplate = document.querySelector("#card-template").content;

const closePopupButton = document.querySelectorAll(".popup__close");
const nameInput = document.querySelector("#input-name");
const aboutInput = document.querySelector("#input-about");
const titleInput = document.querySelector("#input-title");
const linkInput = document.querySelector("#input-link");

const formElement = document.querySelector(".popup__form");
const profileForm = document.querySelector("#form-profile");
const cardForm = document.querySelector("#form-addCard");

const bigCard = document.querySelector("#popup-big-card");
const bigImageCard = document.querySelector(".popup__image-card");
const bigImageName = document.querySelector(".popup__image-title");
const closeBigImage = document.querySelector(".popup__close_big-card");

const inputSelector = document.querySelector(".popup__form-input");
const buttonElement = document.querySelector(".popup__form-submit");

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

//Crear carta
initialCards.forEach((card) => {
  let cardTemplate = createCard(card);
  cardsContainer.prepend(cardTemplate);
});

const toggleOpenBigImage = (card) => {
  bigCard.classList.toggle("popup_opened");
  bigImageCard.src = card.link;
  bigImageCard.alt = card.name;
  bigImageName.textContent = card.name;
};

function createCard(card) {
  let cardElm = cardTemplate.querySelector(".card__content").cloneNode(true);

  cardElm.querySelector(".card__photo").src = card.link;
  cardElm.querySelector(".card__photo").alt = card.name;
  cardElm.querySelector(".card__photo-name").textContent = card.name;

  bigImageName.textContent = card.name;

  trashButton(cardElm);
  toggleLikeButton(cardElm);

  const image = cardElm.querySelector(".card__photo");
  image.addEventListener("click", () => toggleOpenBigImage(card));

  return cardElm;
}

function trashButton(card) {
  let trashButton = card.querySelector(".card__photo-delete");
  trashButton.addEventListener("click", function () {
    card.remove();
  });
}

function toggleLikeButton(card) {
  let likeButton = card.querySelector(".card__photo-like");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__photo-like_active");
  });
}

//Abrir Popup

function openPopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.classList.add("popup_opened");
  }
}

function editProfile() {
  openPopup("popup-edit");
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function addCard() {
  openPopup("popup-add-card");
}

//Cerrar Popup
function closePopup(popup) {
  if (popup) {
    popup.classList.remove("popup_opened");
  }
}

closePopupButton.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});

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

function saveProfile() {
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  nameInput.value = "";
  aboutInput.value = "";
}

function saveCard() {
  const card = {
    name: titleInput.value,
    link: linkInput.value,
  };
  let cardElem = createCard(card);
  cardsContainer.prepend(cardElem);
}

//Cerrar con click en la superposición
const setPopupEventListeners = () => {
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

setPopupEventListeners();

//Cerrar con tecla Escape
function EscCloseHandler(evt) {
  const popup = document.querySelector(".popup_opened");
  if (evt.key === "Escape" && popup) {
    closePopup(popup);
  }
}

editButton.addEventListener("click", editProfile);
addButton.addEventListener("click", addCard);
profileForm.addEventListener("submit", formSubmit);
cardForm.addEventListener("submit", formSubmit);
document.addEventListener("keydown", EscCloseHandler);
