const Post = require('../models/post')
const Likes = require('../models/likes')
const Comments = require('../models/comments')

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

module.exports.getPostById = async (id) => {
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
    console.log(Post.schema.paths)
    const tags = await Post.schema.path('tag').enumValues
    return tags
  } catch (error) {
    console.error(error)
  }
}

module.exports.likePost = async (postId, userId) => {
  try {
    // TODO find post, get likes if dont exist create, add id to likes, same for comments
    Likes.findOneAndUpdate({ post: postId }, { $push: { likes: userId } }, { new: true, upsert: true })
    return 'Post liked succesfully.'
  } catch (error) {
    console.error(error)
  }
}

module.exports.commentPost = async (postId, comment) => {
  try {
    Comments.findOneAndUpdate({ post: postId }, { $push: { comments: comment } }, { new: true, upsert: true })
    return 'Left a comment succesfully.'
  } catch (error) {
    console.error(error)
  }
}

module.exports.getLikes = async (postId) => {
  try {
    const likes = await Likes.find({ post: postId })
    if (likes) {
      return likes
    } else {
      return 'Likes not found.'
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports.getComments = async (postId) => {
  try {
    const comments = await Comments.find({ post: postId })
    if (comments) {
      return Comments
    } else {
      return 'Comments not found.'
    }
  } catch (error) {
    console.error(error)
  }
}
