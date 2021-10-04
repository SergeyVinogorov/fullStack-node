const User = require("../models/User");
const bcrypt = require("bcryptjs");
const registerController = async (email, password, fullName) => {
  const candidate = await User.findOne({email})
  if (candidate) {
    throw new Error('This user already exists')
  }
  const hashedPassword = await bcrypt.hash(password, 12)
  const user = new User({email, password: hashedPassword, fullName})
  await user.save()
}
module.exports = registerController