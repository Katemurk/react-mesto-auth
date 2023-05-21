import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import * as auth from "../utils/Auth.js";

const Login = (props) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onLogin(formValue.email, formValue.password);
  };

  return (
    <>
      <Header>
        {
          <Link to="/sign-up" className="header__info_type_logout">
            Регистрация
          </Link>
        }
      </Header>
      <section className="popup popup__form_type_login popup_opened">
        <div className="popup__container_type_login">
          <h2 className="popup__heading popup__heading-login">Вход</h2>
          <form
            className={`popup__form popup__form_type_login`}
            onSubmit={handleSubmit}
          >
            <div className="popup__field">
              <input
                type="email"
                autoComplete="off"
                value={formValue.email || ""}
                onChange={handleChange}
                required
                className="popup__input popup__input_type_email"
                id="email-input"
                name="email"
                placeholder="E-mail"
                minLength="2"
                maxLength="40"
              />
              <span className="popup__input-error email-input-error"></span>
            </div>
            <div className="popup__field">
              <input
                type="password"
                value={formValue.password || ""}
                onChange={handleChange}
                required
                className="popup__input popup__input_type_password"
                id="password-input"
                name="password"
                placeholder="Пароль"
                minLength="2"
                maxLength="200"
              />
              <span className="popup__input-error password-input-error"></span>
            </div>
            <button
              type="submit"
              className="button popup__button popup__button-login"
            >
              {"Войти"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
