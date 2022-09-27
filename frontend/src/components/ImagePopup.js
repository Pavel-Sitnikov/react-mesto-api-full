function ImagePopup({ name, card, onClose }) {
  return (
    <div className={`popup popup_action_${name} ${card && "popup_opened"}`}>
      <figure className="popup__container popup__container_card">
        <button
          className="popup__close popup__close_card"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <figcaption className="popup__figcaption">{card?.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
