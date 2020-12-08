import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const placeRef = React.useRef();
  const linkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddCard({
      place: placeRef.current.value,
      link: linkRef.current.value,
    });
  }

  return (
        <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} title="Новое место"
                       popupId="photo-add"
                       formId="photo-form">
            <input ref={placeRef} id="place" required placeholder="Название" type="text" name="place"
                   className="popup__input"
                   minLength="1" maxLength="30"/>
            <span id="place-error" className="popup__input_error"/>
            <input ref={linkRef} id="link" required placeholder="Ссылка на картинку" type="url" name="link"
                   className="popup__input"/>
            <span id="link-error" className="popup__input_error"/>
            <button type="submit" className="popup__save-button">Создать</button>
        </PopupWithForm>

  );
}

export default AddPlacePopup;
