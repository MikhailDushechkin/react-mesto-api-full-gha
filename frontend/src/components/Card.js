import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { currentUser } = React.useContext(CurrentUserContext);

  const isOwnCard = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `photo-cards__button-like ${
    isLiked && 'photo-cards__button-like_active'
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="photo-cards__item">
      <img
        src={card.link}
        alt={card.name}
        className="photo-cards__photo"
        onClick={handleClick}
      />
      <div
        className={`photo-cards__description ${
          card.likes.length > 0 && 'photo-cards__description_with-count'
        }`}
      >
        <h2 className="photo-cards__text">{card.name}</h2>
        <div className="photo-cards__like-block">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Поставить лайк"
            onClick={handleLikeClick}
          ></button>
          <span className="photo-cards__like-counter">
            {card.likes.length > 0 ? card.likes.length : ''}
          </span>
        </div>
      </div>
      {isOwnCard && (
        <button
          className="photo-cards__button-del"
          type="button"
          aria-label="Удалить фото"
          onClick={handleDeleteClick}
        ></button>
      )}
    </li>
  );
}

export default Card;
