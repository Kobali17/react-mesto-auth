import React from 'react';
import error from '../images/error.svg';
import nice from '../images/nice.svg';

function InfoTooltip(props) {
  return (
        <div id={props.popupId} className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button id="name-close" className="popup__close-button" onClick={props.onClose}/>
                <div className="popup__window">
                    <div className="popup__image-content">
                        <img className='popup__image' alt={props.isSuccess ? 'Все хорошо' : 'Ошибка'}
                             src={props.isSuccess ? nice : error}/>
                        <h2 className="popup__image-title">{props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так!'
                            + 'Попробуйте ещё раз.'}</h2>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default InfoTooltip;
