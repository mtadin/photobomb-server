const mongoose = require('mongoose')

const config = require('./config/index')

module.exports.getConnection = new Promise(async function (resolve, reject) {
  mongoose.connect(
    config.mongo.uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  mongoose.set('useCreateIndex', true)
  mongoose.set('useFindAndModify', false)
  mongoose.Schema.Types.String.checkRequired(v => typeof v === 'string')
  resolve(mongoose.connection)
})

module.exports.db = mongoose
