'use strict'

/* Global Imports */
import Debug from 'debug'
import { User } from '../models'

/* Config vars */
const debug = new Debug('nodejs-api-core:db-api:user')

export default {

  findAll: () => {
    debug('findAll User')
    const users = User.find()
    return users
  },

  findById: (_id) => {
    debug('findByID User')
    const user = User.findOne({ _id, status: User.ACTIVE })
    return user
  },

  create: (objectUser) => {
    debug('Create User')
    const user = new User(objectUser)
    return user.save()
  },

  update: (_id, user) => {
    debug('Update User')
    const userUpdated = User.findByIdAndUpdate(_id, user, { new: true })
    return userUpdated
  },

  delete: (_id) => {
    debug('Delete User')
    const userDeleted = User.findOneAndDelete({ _id })
    return userDeleted
  },

  findUserPerson: (_id) => {
    debug('findUserPerson')
    const user = User.findOne({ _id })
      .populate({
        path: 'person',
        model: 'Person'
      })
    return user
  },

  listUserPerson: () => {
    debug('listUserPerson')
    const users = User.find({})
      .populate('rol')
      .populate({
        path: 'person',
        model: 'Person'
      })
    return users
  },

  /* Find user by Email */
  findByEmail: (email) => {
    debug('findUserByEmailAndUsername')
    const user = User.findOne({ email })
    return user
  },

  /* Find user with Rol by Email or Username */
  findUserPersonRol: (identity) => {
    debug('findUserPersonRol')
    const user = User.findOne({ email: identity }).select('_id email password username person rol')
      .populate('rol')
      .populate({
        path: 'person',
        model: 'Person'
      })
    return user
  }
}
