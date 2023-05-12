import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import logo from '../images/logo-white.svg';

function Header({ email, onSignOut, isMenuOpen, onMenuClick }) {
  return (
    <>
      <header className={`header ${isMenuOpen && 'header_opened-menu'}`}>
        <img src={logo} alt="Логотип 'Место'" className="header__logo" />
        <div className="header__auth-wrapper">
          <Routes>
            <Route
              path="/sign-up"
              element={
                <Link to="/sign-in" className="header__auth-button">
                  Войти
                </Link>
              }
            />
            <Route
              path="/sign-in"
              element={
                <Link to="/sign-up" className="header__auth-button">
                  Регистрация
                </Link>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <div
                    className={`header__auth-block ${
                      isMenuOpen && 'header__auth-block_mobile'
                    }`}
                  >
                    <span className="header__auth-user">{email}</span>
                    <button onClick={onSignOut} className="header__auth-button">
                      Выйти
                    </button>
                  </div>
                  <div
                    onClick={onMenuClick}
                    className={`burger-menu ${
                      isMenuOpen && 'burger-menu_close'
                    }`}
                  >
                    <div className="burger-menu__line"></div>
                    <div className="burger-menu__line"></div>
                    <div className="burger-menu__line"></div>
                  </div>
                </>
              }
            />
          </Routes>
        </div>
      </header>
    </>
  );
}

export default Header;
