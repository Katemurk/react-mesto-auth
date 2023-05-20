import React from "react";
import imageSuccess from "../images/imageSuccess.png";
import imageError from "../images/imageError.png";

const InfoTooltip = (props) => {
  const isOpenTooltip = props.isOpen
    ? `popup popup_type_tooltip popup_opened`
    : `popup popup_type_tooltip`;

  return (
    <section className={isOpenTooltip}>
      <div className="popup__container">
        <img
          className="popup__image"
          src={props.isRegistred ? imageSuccess : imageError}
        />
        <h2 className="popup__heading popup__heading_type_tooltip">
          {props.isRegistred
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
        <button
          type="reset"
          aria-label="Кнопка закрытия"
          className="button popup__toggle"
          onClick={props.onClose}
        ></button>
      </div>
    </section>
  );
};

export default InfoTooltip;
