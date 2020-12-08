import React from 'react';

function PopupWithForm(props) {
  return (
        <div id={props.popupId} className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button id="name-close" className="popup__close-button" onClick={props.onClose}/>
                <div className="popup__window">
                    <div className="popup__window-content">
                        <h2 className="popup__title">{props.title}</h2>
                        <form id={props.formId} onSubmit={props.onSubmit} name="profileInfo" className="popup__form"
                              method="get" noValidate>
                            {props.children}
                            <button type="submit" className="popup__save-button">{props.buttonText}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default PopupWithForm;
