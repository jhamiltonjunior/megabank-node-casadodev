const express = require('express')

const router = express.Router()

const {
  clientRegister,
  clientAuth,
  list
} = require('../controllers/clientController')

router.post('/client/register', clientRegister)
router.post('/client/auth', clientAuth)
router.get('/client/list', list)

module.exports = app => app.use(router)
