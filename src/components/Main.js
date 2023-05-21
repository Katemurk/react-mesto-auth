import { useContext } from "react";
import Card from "./Card.js";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Header from "./Header.js";

const Main = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <button className="header__info_type_login">{props.email}</button>
        <button onClick={props.signOut} className="header__info_type_logout">
          Выйти
        </button>
      </Header>
      <main className="content">
        <section className="profile">
          <div className="profile__text">
            <button
              type="button"
              aria-label="Сменить изображение профиля"
              className="button profile__change-button"
              onClick={props.onEditAvatar}
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="profile__image"
              />
            </button>
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                aria-label="Редактировать профиль"
                className="button profile__edit-button"
                onClick={props.onEditProfile}
              ></button>
              <p className="profile__caption">{currentUser.about}</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Добавить фото"
            className="button profile__add-button"
            onClick={props.onAddPlace}
          ></button>
        </section>
        <section className="grid-elements">
          <ul
            className="grid-elements__list"
            aria-label="Фотографии с заголовками"
          >
            {props.cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
                onClose={props.onClose}
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default Main;
