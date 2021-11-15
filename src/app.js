const express = require('express')
// const cors = require('cors')
const router = require('./interface/routes/clientRoute')

const app = express()

// app.use(cors())

app.use(express.json())

app.use(router)

app.listen(5000, () => {
  console.log('OK!', Date())
})
