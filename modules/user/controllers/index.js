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
