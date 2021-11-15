const mongoose = require('../mongoose')
// const bcrypt = require('bcrypt')

const { generateNumber } = require('./utils/createNumberAccount')

const { Schema, model } = mongoose

const ClientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  cpf: {
    type: Number,
    required: true,
    unique: true
  },
  created: {
    type: Date,
    default: Date.now,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  createNumberAccount: {
    type: String,
    default: generateNumber(),
    required: true,
    unique: true
  }
})

// pre'('save') = antes de salvar
// ClientSchema.pre('save', function (next) {
//   const hash = bcrypt.hash(this.password, 10)

//   this.password = hash

//   next()
// })

const Client = model('Client', ClientSchema)

module.exports = Client
