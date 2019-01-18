'use strict'

/* Global Imports */
import jwt from 'jwt-simple'
import moment from 'moment'
import dotenv from 'dotenv'

/* Config vars */
dotenv.config()

/* Methods of services */

const createToken = (user) => {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(100, 'days').unix(),
    permissions: user.rol.permissions,
  }
  console.log(payload)
  return jwt.encode(payload, process.env.SECRET_TOKEN, 'HS256', { typ: 'JWT' })
}

const decodeToken = (token) => {
  const decoded = new Promise(async (resolve, reject) => {
    try {
      const payload = await jwt.decode(token, process.env.SECRET_TOKEN)

      if (payload.exp < moment().unix()) {
        reject({ status: 401, message: 'The token has expired', error: 'Token Expired' })
      }
      resolve(payload)
    } catch (err) {
      reject({ status: 500, message: 'Invalid Token', error: err })
    }
  })
  return decoded
}

export {
  createToken,
  decodeToken
}
