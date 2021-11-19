import express, { json } from 'express'
// const cors = require('cors')
// const clientRouter = require('./interfaces/routes/clientRoute')
// const accountRouter = require('./interfaces/routes/accountRoute')

const app = express()

// app.use(cors())

app.use(json())

// app.use(clientRouter)
// app.use(accountRouter)

require('./interfaces/routes/index')(app)

const now = new Date()

const showHours = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`

app.listen(5000, () => {
  console.log('OK!', showHours)
})
