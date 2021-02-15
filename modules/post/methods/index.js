const Post = require('../models/post')

module.exports.createPost = async (post, creator) => {
  const newPost = new Post({
    creator: creator,
    title: post.title,
    tag: post.tag
    // img: post.img
    // comments: post.comments,
    // likes: post.likes
  })
  try {
    await newPost.save()
    return newPost
  } catch (error) {
    console.error(error)
  }
}

module.exports.uploadImage = async (image, postId) => {
  // const post = Post.find({ _id: postId })
  try {
    await Post.updateOne({ _id: postId }, { img: image })
    return 'Image uploaded.'
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

module.exports.getPostsByUserId = async (userId) => {
  try {
    const posts = await Post.find({ creator: userId })
    if (posts) {
      return posts
    } else {
      return 'Posts not found.'
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports.getPostTags = async () => {
  try {
    const tags = await Post.schema.path('tag').enumValues
    return tags
  } catch (error) {
    console.error(error)
  }
}
