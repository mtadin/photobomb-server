'use strict'

const mongoose = require('../../../core/dbAdapter').db
const Schema = mongoose.Schema

const schemaOptions = {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  },
  minimize: false
}

const PostSchema = new Schema(
  {
    creator: {
      type: String,
      ref: 'User'
    },
    title: {
      type: String
    },
    img: {
      data: Buffer,
      contentType: String
    },
    tag: {
      type: String,
      enum: ['nature', 'animal', 'portrait', 'art', 'architecture', 'landscape']
    },
    comments: {
      type: String,
      ref: 'Comments'
    },
    likes: {
      type: String,
      ref: 'Likes'
    }
  },
  schemaOptions
)

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
