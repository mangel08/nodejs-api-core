'use strict'

/* Global imports */
import express from 'express'
import bodyParser from 'body-parser'
import cors from './config/cors'
import fs from 'fs'
import morgan from 'morgan'
import path from 'path'
import {
  auth,
  user,
  person,
  rol
} from './routes'

/* Config vars */
const api = express()
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

/* Config middlewares, plugins and Routes with express */
api.use(morgan('combined', { stream: accessLogStream }))
api.use(bodyParser.urlencoded({ extended: false }))
api.use(bodyParser.json())
api.use(cors)

api.use('/api/v1', auth)
api.use('/api/v1', user)
api.use('/api/v1', person)
api.use('/api/v1', rol)

export default api
