import React from "react";

function PopupWithForm({ name, onClose, title, isOpen, children, submit, onSubmit}) {
  const isOpenCheck = isOpen
    ? `popup popup_type_${name} popup_opened`
    : `popup popup_type_${name}`;
  return (
    <>
      <section className={isOpenCheck}>
        <div className="popup__container">
          <button
            type="reset"
            aria-label="Кнопка закрытия"
            className="button popup__toggle"
            onClick={onClose}
          ></button>
          <h2 className="popup__heading">{title}</h2>
          <form
            noValidate
            name={`${name}Form`}
            className={`popup__form popup__form_type_${name}`}
            onSubmit={onSubmit}
          >
            {children}
            <button
              type="submit"
              className="button popup__button popup__button_inactive"
            >
              {submit || 'Сохранить'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default PopupWithForm;
