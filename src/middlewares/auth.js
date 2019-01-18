'use strict'

import { decodeToken } from '../services'

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization
  
  if (!authorization) {
    return res.status(401).send({ status: 0, message: 'You don\'t have authorization' })
  }

  const token = authorization.split(' ')[1]

  decodeToken(token)
    .then(response => {
      req.user = response
      next()
    })
    .catch(response => {
      res.status(response.status)
    })
}

export default isAuth
