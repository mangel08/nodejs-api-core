'use strict'

import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ACTIVE = 1
// mongoose.set('debug', true)

// Schema del modelo Persona con Moongose
const PersonSchema = new Schema({
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  phone: { type: String, trim: true },
  gender: { type: String, enum: ['M', 'F'] },
  status: { type: Number }
})

PersonSchema.pre('save', function (next) {
  let persona = this
  persona.status = ACTIVE
  next()
})

export default mongoose.model('Person', PersonSchema, 'person')
