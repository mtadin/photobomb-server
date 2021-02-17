const postController = require('../controllers')
const multer = require('multer')
const upload = multer()

module.exports = function (app) {
  app.post('/api/post/create', postController.createPost)

  app.post('/api/post/create/:id', upload.single('blob'), postController.uploadImage)

  app.get('/api/posts', postController.getAllPosts)

  app.get('/api/posts/:id', postController.getPostsByUserId)

  app.get('/api/post/tags', postController.getPostTags)

  app.post('/api/post/:id/like', postController.likePost)

  app.post('/api/post/:id/comment', postController.commentPost)

  app.get('/api/post/:id/likes', postController.getLikes)

  app.get('/api/post/:id/comments', postController.getComments)

  app.get('/api/post/:id', postController.getPostById)
}
