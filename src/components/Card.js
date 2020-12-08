import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__del-button ${!isOwn ? 'card__del-button_hidden' : ''}`
  );
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `card__like-button ${isLiked ? 'card_liked' : ''}`
  );

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handelDelClick() {
    props.onDel(props.card);
  }

  return (
        <div key={props.card._id} className="card">
            <button type="button" className={cardDeleteButtonClassName} onClick={handelDelClick}/>
            <img className="card__img" onClick={() => {
              props.onImage(props.card);
            }} src={props.card.link} alt={props.card.text}/>
            <div className="card__info">
                <h3 className="card__text">{props.card.name}</h3>
                <div className="card__like-container">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
                    <p className="card__like-data">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
  );
}

export default Card;
