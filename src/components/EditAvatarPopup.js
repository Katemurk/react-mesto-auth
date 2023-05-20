import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";

const EditAvatarPopup = (props) => {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = ""
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      submit={props.isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
      isOpen={props.isOpen} 
      onClose={props.onClose} 
    >
      <div className="popup__field">
        <input
          type="url"
          ref={avatarRef}
          required
          className="popup__input popup__input_type_link"
          id="avatar-input"
          name="link"
          placeholder="Ссылка на изображение"
        />
        <span className="popup__input-error avatar-input-error"></span>
      </div>
    </PopupWithForm>
  );
};
export default EditAvatarPopup;
