import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import api from '../utils/Api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AuthDataContext } from '../contexts/AuthDataContext';
import Header from './Header';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState('');
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState('');
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState('');
  const [isInfoPopupOpen, setInfoPopupOpen] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState('');
  const [isMenuOpen, setIsMenuOpen] = React.useState('');
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const navigate = useNavigate();

  function handleRegister(email, password) {
    setInfoPopupOpen(true);
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setIsSuccess(true);
          setTimeout(() => setInfoPopupOpen(false), 1000);
          setTimeout(() => navigate('/sign-in'), 1500);
        }
      })
      .catch((err) => {
        setInfoPopupOpen(true);
        setIsSuccess(false);
        console.log(`Возникла ошибка при регистрации ${err}`);
      });
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setFormData({
            email: '',
            password: '',
          });
          setLoggedIn(true);
          navigate('/');
        }
      })
      .catch((err) => {
        setInfoPopupOpen(true);
        setIsSuccess(false);
        console.log(`Возникла ошибка при авторизации ${err}`);
      });
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/sign-in');
    setEmail('');
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            navigate('/');
          }
        })
        .catch((err) => console.log(err));
    }
  }, [navigate]);

  React.useEffect(() => {
    function handleEscapeClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keyup', handleEscapeClose);

    return () => {
      document.removeEventListener('keyup', handleEscapeClose);
    };
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err))
      .finally(() => {});
    }
  }, [loggedIn]);

  //управление статусом лайка карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => console.log(err));
  }

  //удаление карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prev) => prev.filter((item) => item._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  //получение данных пользователя и их установка
  React.useEffect(() => {
    if (loggedIn) {
      api
      .getUserData()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err))
      .finally(() => {});
    }
  }, [loggedIn]);

  //обновление и сохранение данных пользователя через попап
  function handleUpdateUserData(userData) {
    api
      .setUserData(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //обновление и сохранение аватара через попап
  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //добавление новой карточки через попап
  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //переключение значения стейта для попап аватара
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  //переключение значения стейта для попап профиля
  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  //переключение значения стейта для попап карточки
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  //установка стейта для открытия оверлей карточки
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [navigate]);

  function handleMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setInfoPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, loggedIn }}>
      <AuthDataContext.Provider value={{ formData, setFormData }}>
        <Header
          email={email}
          onSignOut={signOut}
          isMenuOpen={isMenuOpen}
          onMenuClick={handleMenuClick}
        />
        <Routes>
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                isLoggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthDataContext.Provider>
      <Footer />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUserData={handleUpdateUserData}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddCard={handleAddPlaceSubmit}
      />
      <PopupWithForm name="confirm" title="Вы уверены?" buttonText="Да" />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoTooltip
        isOpen={isInfoPopupOpen}
        onClose={closeAllPopups}
        isSuccess={isSuccess}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
