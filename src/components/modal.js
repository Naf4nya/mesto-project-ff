function openModal(popup) {                                                      // функция открытия попапа
    popup.classList.add('popup_is-opened', 'popup_is-animated');                 // + добавление анимации
    document.addEventListener('keydown', closeEsc(popup));
    document.addEventListener('keydown', closeOverlay(popup));

}

function closeModal(popup) {                                                     // функция закрытия попапа
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeEsc(popup));
    document.removeEventListener('keydown', closeOverlay(popup));
    
}

function closeEsc (popup) {                                                     // функция закрытия попапа по esc
    document.addEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
            closeModal(popup);
        }
        });
}

function closeOverlay (popup) {                                                     // функция закрытия попапа по esc
    document.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup')) {
            closeModal(popup);
        }
        });
}

export { openModal as openPopup, closeModal as closePopup };