const container = document.querySelector('.content');
const placesList = container.querySelector('.places__list');
 
function addCard(cardContent, deleteElement) {             // функция создание карточек
        
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

    return cardElement;
};


function deleteCard(evt) {                                      // функция удаления карточек
    const card = evt.target.closest('.card');
    card.remove();
 };


 initialCards.forEach(function(cardContent) {         // добавляем карточки на страницу методом forEach
    const card = addCard(cardContent, deleteCard);
    placesList.append(card);
 });
