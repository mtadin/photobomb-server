const userController = require('../controllers')

module.exports = function (app) {
  app.post('/api/user/signup', userController.signup)

  app.get('/api/user/login', userController.login)

  app.get('/api/user/checkUsername', userController.checkUsername)
}
