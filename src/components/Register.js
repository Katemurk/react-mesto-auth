import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header.js";

const Register = (props) => {
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
    props.handleRegistration(formValue.email, formValue.password);
    //  auth.register(formValue.email, formValue.password).then((res) => {
    //    navigate("/sign-in", { replace: true });
    //  });
  };

  return (
    <>
      <Header>
        {
          <Link to="/sign-in" className="header__info_type_logout">
            Войти
          </Link>
        }
      </Header>
      <section className="popup popup__form_type_login popup_opened">
        <div className="popup__container_type_login">
          <h2 className="popup__heading popup__heading-login">Регистрация</h2>
          <form
            noValidate
            className={`popup__form popup__form_type_login`}
            onSubmit={handleSubmit}
          >
            <div className="popup__field">
              <input
                type="url"
                value={formValue.email}
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
                value={formValue.password}
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
              {"Зарегистрироваться"}
            </button>
            <Link to="/sign-in" className="popup__span-register">
              Уже зарегистрированы? Войти
            </Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
