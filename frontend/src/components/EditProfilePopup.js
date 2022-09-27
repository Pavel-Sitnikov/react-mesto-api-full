import { useState, useEffect, useContext } from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="profile-change"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_enter_name"
        placeholder="Имя"
        onChange={handleNameChange}
        value={name || ""}
      />
      <input
        className="popup__input popup__input_enter_description"
        placeholder="Профессия"
        onChange={handleDescriptionChange}
        value={description}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
