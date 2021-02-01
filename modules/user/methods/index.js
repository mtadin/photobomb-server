const User = require('../models/user')

module.exports.signup = async (user) => {
  const newUser = new User({
    username: user.username,
    password: user.password
  })
  try {
    await newUser.save()
    return newUser
  } catch (error) {
    console.error(error)
  }
}

module.exports.login = async (credentials) => {
  try {
    const user = await User.findOne(credentials)
    return user
  } catch (error) {
    console.error(error)
  }
}

module.exports.checkUsername = async (username) => {
  try {
    const user = await User.findOne({ username: username })
    if (user === null) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
  }
}
