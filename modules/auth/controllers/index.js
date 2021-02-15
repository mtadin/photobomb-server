const authMethods = require('../methods')

module.exports.login = async (req, res) => {
  // console.log('login: ', req.body)
  const credentials = req.body
  try {
    const response = await authMethods.login(credentials)
    return res.status(200).send(response)
  } catch (error) {
    console.error('LOGIN ERROR: ', error)
    return res.status(500).send(error)
  }
}

module.exports.logout = async (_req, res) => {
  try {
    const response = await authMethods.logout()
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
    const response = await authMethods.refresh(refreshToken)
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
    const response = await authMethods.getUser(user)
    return res.status(200).send(response)
  } catch (error) {
    console.error('GET ERROR: ', error)
    return res.status(500).send(error)
  }
}
