'use strict'

/* Global Imports */
import Debug from 'debug'
import { Person } from '../models'

/* Config vars */
const debug = new Debug('nodejs-api-core:db-api:person')

export default {

  create: async (objectPerson) => {
    debug('Create Person')
    const person = new Person(objectPerson)
    return await person.save()
  },

  findById: async (_id) => {
    debug('FindById Person')
    const person = await Person.findOne({ _id })
    return person
  },

  findAll: async () => {
    debug('FindAll Person')
    const persons = await Person.find()
    return persons
  },

  update: async (_id, objectPerson) => {
    debug('Update Person')
    const personUpdated = await Person.findByIdAndUpdate(_id, objectPerson)
    return personUpdated
  },

  delete: async (_id) => {
    debug('Delete Person')
    const personDeleted = await Person.findOneAndDelete(_id)
    return personDeleted
  }

}