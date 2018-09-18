'use strict'

import { dbRol } from '../db-api/'
import { Error, Success } from '../util/'

const getRol = async (req, res) => {

  try {
    const { _id } = req.params
    const rol = await dbRol.findById(_id)
    if (!rol) return Error({ message: 'Rol not found', status: 404}, res)
    Success(res, { data: rol, model: 'rol'})

  } catch (error) {
    Error(error, res)
  }
  
}

const getRoles = async (req, res) => {
  
  try {
    const roles = await dbRol.findAll()
    if (!roles) return Error({ message: 'Roles not found', status: 404}, res)
    Success(res, { data: roles, model: 'rol'})
  } catch (error) {
    Error(error, res)
  }
}

const saveRol = async (req, res) => {

  try {
    const objectRol = req.body
    const rol = await dbRol.create(objectRol)
    Success(res, { data: rol, model: 'rol' }, 201)
  } catch (error) {
    Error(error, res)
  }
}

const updateRol = async (req, res) => {

  try {
    const { _id } = req.params
    const objectRol = req.body
    const rolUpdate = await dbRol.update(_id, objectRol)
    const rol = await dbRol.findById(rolUpdate._id)
    Success(res, { data: rol, model: 'rol'})
  } catch (error) {
    Error(error, res)
  }

}

const deleteRol = async (req, res) => {

  try {
    const { _id } = req.params
    await dbRol.delete(_id)
    Success(res)
  } catch (error) {
    Error(error, res)
  }
}

export default {
  getRol,
  getRoles,
  saveRol,
  updateRol,
  deleteRol
}
