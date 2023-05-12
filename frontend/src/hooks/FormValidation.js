import React from 'react';

function useFormAndValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(true);

  function handleChangeValue(evt) {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: evt.target.validationMessage,
    });
    setIsValid(evt.target.closest('form').checkValidity());
  }

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    errors,
    isValid,
    handleChangeValue,
    resetForm,
    setValues,
    setIsValid,
  };
}

export default useFormAndValidation;
