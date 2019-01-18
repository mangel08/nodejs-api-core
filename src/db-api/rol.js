'use strict'

/* Global Imports */
import Debug from 'debug'
import { Rol } from '../models'

/* Config vars */
const debug = new Debug('nodejs-api-core:db-api:person')

export default {

  create: async (objectRol) => {
    debug('Create Rol')
    const rol = new Rol(objectRol)
    return await rol.save()
  },

  findById: async (_id) => {
    debug('FindById Rol')
    const rol = await Rol.findOne({_id})
    return rol
  },

  findAll: async () => {
    debug('FindAll Rol')
    const rol = await Rol.find()
    return rol
  },

  update: async (_id, objectRol) => {
    debug('Update Rol')
    const rol = await Rol.findByIdAndUpdate(_id, objectRol)
    return rol
  },

  delete: async (_id) => {
    debug('Delete Rol')
    const rol = await Rol.findOneAndDelete(_id)
    return rol
  }

}