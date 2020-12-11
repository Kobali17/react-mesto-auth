import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Header(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип Место"/>
            <div className="header__data">
            <p className="header__email">{currentUser.email}</p>
            <Link className="header__link" to={props.link} onClick={props.onClick}>{props.text}</Link></div>
        </header>);
}

export default Header;
