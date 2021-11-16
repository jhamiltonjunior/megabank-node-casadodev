const express = require('express')

const router = express.Router()

const { clientRegister, clientAuth, list } = require('../controllers/clientController')
// const { account } = require('../controllers/accountController')

// account é adicionado no final para que ele
router.post('/client/register', clientRegister)
router.post('/client/auth', clientAuth)
router.get('/client/list', list)

module.exports = router
