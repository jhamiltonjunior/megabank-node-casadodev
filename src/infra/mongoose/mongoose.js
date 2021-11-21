const mongoose = require('mongoose')

require('dotenv').config()

const DATABASE = process.env.CONNECTIONDB

mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// mongoose.connection.dropDatabase()
module.exports = mongoose
