let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closePopupButton = document.querySelector(".popup__close");

let formValues = document.querySelector(".popup__form-input");

function openEditPopup(evt) {
  popup.classList.add("popup_opened");
  let formValues = document.getElementById("input-Name");
}

function closeEditPopup(evt) {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", openEditPopup);
closePopupButton.addEventListener("click", closeEditPopup);
