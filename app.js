import cors from 'cors'
import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import knexStorage from '@express-knex/storage-sqlite'
import Wrap from '@express-knex/wrap'
import Mail from '@express-knex/mailer'
import Errors from '@express-knex/errors'
import Validator from '@express-knex/validator'
import Controller from '@express-knex/controller'
import CrudActions from '@express-knex/crud-actions'
import RouteBuilder from '@express-knex/route-builder'

import User from '@express-knex/entity-user'

import indexRouter from './routes/index'

/**
 * Build Express App with Knex engine
 * @param env (optional) environment vars
 * @return {Promise<app>} will return promise of initialized app
 */

let app = null
module.exports = (env) => {
  return Promise.resolve()
    .then(() => {
      app = express()
      app.express = express

      // set env
      if (env) {
        app.env = env
      } else {
        app.env = process.env
      }

      // view engine setup
      app.set('views', path.join(__dirname, 'views'))
      app.set('view engine', 'pug')

      // setup middlewares:
      app.use(logger('dev'))
      app.use(express.json())
      app.use(express.urlencoded({ extended: false }))
      app.use(cookieParser())
      app.use(express.static(path.join(__dirname, 'public')))

      // init cors:
      app.use(cors({
        origin: '*',
        allowedHeaders: 'Content-Type,Authorization,Content-Range,Accept,Accept-Encoding,Accept-Language',
        exposedHeaders: 'Content-Type,Authorization,Content-Range,Accept,Accept-Encoding,Accept-Language'
      }))

      // init services
      app.errors = Errors(app)
      app.wrap = Wrap(app)
      app.mail = Mail(app)

      // init storage:
      app.storage = knexStorage(app)
      app.validator = Validator(app)
      app.controller = Controller(app)
      app.controller.CrudActions = CrudActions(app)

      // init models:
      app.models = {}
      app.models.User = User(app)

      app.routeBuilder = RouteBuilder(app)
      app.routeBuilder.routerForAllModels()

      // init routes:
      app.use('/', indexRouter)

      // catch 404 and forward to error handler
      app.use(function (req, res, next) {
        next(createError(404))
      })

      // error handler
      app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message
        res.locals.error = req.app.get('env') === 'development' ? err : {}

        // render the error page
        res.status(err.status || 500)
        res.render('error')
      })
      return app
    })
    .then((app) => app.storage.storageInit())
    .then(() => app.models.User.storageSchemaInit())
    .then(() => app)
    .catch((e) => { throw e })
}
