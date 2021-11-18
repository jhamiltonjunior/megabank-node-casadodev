const express = require('express').Router
const router = express()

const {
  account,
  addBalance,
  list
} = require('../controllers/accountController')

const { authOnly } = require('../middlewares/authOnly')

router.post('/account', account)
router.put('/account/add-balance', authOnly, addBalance)
router.get('/account/list', list)
router.get('/account/list:id', list)

module.exports = app => app.use(router)
