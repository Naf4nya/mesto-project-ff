function openModal(popup) {                                                      // функция открытия попапа
    popup.classList.add('popup_is-opened' );                 // + добавление анимации
    document.addEventListener('keydown', closeEscModal);
    popup.addEventListener('click', closeOverlayModal);

}

function closeModal(popup) {                                                     // функция закрытия попапа
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeEscModal);
    popup.removeEventListener('click', closeOverlayModal);
    
}

function closeEscModal (evt) {                                                     // функция закрытия попапа по esc
        if (evt.key === 'Escape') {
            const popupIsOpen = document.querySelector('.popup_is-opened');
            if (popupIsOpen) {
                closeModal(popupIsOpen);
            };
        }
}

function closeOverlayModal (evt) {                                                     // функция закрытия попапа по esc
        if (evt.target === evt.currentTarget) {
            closeModal(evt.currentTarget);
        }
}

export { openModal as openPopup, closeModal as closePopup };