import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import Card from "./Card.js";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__content">
          <a
            className="profile__hover"
            href="##"
            title="Изменить аватар"
            onClick={onEditAvatar}
          >
            <img
              className="profile__avatar"
              alt="Аватар"
              src={currentUser?.avatar}
            />
          </a>
          <div className="profile__info">
            <div className="profile__place-name">
              <h1 className="profile__name">{currentUser?.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                title="Редактировать профиль"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__description">{currentUser?.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          title="Добавить место"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
