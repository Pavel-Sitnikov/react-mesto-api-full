function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  children,
  buttonText,
  onSubmit,
}) {
  return (
    <div className={`popup popup_action_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <h3 className="popup__title">{title}</h3>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          <button className="popup__button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
