
import { createCard, deleteCard, likeCard, eventPopupCard } from "../components/card.js";
import { openPopup, closePopup } from "../components/modal.js";
import { initialCards } from "./cards.js";
import "../pages/index.css";

const container = document.querySelector('.content');
const placesList = container.querySelector('.places__list');
const page = document.querySelector('.page');

// блок обработки кликов


page.addEventListener('click', function(evt) {                                 
    const typeOpenPopup = document.querySelector('.popup_is-opened');
    const editPopup = document.querySelector('.popup_type_edit');
    const newCard = document.querySelector('.popup_type_new-card');

    if (evt.target.classList.contains('profile__edit-button')) {
        openPopup(editPopup);
    } 
    else if (evt.target.classList.contains('profile__add-button')) {
        openPopup(newCard);
    } 
    else if (evt.target.classList.contains('popup__close')) {
        closePopup(typeOpenPopup);
    } 

});

// блок заполнения форм

const profileTitle = document.querySelector('.profile__title');                // форма редактирования профия
const profileDescription = document.querySelector('.profile__description');
const formElement = document.forms['edit-profile'];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

function handleFormSubmit(evt) {                                               
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
}

formElement.addEventListener('submit', handleFormSubmit);

const formPlace = document.forms['new-place']                                  // форма добавления карточек
const namePlace = formPlace.elements['place-name'];
const linkPlace = formPlace.elements.link;

initialCards.forEach(function(cardContent) {         // добавляем карточки на страницу методом forEach
    const card = createCard(cardContent, deleteCard, eventPopupCard, likeCard);
    placesList.append(card);
  });


function cardFormSubmit(evt) {
    evt.preventDefault();

    const card = {
        name: namePlace.value,
        link: linkPlace.value
    }
    const newCard = createCard(card, deleteCard, eventPopupCard, likeCard);
    placesList.prepend(newCard);

    formPlace.reset();
    const typeOpenPopup = document.querySelector('.popup_is-opened');
    closePopup(typeOpenPopup);
}

formPlace.addEventListener('submit', cardFormSubmit);

