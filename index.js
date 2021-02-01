const config = require('./core/config')
const db = require('./core/dbAdapter')

let app
db.getConnection.then(db => {
  app = require('./core/express')(db)

  app.listen(config.port)
})
