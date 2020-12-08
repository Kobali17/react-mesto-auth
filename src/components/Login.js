import React from 'react';

function Login(props) {
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
            <h1 className="sign__title">Вход</h1>
            <form onSubmit={handleSubmit} name="sign-up" className="sign__form" method="get" noValidate>
                <input id="email" required placeholder="Email" type="text" name="email"
                       className="sign__input" onChange={handelSetEmail} value={email}
                       minLength="2" maxLength="40"/>
                <input value={password} id="password" required placeholder="Пароль" type="password" name="password"
                       className="sign__input" onChange={handelSetPassword}
                       minLength="2" maxLength="200"/>
                <button type="submit" className="sign__save-button">Войти</button>
            </form>
        </div>

  );
}

export default Login;
