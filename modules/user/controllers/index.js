const userMethods = require('../methods')

module.exports.signup = async (req, res) => {
  // console.log('signup: ', req.body)
  const newUser = req.body
  try {
    if (newUser.password === newUser.passwordMatch) {
      const response = await userMethods.signup(newUser)
      return res.status(200).send(response)
    } else {
      return res.status(400).send('ERROR: Passwords do not match.')
    }
  } catch (error) {
    console.error('SIGNUP ERROR: ', error)
    return res.status(500).send(error)
  }
}

module.exports.login = async (req, res) => {
  // console.log('login: ', req.body)
  const credentials = req.body
  try {
    const response = await userMethods.login(credentials)
    return res.status(200).send(response)
  } catch (error) {
    console.error('LOGIN ERROR: ', error)
    return res.status(500).send(error)
  }
}

module.exports.logout = async (_req, res) => {
  try {
    const response = await userMethods.logout()
    return res.status(200).send(response)
  } catch (error) {
    console.error('LOGOUT ERROR: ', error)
    return res.status(500).send(error)
  }
}

module.exports.refresh = async (req, res) => {
  // console.log('refresh: ', req.body)
  const { refreshToken } = req.body
  try {
    const response = await userMethods.refresh(refreshToken)
    return res.status(200).send(response)
  } catch (error) {
    console.error('REFRESH ERROR: ', error)
    return res.status(500).send(error)
  }
}

module.exports.getUser = async (req, res) => {
  // console.log('getUser: ', req.user)
  const user = req.user
  try {
    const response = await userMethods.getUser(user)
    return res.status(200).send(response)
  } catch (error) {
    console.error('GET ERROR: ', error)
    return res.status(500).send(error)
  }
}

module.exports.checkUsername = async (req, res) => {
  // console.log('req: ', req.body.usernameToCheck)
  const username = req.body.usernameToCheck
  try {
    const response = await userMethods.checkUsername(username)
    return res.status(200).send(response)
  } catch (error) {
    console.error('USERNAME CHECK ERROR: ', error)
    return res.status(500).send(error)
  }
}
