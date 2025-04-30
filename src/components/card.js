
const cardTemplate = document.querySelector('#card-template').content;
 
// функция создание карточек
function createCard(cardContent, openFullImage) {    
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');  

  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;
  cardTitle.textContent = cardContent.name;
  cardImage.addEventListener('click', () => {
    openFullImage(cardContent);
  });

  deleteButton.addEventListener('click', (evt) => {
      deleteCard(evt);
  });

  cardElement.addEventListener('click', (evt) => {
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

export { createCard };