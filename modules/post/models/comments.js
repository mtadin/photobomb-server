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

const CommentsSchema = new Schema(
  {
    post: {
      type: String,
      ref: 'Post'
    },
    comments: [{
      userId: {
        type: String,
        ref: 'User'
      },
      username: {
        type: String
      },
      comment: {
        type: String
      }
    }]
  },
  schemaOptions
)

const Comments = mongoose.model('Comments', CommentsSchema)

module.exports = Comments
