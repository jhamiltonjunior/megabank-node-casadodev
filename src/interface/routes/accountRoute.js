const express = require('express').Router
const router = express()

const { account, list } = require('../controllers/accountController')

router.post('/account', account)
router.get('/account/list', list)
router.get('/account/list:id', list)

module.exports = router
