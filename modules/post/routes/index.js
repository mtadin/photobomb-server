const postController = require('../controllers')

module.exports = function (app) {
  app.post('/api/post/create', postController.createPost)

  app.get('/api/post', postController.getPost)

  app.get('/api/posts', postController.getAllPosts)
}
