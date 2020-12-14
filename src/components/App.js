import React from 'react';
import {
  Redirect, Route, Switch, useHistory,
} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import DelCardPopup from './DelCardPopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [currentUser, setUserData] = React.useState({
    name: '',
    about: '',
    avatar: '',
    email: '',
  });
  const history = useHistory();

  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setEditAvatarClick] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isDelPopupOpen, setDelPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [delCard, setDelCard] = React.useState(null);
  const [isInfoToolOpen, setInfoToolOpen] = React.useState(false);
  const [isRegisterSuccess, setRegisterSuccess] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);

  function getInitialData(email) {
    setLoggedIn(true);
    api.getInitialCards().then((resp) => {
      setCards(resp);
    }).catch((err) => { console.log(err); });

    api.getUserData().then((response) => {
      setUserData({ ...response, email });
    }).catch((err) => { console.log(err); });
  }

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      auth.tokenValid(token).then((res) => {
        if (res) {
          getInitialData(res.data.email);
        } else {
          setLoggedIn(false);
        }
      }).catch((err) => { console.log(err); });
    }
  }, []);

  function isPopupOpen() {
    return isEditAvatarPopupOpen
      || isEditProfilePopupOpen
      || isAddPlacePopupOpen
      || isDelPopupOpen
      || selectedCard != null;
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDelClick(card) {
    setDelCard(card);
    setDelPopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarClick(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditAvatarClick(false);
    setEditProfilePopupOpen(false);
    setDelPopupOpen(false);
    setSelectedCard(null);
    setDelCard(null);
    setInfoToolOpen(false);
  }

  function handleUpdateUser(userData) {
    api.patchUserData(userData).then((res) => {
      setUserData(res);
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateAvatar(userData) {
    api.patchUserAvatar(userData).then((res) => {
      setUserData(res);
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
      setCards(newCards);
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete() {
    api.delCard(delCard._id).then(() => {
      const newCards = cards.filter((c) => c._id !== delCard._id);
      setCards(newCards);
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleAddPlaceSubmit(userCardData) {
    api.addUserCard(userCardData).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleRegister(registerData) {
    auth.register(registerData).then((res) => {
      if (res !== null) {
        setRegisterSuccess(true);
        setInfoToolOpen(true);
        history.push('/sign-in');
      }
    }).catch((err) => {
      console.log(err);
      setRegisterSuccess(false);
      setInfoToolOpen(true);
    });
  }

  function handleLogin(loginData) {
    auth.logIn(loginData).then((res) => {
      if (res !== null) {
        getInitialData(loginData.email);
      }
    }).catch((err) => {
      console.log(err); setRegisterSuccess(false);
      setInfoToolOpen(true);
    });
  }
  function handleLogOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    currentUser.email = null;
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>

      <Switch>
        <Route path={'/sign-up'}>
          {loggedIn ? <Redirect to="./"/> : <><Header link={'sign-in'} text={'Войти'}/>
            <Register onInfoTool={handleRegister}/></>}
        </Route>

        <Route path={'/sign-in'}>
          {loggedIn ? <Redirect to="./"/> : <><Header link={'sign-up'} text={'Регистрация'}/>
            <Login onInfoTool={handleLogin}/></>}

        </Route>

        <ProtectedRoute component={Main} cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleDelClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onDel={handleDelClick}
                        onImage={handleCardClick}
                        onLogOut={handleLogOut}
                        isLoggedIn={loggedIn} path={'/'}>

          <EditProfilePopup inputText={currentUser}
                            onUpdateUser={handleUpdateUser}
                            isOpen={isEditProfilePopupOpen}
                            onClose={closeAllPopups}/>

          <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar}
                           isOpen={isEditAvatarPopupOpen}
                           onClose={closeAllPopups}/>

          <AddPlacePopup onAddCard={handleAddPlaceSubmit}
                         isOpen={isAddPlacePopupOpen}
                         onClose={closeAllPopups}/>
          <DelCardPopup onDelCard={handleCardDelete}
                        isOpen={isDelPopupOpen}
                        onClose={closeAllPopups}/>

          <ImagePopup onClose={closeAllPopups} card={selectedCard}/>

          <div className={`overlay ${isPopupOpen() ? 'popup_opened' : ''}`}/>
        </ProtectedRoute>
      </Switch>
      <InfoTooltip isSuccess={isRegisterSuccess} isOpen={isInfoToolOpen} onClose={closeAllPopups}/>

    </CurrentUserContext.Provider>
  );
}

export default App;
