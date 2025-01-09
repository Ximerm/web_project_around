let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closePopupButton = document.querySelector(".popup__close");

let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__hobbie");

let formElement = document.querySelector(".popup__form");

function openEditPopup(evt) {
  popup.classList.add("popup_opened");

  let id = evt.currentTarget.id;
  inputName.value = profileName.textContent;
  inputJob.value = profileAbout.textContent;
}

function closeEditPopup(evt) {
  popup.classList.remove("popup_opened");
}

function FormSubmit(evt) {
  evt.preventDefault();
  let NameInput = document.querySelector("#inputName");
  let JobInput = document.querySelector("#inputJob");

  {
    profileName.textContent = NameInput.value;
    profileAbout.textContent = JobInput.value;
  }
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", openEditPopup);
closePopupButton.addEventListener("click", closeEditPopup);
formElement.addEventListener("submit", FormSubmit);
