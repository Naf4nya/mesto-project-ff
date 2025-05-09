import { deleteCardFromServer, setLikeOnServer } from "./api.js";

const cardTemplate = document.querySelector('#card-template').content;
 
// функция создание карточек
function createCard(cardContent, openFullImage, userId) {    
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');  
  const cardNumberLikes = cardElement.querySelector('.card__number_like');
  const likeElement = cardElement.querySelector('.card__like-button');
  if (cardContent.owner._id !== userId) {
    deleteButton.remove();
  }; 
  
  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;
  cardTitle.textContent = cardContent.name;
  cardNumberLikes.textContent = cardContent.likes.length;
  const containMyid = Object.values(cardContent.likes).map(user => user._id).some(id => id.includes(userId));
  if (containMyid) {
    likeElement.classList.add('card__like-button_is-active');
  };

  cardImage.addEventListener('click', () => {
    openFullImage(cardContent);
  });

  deleteButton.addEventListener('click', (evt) => {
    deleteCardFromServer(cardContent._id)
    .then (() => {
      deleteCard(evt);
    })
    .catch((err) => {console.log(err)});
  });



  likeElement.addEventListener('click', (evt) => {
    const isLiked = evt.target.classList.contains('card__like-button_is-active');
      setLikeOnServer(cardContent._id, isLiked)
      .then (res => {
      cardNumberLikes.textContent = res.likes.length;
      likeCard(evt);
      })
      .catch((err) => {console.log(err)});
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

export { createCard };