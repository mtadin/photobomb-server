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

module.exports.getPostById = async (req, res) => {
  const id = req.params.id
  try {
    const response = await postMethods.getPostById(id)
    return res.status(200).send(response)
  } catch (error) {
    console.error('GET POST BY ID ERROR: ', error)
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
    console.error('GET POSTS BY USER ID ERROR: ', error)
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

module.exports.likePost = async (req, res) => {
  const postId = req.params.id
  const userId = req.body.id
  try {
    const response = await postMethods.likePost(postId, userId)
    return res.status(200).send(response)
  } catch (error) {
    console.error('LIKE ERROR: ', error)
    return res.status(500).send(error)
  }
}

module.exports.commentPost = async (req, res) => {
  const postId = req.params.id
  const comment = req.body
  console.log(postId, comment)
  try {
    const response = await postMethods.commentPost(postId, comment)
    return res.status(200).send(response)
  } catch (error) {
    console.error('COMMENT ERROR: ', error)
    return res.status(500).send(error)
  }
}

module.exports.getLikes = async (req, res) => {
  const postId = req.params.id
  try {
    const response = await postMethods.getLikes(postId)
    return res.status(200).send(response)
  } catch (error) {
    console.error('GET LIKES ERROR: ', error)
    return res.status(500).send(error)
  }
}

module.exports.getComments = async (req, res) => {
  const postId = req.params.id
  try {
    const response = await postMethods.getComments(postId)
    return res.status(200).send(response)
  } catch (error) {
    console.error('GET COMMENTS ERROR: ', error)
    return res.status(500).send(error)
  }
}
