const express = require('express').Router
const router = express()

const {
  account,
  addBalance,
  list
} = require('../controllers/accountController')

const { authOnly } = require('../middlewares/authOnly')

router.post('/account', account)
router.get('/account/list', list)
router.get('/account/list:id', list)

// abaixo dessa linha vai precisar de
// autenticação jwt para usar a rota
router.use(authOnly)
router.put('/account/add-balance', addBalance)

module.exports = app => app.use(router)
