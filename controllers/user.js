'use strict'

/* Global Imports */
import { dbUser } from '../db-api/'
import { Success, Error } from '../util'
import Debug from 'debug'

/* Config Vars */
const debug = new Debug('nodejs-api-core:controllers:user')

/* * * * * * * * * *  Controlller Functions * * * * * * * * * * * */

const getUsers = async (req, res) => {

  try{
    const users = await dbUser.findAll()
    if (!users) return Error({ message: 'Users not found', status: 404}, res)
    Success(res, { data: users, model: 'users' })
  } catch (error) {
    Error(error, res)        
  }

}

const getUser = async (req, res) =>  {

  try {
    const { _id } = req.params
    debug('getUser')
    const user = await dbUser.findById(_id)
    if (!user) return Error({ message: 'User not found', status: 404}, res)
    Success(res, { data: user, model: 'user' })
  } catch (error) {
    Error(error, res)
  }

}

const updateUser = async (req, res) => {
  
  try{
    const { _id } = req.params
    const objectUser = req.body
    debug('updateUser')
    const userUpdate = await dbUser.update(_id, objectUser)
    const user = await dbUser.findById(userUpdate._id)
    Success(res, { data: user, model: 'user'})
  } catch (error) {
    Error(error, res) 
  }

}

const deleteUser = async (req, res) => {

  const { _id } = req.params

  try {
    debug('deleteUser')
    await dbUser.delete(_id)
    Success(res)
  } catch (error) {
    Error(error, res) 
  }

}

const getUserPerson = async (req, res) => {

  const { _id } = req.params

  try {
    debug('getUserPerson')
    const userPerson = await dbUser.findUserPerson(_id)
    if (!userPerson) return Error({ message: 'User not found', status: 404}, res)
    Success(res, { data: userPerson, model: 'user' })
  } catch (error) {
    Error(error, res)
  }

}

const getAllUserPerson = async (req, res) => {

  try {
    debug('getAllUserPerson')
    const listUserPerson = await dbUser.listUserPerson()
    if (!listUserPerson) return Error({ message: 'Users not found', status: 404}, res)
    Success(res, { data: listUserPerson, model: 'user' })
  } catch (error) {
    Error(error, res)
  }

}

export default {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserPerson,
  getAllUserPerson
}
