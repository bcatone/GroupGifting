import { useState, useCallback } from "react";
const useControlledForm = () => {
  const [inputData, setInputData] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);


const handleInputChange = useCallback(
  (event) => {
    const { name, value } = event.target;
    setInputData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: event.target.validationMessage,
    }));
  },
  [setInputData, setErrors]
);

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setInputData(newValues);
      setErrors(newErrors);
      setIsFormValid(newIsFormValid);
    },
    [setInputData, setErrors, setIsFormValid]
  );

  return {
    inputData,
    errors,
    isFormValid,
    handleInputChange,
    resetForm,
  };
};

export default useControlledForm;