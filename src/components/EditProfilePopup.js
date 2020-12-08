import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(`${currentUser.name}`);
  const [description, setDescription] = React.useState(`${currentUser.about}`);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handelSetName(e) {
    setName(e.target.value);
  }

  function handelSetDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
        <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen}
                       title="Редактировать профиль" buttonText="Сохранить"
                       popupId="edit" formId="profile-form">
            <input id="name" required placeholder="Имя" type="text" name="name" onChange={handelSetName}
                   className="popup__input"
                   minLength="2" maxLength="40" value={name}/>
            <span id="name-error" className="popup__input_error"/>
            <input id="job" required placeholder="О себе" type="text" name="job"
                   className="popup__input" onChange={handelSetDescription}
                   minLength="2" value={description} maxLength="200"/>
            <span id="job-error" className="popup__input_error"/>
        </PopupWithForm>
  );
}

export default EditProfilePopup;
