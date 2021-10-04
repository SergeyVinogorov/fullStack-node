const {Router} = require('express')
const router = Router()
const validation = require('../middleware/validate.middleware')
const registerController = require('../controllers/registerController')
const loginController = require('../controllers/loginController')

router.post(
    '/register',
    validation.auth,
    async (req, res, next) => {
    try {
        const {email, password, fullName} = req.body
        await registerController(email, password, fullName)
        res.status(201).json({message: 'User created'})
    } catch (e) {
      next(e)
    }
})

router.post(
  '/login',
    validation.auth,
    async (req, res,next) => {
    try {
      const {email, password} = req.body
      const responseObj = await loginController(email, password)
      res.json(responseObj)
    } catch (e) {
      next(e)
    }
})

module.exports =  router