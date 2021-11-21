const mongoose = require('../mongoose')

const { Schema, model } = mongoose

const AccountSchema = new Schema({
  balance: {
    type: Number,
    default: 0,
  },
  paymentKey: {
    type: String,
    required: true,
    unique: true,
  },
  numberAccount: {
    type: String,
    required: true,
    unique: true,
  },
  extract: {
    type: Array,
    default: 'Not exist extract!',
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client', // Nome do model referenciado
  },
})

const Account = model('Account', AccountSchema)

module.exports = Account
