import { useState } from "react";

function Login({ onLogin }) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!loginData.email || !loginData.password) {
      return;
    }
    onLogin(loginData);
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          className="auth-form__input"
          onChange={handleChange}
          name="email"
          value={loginData.email}
          type="email"
          placeholder="Email"
          required
        ></input>
        <input
          className="auth-form__input"
          onChange={handleChange}
          name="password"
          value={loginData.password}
          type="password"
          placeholder="Пароль"
          required
        ></input>
        <button className="auth-form__button" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
