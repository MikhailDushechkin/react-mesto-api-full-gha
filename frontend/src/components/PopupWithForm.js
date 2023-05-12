import React from 'react';
import Form from './Form';

function PopupWithForm(props) {
  function closePopupOnOverlay(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      props.onClose();
    }
  }
  return (
    <div
      className={`popup ${props.name}-popup ${props.isOpen && 'popup_opened'}`}
      onClick={closePopupOnOverlay}
    >
      <div className="popup__container">
        <Form {...props} />
        <button
          type="button"
          className={`popup__close-button ${props.name}-popup__close-button`}
          aria-label="Закрыть поп-ап"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
