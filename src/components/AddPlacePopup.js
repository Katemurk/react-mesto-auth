import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

const AddPlacePopup = (props) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleSubmitName(e) {
    setName(e.target.value);
  }
  function handleSubmitLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="cards"
      title="Новое место"
      submit={props.isLoading ? "Создание..." : "Создать"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          type="text"
          value={name}
          onChange={handleSubmitName}
          required
          className="popup__input popup__input_type_place"
          id="place-input"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
        />
        <span className="popup__input-error place-input-error"></span>
      </div>
      <div className="popup__field">
        <input
          type="url"
          onChange={handleSubmitLink}
          value={link}
          required
          className="popup__input popup__input_type_link"
          id="link-input"
          name="link"
          placeholder="Ссылка на картинку"
        />
        <span className="popup__input-error link-input-error"></span>
      </div>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
