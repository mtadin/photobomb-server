const userMethods = require('../methods')

module.exports.signup = async (req, res) => {
  const newUser = req.user
  try {
    const response = await userMethods.signup(newUser)
    return res.status(200).send(response)
  } catch (error) {
    console.error('SIGNUP ERROR: ', error)
    return res.status(500).send(error)
  }
}

module.exports.login = async (req, res) => {
  const credentials = req.credentials
  try {
    const response = await userMethods.login(credentials)
    return res.status(200).send(response)
  } catch (error) {
    console.error('LOGIN ERROR: ', error)
    return res.status(500).send(error)
  }
}

module.exports.checkUsername = async (req, res) => {
  const username = req.username
  try {
    const response = await userMethods.checkUsername(username)
    return res.status(200).send(response)
  } catch (error) {
    console.error('USERNAME CHECK ERROR: ', error)
    return res.status(500).send(error)
  }
}
