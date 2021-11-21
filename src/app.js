import express, { json } from 'express'
// const cors = require('cors')

import { now } from './utils/date'

const app = express()

// app.use(cors())

app.use(json())

require('./interfaces/routes/index')(app)

app.listen(5000, () => {
  console.log('OK!', now.replace('às', ''))
})
