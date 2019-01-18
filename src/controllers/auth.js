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
    debug('Register')
    const params = req.body
    const findUser = await dbUser.findByEmail(params.email)

    if (findUser) {
      return handleRegisterFailed(res, 'This email already exist')
    } else {
      let objectPerson = params.person

      const person = await dbPerson.create(objectPerson)
      const objectUser = await generateUser(params, person._id)
      const userSaved = await dbUser.create(objectUser)
      const user = await dbUser.findUserPersonRol(userSaved.email)
      const token = await createToken(user)
      const response = generateResponse(user, user.person, token)

      Success(res, { data: response, model: 'user' }, 201)
    }
  } catch (error) {
    Error(error, res)
  }
}

const login = async (req, res) => {
  try {
    debug('Login')
    const { identity, password } = req.body
    const user = await dbUser.findUserPersonRol(identity)
    if (!user) {
      // validation if the email of user doesn't exist
      return handleLoginFailed(res)
    } else {
      /* Calling method of model user to compare password */
      await user.comparePassword(password, function (error, match) {
        if (error) Error(error, res)
        else if (match) {
          const token = createToken(user)
          const response = generateResponse(user, user.person, token)
          Success(res, { data: response, model: 'user' }, 200)
        } else {
          return handleLoginFailed(res, 'The username and password is invalid.')
        }
      })
    }
  } catch (error) {
    Error(error, res)
  }
}

/* Function to handle Errors in Login */
function handleLoginFailed (res, message) {
  console.error(message || 'The user with email doesn\'t exist')
  res.status(401).send({
    message: message || 'The user with email doesn\'t exist',
    error: 'Login failed'
  })
}

function handleRegisterFailed (res, message) {
  console.error(message || 'This email already exist')
  res.status(409).send({
    message: message || 'This email already exist',
    error: 'Register Failed'
  })
}

/* Function to generate the response object
* params:
* 1) User Object
* 2) Person Object
* 3) JWT token
*/
function generateResponse (user, person, token) {
  const response = {
    _id: user._id,
    email: user.email,
    username: user.username,
    person: {
      firstName: person.firstName,
      lastName: person.lastName
    },
    token
  }

  return response
}

/* Function to generate the objectUser
* params:
* 1) Object user
* 2) personId
*/
function generateUser (user, personId) {
  let objectUser = {
    email: user.email,
    username: user.username,
    password: user.password,
    person: personId
  }

  if (user.social && user.socialId) {
    objectUser.social = user.social
    objectUser.socialId = user.socialId
  }

  return objectUser
}

export default {
  register,
  login
}
