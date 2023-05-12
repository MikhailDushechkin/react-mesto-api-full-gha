import React from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/FormValidation';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef(null);
  const { values, handleChangeValue, errors, isValid, resetForm } = useFormAndValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: values.link,
    });
  }

  React.useEffect(() => {
    resetForm();
  }, [resetForm, isOpen]);

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      isDisabled={!isValid}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <fieldset className="form__fieldset">
            <label className="form__field">
              <input
                type="url"
                id="avatar-link"
                className="form__input"
                placeholder="Ссылка на аватар"
                name="link"
                required
                value={values.link || ''}
                onChange={handleChangeValue}
                ref={avatarRef}
              />
              <span
                className={`form__input-error avatar-link-error ${
                  !isValid && 'form__input-error_active'
                }`}
              >
                {errors.link || ''}
              </span>
            </label>
          </fieldset>
        </>
      }
      buttonText="Сохранить"
    />
  );
}

export default EditAvatarPopup;
