'use strict'

import moongose from 'mongoose'
const Schema = moongose.Schema
const ACTIVE = 1

const RolSchema = new Schema({
  rol: { type: String, trim: true, required: true },
  permissions: { type: [String], trim: true, required: true },
  status: { type: Number }
})

RolSchema.pre('save', function (next) {
  let rol = this
  rol.status = ACTIVE
  next()
})

export default moongose.model('Rol', RolSchema, 'rol')
