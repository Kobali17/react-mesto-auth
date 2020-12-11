import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Footer from './Footer';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
    <Header link={'sign-in'} text={'Выход'} onClick={props.onLogOut} />
        <main className="main">
            <section className="profile">
                <div className="profile__first">
                    <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
                        <button className="profile__avatar-edit-button" onClick={props.onEditAvatar} type="button"/>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit-button" onClick={props.onEditProfile} type="button"/>
                        <p className="profile__job">{currentUser.about}</p>
                    </div>
                </div>
                <button type="button" className="profile__add-card-button" onClick={props.onAddPlace}/>
            </section>
            <section className="photo-grid">
                {props.cards.map((card) => (
                    <Card key={card._id}
                          card={card}
                          onDel={props.onCardDelete}
                          onImage={props.onImage}
                          onCardLike={props.onCardLike}/>
                ))}

            </section>
        </main>
      <Footer/>
      </>
  );
}

export default Main;
