import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
   `button card__like-button ${isLiked && 'card__like-button_active'}` 
  );

  const handleCardClick = () => {
    onCardClick({
      isOpen: true,
      item: card,
    });
  };

  const handleLikeClick = () => {
    onCardLike(card)
  };
  const handleDeleteClick = () => {
    onCardDelete(card)
  }

  return (
    <li className="card">
      <img
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
        className="card__img"
      />
      <div className="card__text">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__counter">
          <button
            type="button"
            aria-label="Кнопка лайка"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <div className="card__count">{card.likes.length}</div>
        </div>
      </div>
      {
      isOwn && 
      <button
        type="button"
        aria-label="Кнопка удаления"
        className="button card__trash-button"
       onClick={handleDeleteClick}
      ></button>}
    
    </li>
  );
};
export default Card;
