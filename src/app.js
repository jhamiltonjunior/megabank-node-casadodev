const express = require('express')
// const cors = require('cors')

const { now } = require('./utils/date')

const app = express()

// app.use(cors())

app.use(express.json())

require('./interfaces/routes/index')(app)

app.listen(5000, () => {
  console.log('OK!', now.replace('Às', ''))
})
