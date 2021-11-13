const mongoose = require('mongoose')

require('dotenv').config()

const DATABASE = process.env.CONNECTIONDB

mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

module.exports = mongoose
