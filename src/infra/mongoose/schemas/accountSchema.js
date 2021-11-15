const mongoose = require('../mongoose')

const { Schema, model } = mongoose

const AccountSchema = new Schema({
  balance: {
    type: Number,
    default: 0
  },
  extract: {
    type: String,
    default: 'Not exist extract!'
  },
  client: {
    type: mongoose.ObjectId,
    ref: 'Client', // Nome do model referenciado
    required: true
  }
})

const Account = model('Account', AccountSchema)

module.exports = Account
