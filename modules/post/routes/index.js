const postController = require('../controllers')
const multer = require('multer')
const upload = multer()

module.exports = function (app) {
  app.post('/api/post/create', postController.createPost)

  app.post('/api/post/create/:id', upload.single('blob'), postController.uploadImage)

  app.get('/api/post/:id', postController.getPost)

  app.get('/api/posts', postController.getAllPosts)

  app.get('/api/posts/:id', postController.getPostsByUserId)

  app.get('/api/post/tags', postController.getPostTags)
}
