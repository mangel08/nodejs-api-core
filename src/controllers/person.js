'use strict'

/* Global Imports */
import { dbPerson } from '../db-api'
import { Error, Success } from '../util'
import Debug from 'debug'

/* Config Vars */
const debug = new Debug('nodejs-api-core:controllers:user')

const getPerson = async (req, res) => {

  try {
    let { _id } = req.params
    const person = await dbPerson.findById(_id)

    if (!person) return Error({ message: 'Person not found', status: 404}, res)

    Success(res, { data: person, model: 'person'})
    
  } catch (error) {
    Error(error, res)
  }

}

const getPersons = async (req, res) => {
  
  try {

    const persons = await dbPerson.findAll()
    if (!persons) return Error({ message: 'Persons not found', status: 404}, res)
    Success(res, { data: persons, model: 'persons'})

  } catch (error) {
    Error(error, res)
  }

}

const savePerson = async (req, res) => {

  try {
    const objectPerson = req.body
    const person = await dbPerson.create(objectPerson)
    Success(res, { data: person, model: 'person'}, 201)
  } catch(error) {
    Error(error, res)
  }
  
}

const updatePerson = async (req, res) => {

  try {
    const { _id } = req.params
    const objectPerson = req.body
    const personUpdate = await dbPerson.update(_id, objectPerson)
    const person = await dbPerson.findById(_id)
    Success(res, { data: person, model: 'person'})
  } catch (error) {
    Error(error, res)
  }

}

const deletePerson = async (req, res) => {

  try{
    const _id = req.params._id
    await dbPerson.delete(_id)
    Success(res)
  } catch(error) {
    Error(error, res)
  }

}

export default {
  savePerson,
  getPerson,
  getPersons,
  updatePerson,
  deletePerson
}
