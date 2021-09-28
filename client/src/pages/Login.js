import React, {useState, useEffect, useContext} from "react"
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {useValidateField} from "../hooks/validate.hook";
import {AuthContext} from "../context/AuthContext";
import {Link} from "react-router-dom";

export const LoginPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, error, request, clearError} = useHttp()
  const {errorField, setErrorField, validationHandler, clearErrorField} = useValidateField()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  useEffect(()=>{
    message(error)
    clearError()
  }, [error, message, clearError])

  // useEffect(() => {
  //   window.M.updateTextFields()
  // }, [])

  const changeHandler = event => {
    validationHandler(event.target.name, event.target.value)
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const loginHandler = async () => {
    try {
      const validatedFormData = Object.keys(form).map(formName => {
        const validationData = validationHandler(formName, form[formName])
        return {dataName: formName, dataValidation:{...validationData}}
      })
      const formData = { email: form.email, password: form.password }
      let resultValidate = {}
      let isValidAllData = true
      validatedFormData.forEach(element => {
        if(element.dataValidation.isNotValid) {
          isValidAllData = false
        }
        resultValidate = {...resultValidate, [element.dataName]: element.dataValidation}
      })
      setErrorField(resultValidate)
      if (isValidAllData) {
        const data = await request('/api/auth/login', 'POST', {...formData})
        message(data.message)
        clearErrorField()
        auth.login(data.token, data.userId)
      }
    } catch (e) {}
  }
  const classNameHelper = (name) => {
    if (errorField[name].isNotValid) {
      return 'invalid'
    }
    if(form[name] && !errorField[name].isNotValid && !errorField[name].message) {
      return 'valid'
    }
    return ''
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Awesome App</h1>
        <div className="card grey lighten-3">
          <div className="card-content black-text">
            <span className="card-title">Authentication</span>
            <div>

              <div className="input-field">
                <input
                  id="email"
                  type="text"
                  name="email"
                  className={classNameHelper('email')}
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
                <span className="helper-text" data-error={`${errorField.email.message}`} data-success="The field is correct">Sample of email: some@mail.com</span>
              </div>
              <div className="input-field">
                <input
                  id="password"
                  type="password"
                  name="password"
                  className={classNameHelper('password')}
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
                <span className="helper-text" data-error={`${errorField.password.message}`} data-success="The field is correct">The field should be at least 8 character minimum 1 letter and minimum 1 number</span>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn green darken-1"
              disabled={loading}
              type={'submit'}
              onClick={loginHandler}
            >
              Login
            </button>
          </div>
        </div>
        <Link to={'/'} className={'btn yellow darken-1'}>Create an account</Link>
      </div>
    </div>
  )
}