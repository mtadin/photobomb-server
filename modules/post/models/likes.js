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

const LikesSchema = new Schema(
  {
    post: {
      type: String,
      ref: 'Post'
    },
    likes: [{
      type: String,
      ref: 'User'
    }]
  },
  schemaOptions
)

const Likes = mongoose.model('Likes', LikesSchema)

module.exports = Likes
