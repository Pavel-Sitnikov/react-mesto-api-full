import { useState, useEffect } from "react";

import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleAddPlaceName(evt) {
    setName(evt.target.value);
  }

  function handleAddPlaceLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      buttonText="Cоздать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_enter_title"
        placeholder="Название"
        onChange={handleAddPlaceName}
        value={name}
      />
      <input
        className="popup__input popup__input_enter_link"
        placeholder="Ссылка на картинку"
        onChange={handleAddPlaceLink}
        value={link}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
