import { useCallback, useState } from "react";
import { validateEmail, validatePassword, validateFieldEmpty } from "../utils/validation.helper";

export const useValidateField = () => {
  const [errorField, setErrorField] = useState({
    name: { isNotValid: false, message: "" },
    surname: { isNotValid: false, message: "" },
    email: { isNotValid: false, message: "" },
    password: { isNotValid: false, message: "" },
  });

  const isEmptyHandler = (value) => {
    const result = validateFieldEmpty(value);
    return {
      isNotValid: result,
      message: result ? "This field is required" : "",
    };
  };

  const emailHandler = (value) => {
    const isEmpty = isEmptyHandler(value);
    if (isEmpty.isNotValid) {
      return isEmpty;
    }
    const result = validateEmail(value);
    return {
      isNotValid: !result,
      message: result ? "" : "Input field is not valid. Example: some@mail.com",
    };
  };

  const passwordHandler = (value) => {
    const isEmpty = isEmptyHandler(value);
    if (isEmpty.isNotValid) {
      return isEmpty;
    }
    if (value.length < 8) {
      return {
        isNotValid: true,
        message: "Input field should be at least 8 characters",
      };
    }
    const result = validatePassword(value);
    return {
      isNotValid: !result,
      message: result ? "" : "Input field should be minimum 8 characters with at least one number and one character",
    };
  };

  const validationHandler = (name, value) => {
    const validator = {
      name: (str) => {
        return isEmptyHandler(str);
      },
      surname: (str) => {
        return isEmptyHandler(str);
      },
      email: (str) => {
        return emailHandler(str);
      },
      password: (str) => {
        return passwordHandler(str);
      },
    };
    try {
      setErrorField({ ...errorField, [name]: validator[name](value) });
      return validator[name](value);
    } catch (e) {
      setErrorField({
        isNotValid: true,
        message: "Incorrect data entered. Please try again",
      });
      throw e;
    }
  };

  const clearErrorField = useCallback(
    () =>
      setErrorField({
        name: { isNotValid: false, message: "" },
        surname: { isNotValid: false, message: "" },
        email: { isNotValid: false, message: "" },
        password: { isNotValid: false, message: "" },
      }),
    []
  );

  return { errorField, setErrorField, validationHandler, clearErrorField };
};
