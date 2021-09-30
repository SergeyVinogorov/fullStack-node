const { celebrate, Joi, errors, Segments } = require('celebrate');
const validation = {}

validation.auth = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp('^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$')),
    fullName: Joi.string().min(5)
  }),
})
validation.user = celebrate({
  [Segments.HEADERS]: Joi.object({
    token: Joi.string().required().regex(/abc\d{3}/)
  }).unknown()
})
module.exports = validation