const express = require('express')

const router = express.Router()

const { client, list } = require('../controllers/clientController')
// const { account } = require('../controllers/accountController')

// account é adicionado no final para que ele
router.post('/client', client)
router.get('/client/list', list)

module.exports = router
