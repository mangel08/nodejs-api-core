'use strict'

/*Global imports */
import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt-nodejs'
import dotenv from 'dotenv'

/* Config Vars */
dotenv.config()

/* VARS & CONST */
const ACTIVE = 1
const { ObjectId } = Schema.Types

// mongoose.set('debug', true)
// Schema del modelo Usuario con Moongose
const UserSchema = new Schema({
  email: { type: String, lowercase: true, trim: true, required: true, unique: true, index: { unique: true } },
  password: { type: String, required: true, select: false },
  username: { type: String, required: true, unique: true , index: true },
  createdAt: { type: Date, default: Date.now(), select: false },
  updatedAt: { type: Date, default: Date.now(), select: false },
  person: { type: ObjectId, ref: 'Person' },
  rol: { type: ObjectId, ref: 'Rol' },
  status: { type: Number }
})

// Add the unique validator email from mongoose library
UserSchema.plugin(uniqueValidator)

// Función que se ejecuta antes de guardar el usuario
// Genera el cifrado del password
UserSchema.pre('save', function (next) {
  let user = this
  user.status = ACTIVE
  user.rol = process.env.DEFAULT_ROL //The Default Rol of user
  if (!user.isModified('password')) return next()

  // Metodo para generar el cifrado del password y reemplazarlo
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next()

    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

// Metodo del modelo usuario para comparar el password
UserSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return callback(err)
    callback(null, isMatch)
  })
}

export default mongoose.model('User', UserSchema, 'user')
