const express = require('express').Router
const router = express()

const {
  account,
  addBalance,
  removeBalance,
  sendMoney,
  generateExtract,
  list
} = require('../controllers/accountController')

const { authOnly } = require('../middlewares/authOnly')

router.post('/account', account)
router.get('/account/list', list)
router.get('/account/list:id', list)

// abaixo dessa linha vai precisar de
// autenticação jwt para acessar a rota
router.put('/account/add-balance', authOnly, addBalance)
router.put('/account/remove-balance', authOnly, removeBalance)
router.put('/account/send-money', authOnly, sendMoney)
router.get('/account/view-extract', authOnly, generateExtract)

module.exports = (app) => app.use(router)
