import { createCard } from "../components/card.js";
import { openPopup, closePopup } from "../components/modal.js";
import { safeServerEditProfile, safeServerNewProfileAvatar, addNewCardToServer, promises } from "../components/api.js";
import { enabledValidation, clearValidation } from "../components/validation.js";
import "../pages/index.css";

const container = document.querySelector('.content');
const placesList = container.querySelector('.places__list');

// константы для обработки открытия попапов карточек
const popupTypeImage = document.querySelector('.popup_type_image');
const imageInPopupTypeImage = popupTypeImage.querySelector('.popup__image');
const captionInPopupTypeImage = popupTypeImage.querySelector('.popup__caption');
const popupTypeProfileImage = document.querySelector('.popup_type_profile_image');

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
const profileAvatar = document.querySelector('.profile__image');
const editProfileForm = document.forms['edit-profile'];
const editProfileImageForm = document.forms['edit-profile_image'];
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;
const linkNewProfileImage = editProfileImageForm.elements.link;

const validationConfig = {
    formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};

// функция для заполнения формы изменения профиля
function editFormSubmit(evt) {                                               
    evt.preventDefault();
    renderLoading(true, evt);

    const title = nameInput.value;
    const description = jobInput.value;

    safeServerEditProfile(title, description)
    .then(userData => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        closePopup(editPopup);
    })
    .catch((err) => {console.log(err)})
    .finally(() => {
        renderLoading(false, evt);
    });
    
};

function editProfileImageSubmit(evt) {                                               
    evt.preventDefault();
    renderLoading(true, evt);

    const urlImage = linkNewProfileImage.value;
    safeServerNewProfileAvatar(urlImage)
    .then(profileInfo => {
        profileAvatar.style.backgroundImage = `url(${profileInfo.avatar})`;
        editProfileImageForm.reset();
        closePopup(popupTypeProfileImage);
    })
    .catch((err) => {console.log(err)})
    .finally(() => {
        renderLoading(false, evt);
    });
    
};


// функция открытия попапа карточки
function openImagePopup(data) {
    imageInPopupTypeImage.src = data.link;
    imageInPopupTypeImage.alt = data.name;
    captionInPopupTypeImage.textContent = data.name;
    openPopup(popupTypeImage);
  };

// функция события сохранения новой карточки
function newPlaceFormSubmit(evt) {
    evt.preventDefault();
        const card = {
            name: inputNameFormNewPlace.value,
            link: inputLinkFormNewPlace.value,
        }
        renderLoading(true, evt);
        addNewCardToServer(card)
        .then((card) => {
            const newCard = createCard(card, openImagePopup, card.owner._id);
            placesList.prepend(newCard);
            formPlace.reset();
            closePopup(newCardPopup);
        })
        .catch((err) => {console.log(err)})
        .finally(() => {
            renderLoading(false, evt);
        });
};

function renderLoading (isLoading, evt) {
    const saveButton = evt.target.querySelector('.popup__button');
    if (isLoading) {
        saveButton.textContent = "Сохранение..."
    } else {
        saveButton.textContent = "Сохранить"
    }
};

// обработка событий
editButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(editProfileForm, validationConfig);
    openPopup(editPopup) 
});

profileAvatar.addEventListener('click', () => {
    editProfileImageForm.reset();
    clearValidation(editProfileImageForm, validationConfig);
    openPopup(popupTypeProfileImage);
});

addButton.addEventListener('click', () => {
    formPlace.reset();
    clearValidation(formPlace, validationConfig);
    openPopup(newCardPopup);
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup');
        closePopup(popup); 
    });
});

// Отправка форм

formPlace.addEventListener('submit', newPlaceFormSubmit); 
editProfileForm.addEventListener('submit', editFormSubmit);
editProfileImageForm.addEventListener('submit', editProfileImageSubmit);

// Валидация

enabledValidation(validationConfig);

// Работа с api

Promise.all(promises)
.then((result) => {
    const [userData, cardsData] = result;
    console.log([userData, cardsData]);
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    const userId = userData._id;

    cardsData.forEach(card => {
        const newCard = createCard(card, openImagePopup, userId);
        placesList.append(newCard);
      })
})
.catch((err) => {console.log(err)});



