import React from 'react';
import { Link } from 'react-router-dom';

import Form from './Form';
import { AuthDataContext } from '../contexts/AuthDataContext';

function Register({ onRegister }) {
  const { formData, setFormData } = React.useContext(AuthDataContext);

  function handleChangeData(evt) {
    const { name, value } = evt.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = formData;
    onRegister(email, password);
  }

  const haveAccLink = (
    <Link className="form__subtext form__link" to="/sign-in">
      Уже зарегистрированы? Войти
    </Link>
  );
  return (
    <Form
      name="register"
      title="Регистрация"
      buttonText="Зарегистрироваться"
      haveAcc={haveAccLink}
      onSubmit={handleSubmit}
      children={
        <>
          <fieldset className="form__fieldset">
            <label className="form__field">
              <input
                type="email"
                id="register-email"
                className="form__input form__input_type_auth"
                placeholder="Email"
                name="email"
                minLength="5"
                maxLength="40"
                required
                value={formData.email}
                onChange={handleChangeData}
              />
              <span className="form__input-error avatar-link-error"></span>
            </label>
            <label className="form__field">
              <input
                type="password"
                id="register-password"
                className="form__input form__input_type_auth"
                placeholder="Пароль"
                name="password"
                minLength="5"
                maxLength="40"
                required
                value={formData.password}
                onChange={handleChangeData}
              />
              <span className="form__input-error avatar-link-error"></span>
            </label>
          </fieldset>
        </>
      }
    ></Form>
  );
}

export default Register;
