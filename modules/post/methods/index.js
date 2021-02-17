const Post = require('../models/post')
const Likes = require('../models/likes')
const Comments = require('../models/comments')

module.exports.createPost = async (post, creator) => {
  const newPost = new Post({
    creator: creator,
    title: post.title,
    tag: post.tag
  })

  try {
    await newPost.save()
    const likes = new Likes({
      post: newPost._id,
      likes: []
    })
    const comments = new Comments({
      post: newPost._id,
      comments: []
    })
    await likes.save()
    await comments.save()
    await Post.updateOne({ _id: newPost._id }, { likes: likes._id, comments: comments._id })
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

module.exports.getAllPosts = async () => {
  try {
    const posts = await Post.find().populate({
      path: 'likes',
      match: { likes: { $ne: null } }
    })
    return posts
  } catch (error) {
    console.error(error)
  }
}

module.exports.getPostsByUserId = async (userId) => {
  try {
    const posts = await Post.find({ creator: userId }).populate('likes')
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

module.exports.likePost = async (postId, userId) => {
  try {
    const likeExists = await Likes.findOne({ post: postId, likes: { $in: [userId] } })
    if (likeExists) {
      const likes = await Likes.findOneAndUpdate({ post: postId }, { $pull: { likes: userId } }, { new: true })
      return likes
    } else {
      const likes = await Likes.findOneAndUpdate({ post: postId }, { $push: { likes: userId } }, { upsert: true, new: true, setDefaultsOnInsert: true })
      await Post.findOneAndUpdate({ _id: postId }, { likes: likes._id })
      return likes
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports.commentPost = async (postId, comment) => {
  try {
    const comments = await Comments.findOneAndUpdate({ post: postId }, { $push: { comments: comment } }, { upsert: true, new: true, setDefaultsOnInsert: true })
    await Post.findOneAndUpdate({ _id: postId }, { comments: comments._id })
    return 'Comment left succesfully.'
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
    const comments = await Comments.findOne({ post: postId })
    if (comments) {
      return comments
    } else {
      return 'Comments not found.'
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports.getPostById = async (id) => {
  try {
    const post = await Post.findOne({ _id: id }).populate('likes')
    if (post) {
      return post
    } else {
      return 'Post not found.'
    }
  } catch (error) {
    console.error(error)
  }
}
