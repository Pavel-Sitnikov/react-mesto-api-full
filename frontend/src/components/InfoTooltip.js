import statusOk from "../images/popup/statusOk.svg";
import statusErr from "../images/popup/statusErr.svg";

function InfoTooltip({ name, isOpen, onClose, auth }) {
  return (
    <div className={`popup popup_action_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <figure className="popup__auth-view">
          <img
            className="popup__auth-img"
            alt="Статус регистрации"
            src={auth ? statusOk : statusErr}
          />
          <figcaption className="popup__auth-message">
            {auth
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default InfoTooltip;
