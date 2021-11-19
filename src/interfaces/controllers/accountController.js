// const Client = require('../../infra/mongoose/schemas/clientSchema')
const Account = require('../../infra/mongoose/schemas/accountSchema')

// Here I join client with the account

exports.account = async (req, res) => {
  try {
    // isso não é mais necessário
    // já que account é criada dinâmicamente
    // juntamente com o client
    const account = await Account.create(req.body)

    res.send({ account })
  } catch (err) {
    res.send({ err })
  }
}
// 6196cc6ac460d93c9b235aef
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzcyNzM2MzYsImV4cCI6MTYzNzM2MDAzNn0.0oMOu9fUIhAiiop-2Ubg1_8HHAPS-yzfUWfjDJZ-kD8
exports.addBalance = async (req, res) => {
  try {
    const { addBalance } = req.body

    const getBalance = await Account.findOne(req.params.id)
      .populate('client')

    const newBalance = addBalance + getBalance.balance

    await Account.updateOne(
      req.body.id,
      { balance: newBalance }
    )

    res.send({ getBalance, message: `Você depositou R$${addBalance} reais` })
  } catch (err) {
    res.status(400).send({ error: err })
  }
}

exports.removeBalance = async (req, res) => {
  try {
    const { withdraw } = req.body

    const getBalance = await Account.findOne(req.params.id)
      .populate('client')

    if (getBalance.balance === 0) {
      res.status(400).send({ message: 'Você não pode efetuar um saque, conta zerado!' })
    }

    if (getBalance.balance < withdraw) {
      res.status(400).send({ message: 'Você não pode efetuar um saque desse tamanho!' })
    }

    const newBalance = getBalance.balance - withdraw

    await Account.updateOne(
      req.body.id,
      { balance: newBalance }
    )

    res.send({
      getBalance,
      message: `
    Você sacou R$${withdraw} reais ${getBalance.balance}
    `
    })
  } catch (err) {
    res.status(400).send({ erro: err })
  }
}

exports.list = async (req, res) => {
  try {
    // o parâmetro de populate é nome do atributo relacionado
    const list = await Account.find().populate('client')

    res.json(list)
  } catch (err) {
    res.send({ err })
  }
}
