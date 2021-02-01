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

const UserSchema = new Schema(
  {
    username: {
      type: String
    },
    password: {
      type: String
    }
  },
  schemaOptions

)

const User = mongoose.model('User', UserSchema)

module.exports = User
