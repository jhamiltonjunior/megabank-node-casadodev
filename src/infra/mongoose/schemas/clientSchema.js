const mongoose = require('../mongoose')
const bcrypt = require('bcryptjs')

const { now } = require('../../../utils/date')

const { Schema, model } = mongoose

const ClientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  cpf: {
    type: Number,
    required: true,
    unique: true,
  },
  createdAt: {
    type: String,
    default: now,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
  },
})

// pre'('save') = antes de salvar
ClientSchema.pre('save', async function (next) {
  // o bcrypt retorna uma promise
  // então async await nele
  const hash = await bcrypt.hash(this.password, 10)

  this.password = hash

  next()
})

const Client = model('Client', ClientSchema)

module.exports = Client
