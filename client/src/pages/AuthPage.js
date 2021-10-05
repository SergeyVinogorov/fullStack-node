import React, { useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { useValidateField } from "../hooks/validate.hook";
import { useMessage } from "../hooks/message.hook";
import { Link, useHistory } from "react-router-dom";

export const AuthPage = () => {
  const message = useMessage();
  const history = useHistory();
  const { loading, error, request, clearError } = useHttp();
  const { errorField, setErrorField, validationHandler, clearErrorField } = useValidateField();
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);
  const changeHandler = (event) => {
    validationHandler(event.target.name, event.target.value);
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const validatedFormData = Object.keys(form).map((formName) => {
        const validationData = validationHandler(formName, form[formName]);
        return { dataName: formName, dataValidation: { ...validationData } };
      });
      const formData = { email: form.email, password: form.password };
      const dirtyFullName = `${form.name}${form.surname}`;
      let resultValidate = {};
      let isValidAllData = true;
      validatedFormData.forEach((element) => {
        if (element.dataValidation.isNotValid) {
          isValidAllData = false;
        }
        resultValidate = { ...resultValidate, [element.dataName]: element.dataValidation };
      });
      setErrorField(resultValidate);
      if (isValidAllData) {
        if (dirtyFullName.length < 5) {
          setErrorField({
            ...resultValidate,
            name: { isNotValid: true, message: "Full name should be at least 5 characters" },
            surname: { isNotValid: true, message: "Full name should be at least 5 characters" },
          });
          isValidAllData = false;
          return;
        }
        formData["fullName"] = `${form.name} ${form.surname}`;
        const data = await request("/api/auth/register", "POST", { ...formData });
        message(data.message);
        clearErrorField();
        history.push("/login");
      }
    } catch (e) {
      console.log(e);
      message("Something went wrong");
    }
  };
  const classNameHelper = (name) => {
    if (errorField[name].isNotValid) {
      return "invalid";
    }
    if (form[name] && !errorField[name].isNotValid && !errorField[name].message) {
      return "valid";
    }
    return "";
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Awesome App</h1>
        <div className="card grey lighten-3">
          <div className="card-content black-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  id="email"
                  type="text"
                  name="email"
                  className={classNameHelper("email")}
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
                <span
                  className="helper-text"
                  data-error={`${errorField.email.message}`}
                  data-success="The field is correct"
                >
                  Sample of email: some@mail.com
                </span>
              </div>
              <div className="input-field">
                <input
                  id="password"
                  type="password"
                  name="password"
                  className={classNameHelper("password")}
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
                <span
                  className="helper-text"
                  data-error={`${errorField.password.message}`}
                  data-success="The field is correct"
                >
                  The field should be at least 8 character minimum 1 letter and minimum 1 number
                </span>
              </div>
              <div className="input-field">
                <input
                  id="name"
                  type="text"
                  name="name"
                  className={classNameHelper("name")}
                  value={form.name}
                  onChange={changeHandler}
                />
                <label htmlFor="name">Name</label>
                <span
                  className="helper-text"
                  data-error={`${errorField.name.message}`}
                  data-success="The field is correct"
                >
                  The field should not empty
                </span>
              </div>
              <div className="input-field">
                <input
                  id="surname"
                  type="text"
                  name="surname"
                  className={classNameHelper("surname")}
                  value={form.surname}
                  onChange={changeHandler}
                />
                <label htmlFor="surname">Surname</label>
                <span
                  className="helper-text"
                  data-error={`${errorField.surname.message}`}
                  data-success="The field is correct"
                >
                  The field should not empty
                </span>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button className="btn yellow darken-1" onClick={registerHandler} disabled={loading}>
              Registration
            </button>
          </div>
        </div>
        <Link to={"/login"} className={"btn green darken-1"}>
          Sign in
        </Link>
      </div>
    </div>
  );
};
