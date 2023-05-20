import React from "react";
import PopupWithForm from "./PopupWithForm";

const ConfirmDeletePopup = (props) => {
  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete(props.deletedCard);
  }
  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      submit={props.isLoading ? "Удаление..." : "Да"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
};

export default ConfirmDeletePopup;