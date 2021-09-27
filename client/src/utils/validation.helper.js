export const validateFieldEmpty = (value) => {
  return (value.match(/^\s*$/) || []).length > 0;
}
export const validateEmail = (value) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(value);
}
export const validatePassword = (value) => {
  const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
  return passwordPattern.test(value);
}