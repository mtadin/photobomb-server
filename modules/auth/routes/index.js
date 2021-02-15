const authController = require('../controllers')

module.exports = function (app) {
  app.post('/api/auth/login', authController.login)

  app.post('/api/auth/refresh', authController.refresh)

  app.get('/api/auth', authController.getUser)

  app.post('/api/auth/logout', authController.logout)
}
