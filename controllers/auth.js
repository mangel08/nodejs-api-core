'use strict'

/* Global Imports */
import { dbUser, dbPerson } from '../db-api/'
import { Success, Error } from '../util'
import { createToken } from '../services'
import Debug from 'debug'

/* Config Vars */
const debug = new Debug('nodejs-api-core:controllers:auth')
  
const register = async (req, res) => {
 
  try {
    
    const params = req.body
    const findUser = await dbUser.findUserByEU(params.email, params.username)

    if (findUser !== null) {
      return Error({ message: 'The username or email already exist', status: 409}, res)
    } else {

      const objectPerson = {
        firstName: params.firstName,
        lastName: params.lastName,
        gender: params.gender,
        phone: params.phone,
      }

      console.log("Object Person")
      console.log(objectPerson)

      const person = await dbPerson.create(objectPerson)

      const objectUser = {
        email: params.email,
        password: params.password,
        username: params.username,
        person: person._id
      }

      console.log("Object User")
      console.log(objectUser)

      const userSaved = await dbUser.create(objectUser)
      const user = await dbUser.findUserPersonRolByEU(userSaved.email)
      console.log("User")
      console.log(user)
      const token = await createToken(user)
      const response = { 
        _id: user._id,
        username: user.username,
        email: user.email,
        firstName: person.firstName,
        lastName: person.lastName,
        token
      }

      Success(res, { data: response, model: 'user' }, 201)
    }

  } catch (error) {
    Error(error, res)
  }

}

const login = async (req, res) => {

  try {
    const { identity, password } = req.body
    const user = await dbUser.findUserPersonRolByEU(identity)

    if (!user) {
      return handleLoginFailed(res)
    } else {
      /* Calling method of model user to compare password*/
       const match = await user.comparePassword(password, function (error, match) {
        if (error) Error(error, res)
        if (match) {
          const token = createToken(user) 
          const response = { 
            _id: user._id,
            username: user.username,
            firstName: user.person.firstName,
            lastName: user.person.lastName,
            token
          }
          Success(res, { data: response, model: 'user' }, 200)
        } else {
          handleLoginFailed(res, 'The username and password is invalid.')
        }
       })
    }
  } catch (error) {
    Error(error, res)
  }
}

/* Function to handle Errors in Login*/
function handleLoginFailed(res, message) {
  res.status(401).send({
    message: 'Login failed',
    error: message || 'The username or email doens\'t exist'
  })
}

export default {
  register,
  login
}
