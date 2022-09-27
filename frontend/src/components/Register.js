import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onRegister(registerData);
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          className="auth-form__input"
          onChange={handleChange}
          name="email"
          value={registerData.email}
          type="email"
          placeholder="Email"
          required
        ></input>
        <input
          className="auth-form__input"
          onChange={handleChange}
          name="password"
          value={registerData.password}
          type="password"
          placeholder="Пароль"
          required
        ></input>
        <button className="auth-form__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="auth__additional-message">
        Уже зарегистрированы?{" "}
        <Link className="auth__link" to="/signin">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
