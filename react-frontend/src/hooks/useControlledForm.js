import { useState, useCallback } from "react"

const useControlledForm = () => {
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    })

    setErrors({
      ...errors,
      [name]: event.target.validationMessage,
    })
    // setIsFormValid(event.target.closest("#form").checkValidity())
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setFormData(newValues)
      setErrors(newErrors)
      setIsFormValid(newIsFormValid)
    },
    [setFormData, setErrors, setIsFormValid]
  )

  return {
    formData,
    errors,
    isFormValid,
    handleInputChange,
    resetForm
  };
};

export default useControlledForm;