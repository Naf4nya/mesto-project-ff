const container = document.querySelector('.content');
const placesList = container.querySelector('.places__list');
 
function deleteCard() {
    const card = document.querySelector('.card')
    card.remove();
};

function addCard(cardContent, deleteElement) {             // функция создание карточек
        
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardContent.link;
    cardImage.alt = cardContent.name;

    const cardTitle = cardElement.querySelector('.card__title');
    cardTitle.textContent = cardContent.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {deleteElement(cardElement)});

    return cardElement;
    
};

function deleteCard(cardElement) {      // функция удаление карточек
    cardElement.remove();
}

for (let i = 0; i <= initialCards.length; i++) {         // добавляем карточки на страницу циклом
    const card = addCard(initialCards[i], deleteCard);
    placesList.append(card);
 }; 
 
 
 /*
 initialCards.forEach(function(cardContent) {         // добавляем карточки на страницу методом forEach
    const card = addCard(cardContent, deleteCard);
    placesList.append(card);
 }) 
    */
