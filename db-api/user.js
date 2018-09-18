'use strict'

/* Global Imports */
import Debug from 'debug'
import { User, Rol } from '../models'

/* Config vars */
const debug = new Debug('nodejs-api-core:db-api:user')

export default {

  findAll: async () => {
    debug('findAll User')
    const users = await User.find()
    return users
  },

  findById: async (_id) => {
    debug('findByID User')
    const user = await User.findOne({ _id })
    return user
  },

  create: async (objectUser) => {
    debug('Create User')
    const user = new User(objectUser)
    return await user.save()
  },

  update: async (_id, user) => {
    debug('Update User')
    const userUpdated = await User.findByIdAndUpdate(_id, user)
    return userUpdated
  },

  delete: async (_id) => {
    debug('Delete User')
    const userDeleted = await User.findOneAndDelete({ _id })
    return userDeleted
  },

  findUserPerson: async (_id) => {
    debug('findUserPerson')
    const user = await User.findOne({ _id }).populate('person')
    return user
  },

  listUserPerson: async () => {
    debug('listUserPerson')
    const users = await User.find({}).populate('person').populate('rol')
    return users
  },

  /* Find user by Email and Username */
  findUserByEU: async (email, username) => {
    debug('findUserByEmailAndUsername')
    const user = await User.findOne({$or:[ {email}, {username} ]})
    return user
  },

  /* Find user with Rol by Email and Username */
  findUserPersonRolByEU: async (identity) => {
    debug('findUserPersonRol')
    const user = await User.findOne({$or:[ {email: identity}, {username: identity} ]}).select('_id email password username person rol').populate('rol').populate('person')
    return user
  }

}