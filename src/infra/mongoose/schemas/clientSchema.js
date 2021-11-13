const mongoose = require('../mongoose')

const { Schema, model } = mongoose

const clientSchema = new Schema({
  name: String,
  CPF: Number
})

const Client = model('Client', clientSchema)

module.exports = Client
