import React from 'react';

function ImagePopup(props) {
  return (

        <div className={`popup ${props.card != null ? 'popup_opened' : ''}`}>
            <div className="popup-photo__container">
                <button id="photo-close" type="button" className="popup-photo__close-button" onClick={props.onClose}/>
                <img className="popup-photo__img" src={props.card != null ? props.card.link : ''}/>
                <p className="popup-photo__text">{props.card != null ? props.card.name : ''}</p>
            </div>
        </div>
  );
}

export default ImagePopup;
