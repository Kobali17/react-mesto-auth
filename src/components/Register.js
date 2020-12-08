import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const [email, setEmail] = React.useState('');

  const [password, setPassword] = React.useState('');

  function handelSetEmail(e) {
    setEmail(e.target.value);
  }

  function handelSetPassword(e) {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onInfoTool({
      email,
      password,
    });
  };

  return (
        <div className="sign">
            <h1 className="sign__title">Регистрация</h1>
            <form onSubmit={handleSubmit} name="sign-up" className="sign__form" method="get" noValidate>
                <input id="email" required placeholder="Email" type="text" name="email"
                       className="sign__input" onChange={handelSetEmail}
                       minLength="2" maxLength="40" value={email}/>
                <input id="password" required placeholder="Пароль" type="password" name="password"
                       className="sign__input" onChange={handelSetPassword}
                       minLength="2" maxLength="200" value={password}/>
                <button type="submit" className="sign__save-button">Зарегистрироваться</button>
            </form>
            <Link to="sign-in" className="sign__link">Уже зарегистрированы? Войти</Link>
        </div>
  );
}

export default Register;
