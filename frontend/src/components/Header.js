import { Route, Link } from "react-router-dom";

import logoHeader from "../images/header/logo.svg";

function Header({ email, onLogout }) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logoHeader}
        alt="Логотип Mesto Russia"
      />
      {/* <nav className="header__links">
        <p className="header__email">{email}</p> */}
        <Route exact path="/">
          <nav className="header__links" />
            <p className="header__email">{email}</p>
          <Link className="header__logout" to="/singin" onClick={onLogout}>
            Выйти
          </Link>
        </Route>
        <Route path="/signup">
          <Link className="header__link" to="/signin">
            Войти
          </Link>
        </Route>
        <Route path="/signin">
          <Link className="header__link" to="/signup">
            Регистрация
          </Link>
        </Route>
      </nav>
    </header>
  );
}

export default Header;
