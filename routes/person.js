import express from 'express'
import { PersonCtrl } from '../controllers'
// import isAuth  from '../middlewares/auth'
import { isAuth } from '../middlewares'
const guard = require('express-jwt-permissions')()
// import guard from "express-jwt-permissions"

/* Variables de configuracion */
// guard()
const api = express.Router()
/** **** END POINTS DE PERSONA *****/
api.post('/person', isAuth, guard.check([ ['person'], ['person:create'] ]), PersonCtrl.savePerson)
api.get('/persons', isAuth, guard.check([ ['person'], ['person:all'] ]), PersonCtrl.getPersons)
api.get('/person/:_id', isAuth, guard.check([ ['person'], ['person:read'] ]), PersonCtrl.getPerson)
api.put('/person/:_id', isAuth, guard.check([ ['person'], ['person:update'] ]), PersonCtrl.updatePerson)
api.delete('/person/:_id', isAuth, guard.check([ ['person'], ['person:delete'] ]), PersonCtrl.deletePerson)

export default api
