import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import "../index.css";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login.js";
import Register from "./Register.js";
import api from "../utils/api.js";
import * as auth from "../utils/auth";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import ProtectedRoute from "./ProtectedRoute.js";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [authMessage, setAuthMessage] = useState(false);
  const history = useHistory();

  useEffect(() =>{
    api.getUserData()
    .then((data) => {
      setCurrentUser(data);
      setLoggedIn(true);
      setUserInfo(data.email);
      history.push("/");
    })
    .catch((err) => {
      console.log(err);
    })
  }, [loggedIn, history]);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");

      api.getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) =>{
        console.log(err);
      });
    }
  }, [loggedIn, history]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser?._id);

    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((items) => items.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser({ name, about }) {
    api
      .editProfile({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .editProfileAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onRegister(data) {
    return auth
      .register(data)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setAuthMessage(true);
        history.push("/signin");
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
        setAuthMessage(false);
      });
  }

  function onLogin(data) {
    return auth
      .authorize(data)
      .then((res) => {
        setLoggedIn(true);
        setUserInfo(data.email);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onLogout() {
    return auth.logout()
    .then(() => {
      setLoggedIn(false);
      history.push("/signin");
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header onLogin={onLogin} onLogout={onLogout} email={userInfo} />
        <Switch>
          <Route path="/signup">
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogin={onLogin} />
          </Route>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={loggedIn}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>          
        </Switch>
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        ></EditAvatarPopup>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        ></EditProfilePopup>
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        ></AddPlacePopup>
        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          buttonText="Да"
          onClose={closeAllPopups}
        ></PopupWithForm>
        <ImagePopup
          name="open-card"
          card={selectedCard}
          onClose={closeAllPopups}
        ></ImagePopup>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          auth={authMessage}
          name="auth-status"
        ></InfoTooltip>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
