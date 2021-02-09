const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

const refreshTokens = {}

module.exports.signup = async (user) => {
  const hash = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)) // hash and salt
  const newUser = new User({
    username: user.username,
    password: hash
  })
  try {
    await newUser.save()
    return 'SIGNUP OK'
  } catch (error) {
    console.error(error)
  }
}

module.exports.login = async (credentials) => {
  try {
    const user = await User.findOne({ username: credentials.username })
    if (user) {
      if (bcrypt.compareSync(credentials.password, user.password)) { // compare passwords
        const expiresIn = 36000
        const refreshToken = Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1
        const accessToken = jsonwebtoken.sign({ user: user.username }, 'dummy', { expiresIn })
        refreshTokens[refreshToken] = { accessToken, user: user.username }
        return ({ token: { accessToken, refreshToken } })
      } else {
        return 'Wrong password. Try again.'
      }
    } else {
      return 'User not found.'
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports.logout = async () => {
  try {
    console.log()
    return 'LOGOUT OK'
  } catch (error) {
    console.error(error)
  }
}

module.exports.refresh = async (refreshToken) => {
  try {
    if (refreshToken in refreshTokens) {
      const user = refreshTokens[refreshToken].user
      const expiresIn = 36000
      const newRefreshToken = Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1
      delete refreshTokens[refreshToken]
      const accessToken = jsonwebtoken.sign({ user: user.username }, 'dummy', { expiresIn })
      refreshTokens[newRefreshToken] = { accessToken, user }
      return ({ token: { accessToken, refreshToken: newRefreshToken } })
    } else {
      return 'Refresh failure'
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports.getUser = async (user) => {
  const reqUser = user
  try {
    const user = await User.findOne({ username: reqUser.user })
    return { user: user }
  } catch (error) {
    console.error(error)
  }
}

module.exports.checkUsername = async (username) => {
  try {
    const user = await User.findOne({ username: username })
    if (user) {
      return false
    } else {
      return true
    }
  } catch (error) {
    console.error(error)
  }
}
