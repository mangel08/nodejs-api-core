'use strict'

// Global Imports
import express from 'express'
import { RolCtrl } from '../controllers'
import { isAuth } from '../middlewares'

// Config Vars
const guard = require('express-jwt-permissions')()
const api = express.Router()

/* * * * * * * Config Routes of Rol with Express Router * * + * * * * * * * * * * * * */
/* 1: Route string
*  2: Middleware to verified de JWT
*  3: Middelware to validate the permissions in JWT
*  4: Called of function of controller for this route
*/
api.post('/rol', isAuth, guard.check('admin'), RolCtrl.saveRol)
api.get('/roles', isAuth, guard.check('admin'), RolCtrl.getRoles)
api.get('/rol/:_id', isAuth, guard.check('admin'), RolCtrl.getRol)
api.put('/rol/:_id', isAuth, guard.check('admin'), RolCtrl.updateRol)
api.delete('/rol/:_id', isAuth, guard.check('admin'), RolCtrl.deleteRol)

export default api // EXPORTO LAS RUTAS CON EL ROUTER DE EXPRESS
