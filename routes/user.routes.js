const {Router} = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/', auth, async (req,res) => {
  try {
    const {userId} = req.body
    console.log(userId)
    const user = await User.findById({_id: userId})
    res.json(user)
  } catch (e) {
    res.status(500).json({message: "Something went wrong"})
  }
})

module.exports = router