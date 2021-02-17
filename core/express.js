const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('express-jwt')
const fs = require('fs')
const path = require('path')

function initGlobals () {
  global.rootPath = path.normalize(path.join(__dirname, '..'))
}

function initMiddleware (app) {
  app.use(
    jwt({
      secret: 'dummy',
      algorithms: ['sha1', 'RS256', 'HS256']
    }).unless({
      path: ['/api/auth/login', '/api/user/checkUsername', '/api/user/signup', '/api/posts']
    })
  )

  app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: 10000 * 2
    })
  )
  app.use(bodyParser.json())
  app.use(cookieParser())

  const allowedOrigins = ['http://localhost:8080']
  app.use(cors({
    origin: function (origin, callback) { // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not ' +
          'allow access from the specified Origin.'
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    },
    credentials: true
  }))
}

function registerRoutes (app) {
  const moduleDir = global.rootPath + '/modules'
  const noRoutesModules = []
  fs.readdirSync(moduleDir).forEach(file => {
    const path = moduleDir + '/' + file + '/routes'
    try {
      fs.lstatSync(path).isDirectory()
      console.info(`\tRegistering ${file} routes...`)
      require(path)(app)
    } catch (e) {
      // Handle error
      if (e.code === 'ENOENT' || e.code === 'ENOTDIR') {
        noRoutesModules.push(file)
      } else {
        console.error('Error registering path: ', file, e)
      }
    }
  })

  noRoutesModules.forEach(mod => {
    console.debug(`Module: ${mod} does not contain a routes folder`)
  })
}

function setHeaders (app) {
  app.get('/', (req, res) => {
    req.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    req.header('Access-Control-Request-Method', 'http://localhost:8080')
  })
}

module.exports = function (db) {
  const app = express()

  initGlobals()

  initMiddleware(app)

  registerRoutes(app)

  setHeaders(app)

  return app
}
