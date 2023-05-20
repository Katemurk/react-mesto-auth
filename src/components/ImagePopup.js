import React from "react";

function ImagePopup({ card, onClose }) {
  const isOpenCard = card.isOpen
    ? `popup popup_type_view popup_opened`
    : `popup popup_type_view`;
  return (
    <section className={isOpenCard}>
      <div className="popup__content">
        <img className="popup__img" src={card.item.link} alt={card.item.name} />
        <p className="popup__caption">{card.item.name}</p>
        <button
          type="reset"
          aria-label="Кнопка закрытия"
          className="button popup__toggle"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default ImagePopup;
