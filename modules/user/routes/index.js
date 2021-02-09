const userController = require('../controllers')

module.exports = function (app) {
  app.post('/api/user/signup', userController.signup)

  app.post('/api/user/login', userController.login)

  app.post('/api/user/refresh', userController.refresh)

  app.get('/api/user', userController.getUser)

  app.post('/api/user/logout', userController.logout)

  app.post('/api/user/checkUsername', userController.checkUsername)
}
