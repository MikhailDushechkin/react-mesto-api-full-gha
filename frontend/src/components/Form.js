import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Form(props) {
  const { loggedIn } = React.useContext(CurrentUserContext);
  return (
    <form
      className={`form ${props.name}-form ${!loggedIn && 'form_type_auth'}`}
      name={props.name}
      onSubmit={props.onSubmit}
    >
      <h2 className={`form__title ${!loggedIn && 'form__title_type_auth'}`}>
        {props.title}
      </h2>
      {props.children}
      <button
        type="submit"
        className={`form__save-button ${
          !loggedIn && 'form__save-button_type_auth'
        } ${props.isDisabled && 'form__save-button_inactive'}`}
      >
        {props.buttonText}
      </button>
      {props.haveAcc && props.haveAcc}
    </form>
  );
}

export default Form;
