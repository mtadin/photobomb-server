const Post = require('../models/post')

module.exports.createPost = async (post, creator) => {
  const newPost = new Post({
    creator: creator,
    title: post.title,
    img: post.img
    // comments: post.comments,
    // likes: post.likes
  })
  try {
    await newPost.save()
    return 'POST CREATED'
  } catch (error) {
    console.error(error)
  }
}

module.exports.getPost = async (id) => {
  try {
    const post = await Post.findOne({ _id: id })
    if (post) {
      return post
    } else {
      return 'Post not found.'
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports.getAllPosts = async () => {
  try {
    const posts = await Post.find()
    return posts
  } catch (error) {
    console.error(error)
  }
}
