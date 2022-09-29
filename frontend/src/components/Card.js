import React from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser?._id;
  const cardDeleteButtonClassName = `element__delete ${
    isOwn ? "element__delete_active" : ""
  }`;

  const isLiked = card.likes.some((i) => i === currentUser?._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <CurrentUserContext.Provider value={currentUser}>
        <img
          className="element__image"
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
        <button
          className={cardDeleteButtonClassName}
          type="button"
          title="Удалить"
          onClick={handleDeleteClick}
        ></button>
        <div className="element__content">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__like-container">
            <button
              className={cardLikeButtonClassName}
              type="button"
              title="Нравится"
              onClick={handleLikeClick}
            ></button>
            <p className="element__number-likes">{card.likes.length}</p>
          </div>
        </div>
      </CurrentUserContext.Provider>
    </li>
  );
}

export default Card;
