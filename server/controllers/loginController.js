const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const loginController = async (email, password) => {
  const user = await User.findOne({email})
  if (!user) {
    throw new Error('User not found')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Invalid password, please try again')
  }

  const token = jwt.sign(
    {userId: user.id},
    config.get('jwtSecret'),
    {expiresIn: '1h'}
  )
  return {token, userId: user.id}
}
module.exports = loginController