let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closePopupButton = document.querySelector(".popup__close");

let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__hobbie");

function openEditPopup(evt) {
  popup.classList.add("popup_opened");

  let id = evt.currentTarget.id;
  inputName.value = profileName.textContent;
  inputJob.value = profileAbout.textContent;
}

function renderAdded() {
  let profileName = document.querySelector(".profile__name");
  let profileAbout = document.querySelector(".profile__hobbie");

  if (profileName.value === "" || profileAbout.value === "") {
    submitButton.setAttribute("disable", true);
    submitButton.classList.add("popup__form-submit_disable");
  } else {
    submitButton.removeAttribute("disable");
    submitButton.classList.remove("popup__form-submit_disable");
  }
}

function closeEditPopup(evt) {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", openEditPopup);
closePopupButton.addEventListener("click", closeEditPopup);
