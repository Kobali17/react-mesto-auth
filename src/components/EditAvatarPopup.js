import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
        <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} title="Обновить аватар"
                       popupId="avatar-popup" formId="photo-form" buttonText="Сохранить">
            <input ref={avatarRef} id="avatar-link" required placeholder="Ссылка на изображение" type="url"
                   name="link"
                   className="popup__input"/>
            <span id="avatar-link-error" className="popup__input_error"/>
        </PopupWithForm>
  );
}

export default EditAvatarPopup;
