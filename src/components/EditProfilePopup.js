import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

const EditProfilePopup = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeDesc(e) {
    setDescription(e.target.value);
  }
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      submit={props.isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          type="text"
          value={name || ''}
          onChange={handleChangeName}
          required
          className="popup__input popup__input_type_name"
          id="hero-input"
          name="hero"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
        />
        <span className="popup__input-error hero-input-error"></span>
      </div>
      <div className="popup__field">
        <input
          type="text"
          value={description || ''}
          onChange={handleChangeDesc}
          required
          className="popup__input popup__input_type_profession"
          id="prof-input"
          name="profession"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
        />
        <span className="popup__input-error prof-input-error"></span>
      </div>
    </PopupWithForm>
  );
};
export default EditProfilePopup;
