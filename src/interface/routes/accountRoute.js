const express = require('express').Router
const router = express()

const { account, list } = require('../controllers/accountController')

router.post('/account', account)
router.get('/account/list', list)

module.exports = router
