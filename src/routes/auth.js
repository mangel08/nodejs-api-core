/* Global Imports */
import express from 'express'
import { AuthCtrl } from '../controllers'

/* Config Vars */
const api = express.Router()

/* * * * * * * Config Routes of User with Express Router * * + * * * * * * * * * * * * */
/* 1: Route string
*  2: Middleware to verified de JWT
*  3: Middelware to validate the permissions in JWT
*  4: Called of function of controller for this route
*/
api.post('/auth/register', AuthCtrl.register)
api.post('/auth/login', AuthCtrl.login)

export default api
