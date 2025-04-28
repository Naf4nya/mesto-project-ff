import { openPopup, closePopup } from "./modal.js"


function addCard(cardContent, deleteElement, eventsElement, likeElement) {             // функция создание карточек
        
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;

  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = cardContent.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', (evt) => {
      deleteCard(evt);
  });

  cardElement.addEventListener('click', (evt) => {
      eventPopupCard(evt);
      likeCard(evt);
  });

  return cardElement;
};

function deleteCard(evt) {                                          // функция удаления карточек
  const card = evt.target.closest('.card');
  card.remove();
};

function likeCard(evt) {                                           // функция лайка карточек
  if (evt.target.classList.contains('card__like-button')) {
      evt.target.classList.toggle('card__like-button_is-active');
  };
};

function eventPopupCard(evt) {                                     // функция клика по карточки
  const cardPopup = document.querySelector('.popup_type_image');
  const cardImage = evt.target.closest('.card__image');
  const popupImage = cardPopup.querySelector('.popup__image');
  const popupCaption = cardPopup.querySelector('.popup__caption');

  if (evt.target.classList.contains('card__image')) {
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardImage.alt;
  openPopup(cardPopup);
  }

};

export { addCard as createCard, likeCard, deleteCard, eventPopupCard };