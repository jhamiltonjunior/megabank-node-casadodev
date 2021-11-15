const express = require('express')
// const cors = require('cors')
const clientRouter = require('./interface/routes/clientRoute')
const accountRouter = require('./interface/routes/accountRoute')

const app = express()

// app.use(cors())

app.use(express.json())

app.use(clientRouter)
app.use(accountRouter)

app.listen(5000, () => {
  console.log('OK!', Date())
})
