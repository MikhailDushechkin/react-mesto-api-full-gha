import React from 'react';
import { useNavigate } from 'react-router-dom';

import Form from './Form';
import * as auth from '../utils/auth';
import { AuthDataContext } from '../contexts/AuthDataContext';

function Login({ onLogin }) {
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
    if (!formData.email || !formData.password) {
      return;
    }
    onLogin(formData.email, formData.password);
  }

  return (
    <Form
      name="login"
      title="Вход"
      buttonText="Войти"
      onSubmit={handleSubmit}
      children={
        <>
          <fieldset className="form__fieldset">
            <label className="form__field">
              <input
                type="email"
                id="login-email"
                className="form__input form__input_type_auth"
                placeholder="Email"
                name="email"
                minLength="5"
                maxLength="40"
                required
                value={formData.email || ''}
                onChange={handleChangeData}
              />
              <span className="form__input-error avatar-link-error"></span>
            </label>
            <label className="form__field">
              <input
                type="password"
                id="login-password"
                className="form__input form__input_type_auth"
                placeholder="Пароль"
                name="password"
                minLength="5"
                maxLength="40"
                required
                value={formData.password || ''}
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

export default Login;
