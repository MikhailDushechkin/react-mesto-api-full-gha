import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useFormAndValidation from '../hooks/FormValidation';

function EditProfilePopup({ isOpen, onClose, onUpdateUserData }) {
  const { currentUser } = React.useContext(CurrentUserContext);
  const { values, handleChangeValue, errors, isValid, resetForm } =
    useFormAndValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUserData({
      name: values.name,
      about: values.about,
    });
  }

  React.useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, false);
    }
  }, [currentUser, resetForm, isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      isDisabled={!isValid}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <fieldset className="form__fieldset">
            <label className="form__field">
              <input
                type="text"
                id="profile-name"
                className="form__input"
                placeholder="Имя"
                name="name"
                minLength="2"
                maxLength="40"
                required
                value={values.name || ''}
                onChange={handleChangeValue}
              />
              <span
                className={`form__input-error profile-name-error ${
                  !isValid && 'form__input-error_active'
                }`}
              >
                {errors.name}
              </span>
            </label>
            <label className="form__field">
              <input
                type="text"
                id="profile-description"
                className="form__input"
                placeholder="О себе"
                name="about"
                minLength="2"
                maxLength="200"
                required
                value={values.about || ''}
                onChange={handleChangeValue}
              />
              <span
                className={`form__input-error profile-description-error ${
                  !isValid && 'form__input-error_active'
                }`}
              >
                {errors.description || ''}
              </span>
            </label>
          </fieldset>
        </>
      }
      buttonText="Сохранить"
    />
  );
}

export default EditProfilePopup;
