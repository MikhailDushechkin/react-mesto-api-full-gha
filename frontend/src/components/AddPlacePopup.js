import React from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/FormValidation';

function AddPlacePopup({ isOpen, onClose, onAddCard }) {
  const { values, handleChangeValue, errors, isValid, resetForm } =
    useFormAndValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddCard({
      name: values.name,
      link: values.link,
    });
  }

  React.useEffect(() => {
    resetForm();
  }, [resetForm, isOpen]);

  return (
    <PopupWithForm
      name="cards"
      title="Новое место"
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
                id="photo-name"
                className="form__input"
                placeholder="Название"
                name="name"
                minLength="2"
                maxLength="30"
                required
                value={values.name || ''}
                onChange={handleChangeValue}
              />
              <span
                className={`form__input-error photo-name-error ${
                  !isValid && 'form__input-error_active'
                }`}
              >
                {errors.name}
              </span>
            </label>
            <label className="form__field">
              <input
                type="url"
                id="photo-link"
                className="form__input"
                placeholder="Ссылка на картинку"
                name="link"
                required
                value={values.link || ''}
                onChange={handleChangeValue}
              />
              <span
                className={`form__input-error photo-link-error ${
                  !isValid && 'form__input-error_active'
                }`}
              >
                {errors.link}
              </span>
            </label>
          </fieldset>
        </>
      }
      buttonText="Создать"
    />
  );
}

export default AddPlacePopup;
