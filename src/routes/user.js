'use strict'

/* Global Imports */
import express from 'express'
import { UserCtrl } from '../controllers'
import { isAuth } from '../middlewares'

/* Config Vars */
const guard = require('express-jwt-permissions')()
const api = express.Router()

/* * * * * * * Config Routes of User with Express Router * * + * * * * * * * * * * * * */
/* 1: Route string
*  2: Middleware to verified de JWT
*  3: Middelware to validate the permissions in JWT
*  4: Called of function of controller for this route
*/
api.get('/users', isAuth, guard.check([['user:all'], ['user']]), UserCtrl.getUsers)
api.get('/user/:_id', isAuth, guard.check([['user:read'], ['user']]), UserCtrl.getUser)
api.put('/user/:_id', isAuth, guard.check([['user:update'], ['user']]), UserCtrl.updateUser)
api.delete('/user/:_id', isAuth, guard.check([['user:delete'], ['user']]), UserCtrl.deleteUser)

// Populate Persona
api.get('/users/person/', isAuth, guard.check([['users-person:read'], ['user']]), UserCtrl.getAllUserPerson)
api.get('/user/:_id/person', isAuth, guard.check([['user-person:read'], ['user']]), UserCtrl.getUserPerson)

export default api
