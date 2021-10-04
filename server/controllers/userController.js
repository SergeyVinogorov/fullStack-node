const User = require("../models/User");

const userController = async (userId) => {
  const user = await User.findById({_id: userId})
  if (!user) {
    throw new Error('User not found')
  }
  return user
}
module.exports = userController