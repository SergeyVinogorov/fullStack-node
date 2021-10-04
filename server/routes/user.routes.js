const {Router} = require('express')
const auth = require('../middleware/auth.middleware')
const userController = require('../controllers/userController')
const router = Router()

router.post('/', auth, async (req,res, next) => {
  try {
    const {userId} = req.body
    const user = await userController(userId)
    res.json(user)
  } catch (e) {
    next(e)
  }
})

module.exports = router