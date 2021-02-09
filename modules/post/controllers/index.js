const userMethods = require('../methods')

module.exports.createPost = async (req, res) => {
  const post = req.body.post
  const creator = req.user._id
  try {
    const response = await userMethods.createPost(post, creator)
    return res.status(200).send(response)
  } catch (error) {
    console.error('CREATE POST ERROR: ', error)
    return res.status(500).send(error)
  }
}

module.exports.getPost = async (req, res) => {
  const id = req.body.id
  try {
    const response = await userMethods.getPost(id)
    return res.status(200).send(response)
  } catch (error) {
    console.error('GET POST ERROR: ', error)
    return res.status(500).send(error)
  }
}

module.exports.getAllPosts = async (req, res) => {
  try {
    const response = await userMethods.getAllPosts()
    return res.status(200).send(response)
  } catch (error) {
    console.error('GET POSTS ERROR: ', error)
    return res.status(500).send(error)
  }
}
