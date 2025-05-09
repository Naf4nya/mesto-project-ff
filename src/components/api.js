const getResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка ${res.status}`)
    }
};

const personalPromis = () => {
    return fetch("https://nomoreparties.co/v1/wff-cohort-37/users/me", {
        headers: {
            authorization: "1efcbbe3-d8c4-4422-be61-93be6ca1a8ea",
        },
    })
    .then(getResponse);
};

const loadCardsPromis = () => {
    return fetch("https://nomoreparties.co/v1/wff-cohort-37/cards", {
        headers: {
            authorization: "1efcbbe3-d8c4-4422-be61-93be6ca1a8ea",
        },
    })
    .then(getResponse)
};

const promises = [personalPromis(), loadCardsPromis()];

const safeServerEditProfile = (profileTitle, profileDescription) => {
    return fetch("https://nomoreparties.co/v1/wff-cohort-37/users/me", {
        method: 'PATCH',
        headers: {
            authorization: "1efcbbe3-d8c4-4422-be61-93be6ca1a8ea",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: profileTitle.textContent,
            about: profileDescription.textContent,
        }) 
    })
    .then(getResponse)
};

const safeServerNewProfileAvatar = (linkImage) => {
    return fetch("https://nomoreparties.co/v1/wff-cohort-37/users/me/avatar", {
        method: 'PATCH',
        headers: {
            authorization: "1efcbbe3-d8c4-4422-be61-93be6ca1a8ea",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: linkImage
        }) 
    })
    .then(getResponse)
};

const addNewCardToServer = (newCard) => {
    return fetch("https://nomoreparties.co/v1/wff-cohort-37/cards", {
        method: 'POST',
        headers: {
            authorization: "1efcbbe3-d8c4-4422-be61-93be6ca1a8ea",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newCard.name,
            link: newCard.link,
        })
    })
    .then (getResponse)
};

const deleteCardFromServer = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-37/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: "1efcbbe3-d8c4-4422-be61-93be6ca1a8ea",
        }
    })
    .then(getResponse)
  };
  
  const likeCardOnServer = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-37/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
          authorization: "1efcbbe3-d8c4-4422-be61-93be6ca1a8ea",
      }
    })
    .then(getResponse)
  };
  
  const deleteLikeCardOnServer = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-37/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
          authorization: "1efcbbe3-d8c4-4422-be61-93be6ca1a8ea",
      }
    })
    .then(getResponse)
  };
  
export { getResponse, safeServerEditProfile, safeServerNewProfileAvatar, addNewCardToServer, deleteCardFromServer, likeCardOnServer, deleteLikeCardOnServer, promises };