const postMethods = require('../methods')

module.exports.createPost = async (req, res) => {
  // console.log('req.user: ', req.user)
  console.log('req.body: ', req.body)
  const post = req.body
  const creator = req.user.user
  try {
    const response = await postMethods.createPost(post, creator)
    return res.status(200).send(response)
  } catch (error) {
    console.error('CREATE POST ERROR: ', error)
    return res.status(500).send(error)
  }
}

module.exports.uploadImage = async (req, res) => {
  console.log('req.file: ', req.file)
  const image = req.file.buffer
  const postId = req.params.id
  try {
    const response = await postMethods.uploadImage(image, postId)
    return res.status(200).send(response)
  } catch (error) {
    console.error('UPLOAD IMAGE ERROR: ', error)
    return res.status(500).send(error)
  }
}

module.exports.getPost = async (req, res) => {
  const id = req.params.id
  try {
    const response = await postMethods.getPost(id)
    return res.status(200).send(response)
  } catch (error) {
    console.error('GET POST ERROR: ', error)
    return res.status(500).send(error)
  }
}

module.exports.getAllPosts = async (req, res) => {
  try {
    const response = await postMethods.getAllPosts()
    return res.status(200).send(response)
  } catch (error) {
    console.error('GET POSTS ERROR: ', error)
    return res.status(500).send(error)
  }
}

module.exports.getPostsByUserId = async (req, res) => {
  const userId = req.params.id
  try {
    const response = await postMethods.getPostsByUserId(userId)
    return res.status(200).send(response)
  } catch (error) {
    console.error('GET POSTS ERROR: ', error)
    return res.status(500).send(error)
  }
}

module.exports.getPostTags = async (req, res) => {
  try {
    const response = await postMethods.getPostTags()
    return res.status(200).send(response)
  } catch (error) {
    console.error('GET TAGS ERROR: ', error)
    return res.status(500).send(error)
  }
}
