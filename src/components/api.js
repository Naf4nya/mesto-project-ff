const getResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка ${res.status}`)
    }
};

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-37',
    headers: {
        authorization: "1efcbbe3-d8c4-4422-be61-93be6ca1a8ea",
        
    },
    headersCT: {
        authorization: "1efcbbe3-d8c4-4422-be61-93be6ca1a8ea",
        'Content-Type': 'application/json'
    }
};


const personalPromis = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(getResponse);
};

const loadCardsPromis = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(getResponse)
};

const promises = [personalPromis(), loadCardsPromis()];

const safeServerEditProfile = (profileTitle, profileDescription) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headersCT,
        body: JSON.stringify({
            name: profileTitle,
            about: profileDescription,
        }) 
    })
    .then(getResponse)
};

const safeServerNewProfileAvatar = (linkImage) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headersCT,
        body: JSON.stringify({
            avatar: linkImage
        }) 
    })
    .then(getResponse)
};

const addNewCardToServer = (newCard) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headersCT,
        body: JSON.stringify({
            name: newCard.name,
            link: newCard.link,
        })
    })
    .then (getResponse)
};

const deleteCardFromServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(getResponse)
  };
  
  const setLikeOnServer = (cardId, isLiked) => {
    if (!isLiked) {
        return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: config.headers
          })
          .then(getResponse)
    } else {
        return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: config.headers
          })
          .then(getResponse)
    }
  }
 
export { getResponse, safeServerEditProfile, safeServerNewProfileAvatar, addNewCardToServer, deleteCardFromServer, setLikeOnServer, promises };