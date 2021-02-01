const dev = require('./dev')
const prod = require('./production')

let config
if (process.env.NODE_ENV === 'production') {
  config = prod
} else {
  config = dev
}

module.exports = config
