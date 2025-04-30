
import { createCard } from "../components/card.js";
import { openPopup, closePopup } from "../components/modal.js";
import { initialCards } from "./cards.js";
import "../pages/index.css";

const container = document.querySelector('.content');
const placesList = container.querySelector('.places__list');

// константы для обработки открытия попапов карточек
const popupTypeImage = document.querySelector('.popup_type_image');
const imageInPopupTypeImage = popupTypeImage.querySelector('.popup__image');
const captionInPopupTypeImage = popupTypeImage.querySelector('.popup__caption');

// константы для обработки кликов
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');


// константы для формы добавления карточек
const formPlace = document.forms['new-place']                                  
const inputNameFormNewPlace = formPlace.elements['place-name'];
const inputLinkFormNewPlace = formPlace.elements.link;

// константы для формы редактирования профия
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;

// функция для заполнения формы изменения профиля из кода страницы
function editFormSubmit(evt) {                                               
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(editPopup);
}

// функция открытия попапа карточки
function openImagePopup(data) {
    imageInPopupTypeImage.src = data.link;
    imageInPopupTypeImage.alt = data.name;
    captionInPopupTypeImage.textContent = data.name;
    openPopup(popupTypeImage);
  }

// функция события сохранения новой карточки
function newPlaceFormSubmit(evt) {
    evt.preventDefault();

    const card = {
        name: inputNameFormNewPlace.value,
        link: inputLinkFormNewPlace.value
    }
    const newCard = createCard(card, openImagePopup);
    placesList.prepend(newCard);
    formPlace.reset();
    closePopup(newCardPopup);
}

// обработка событий
editButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(editPopup) 
});

addButton.addEventListener('click', () => {
    openPopup(newCardPopup);
    formPlace.reset();
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup');
        closePopup(popup); 
    });
});

formPlace.addEventListener('submit', newPlaceFormSubmit);
editProfileForm.addEventListener('submit', editFormSubmit);

initialCards.forEach(cardContent => {
    const card = createCard(cardContent, openImagePopup);
    placesList.append(card);
  });