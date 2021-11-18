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
    const { balance } = req.body

    const getBalance = await Account.findOne(
      req.params.id
      // req.params.balance
    )
      .populate('client')

    // const newBalance = balance + newBalance.balance

    // await Account.updateOne(
    //   req.body.id,
    //   { balance: newBalance }
    // )

    res.send({ getBalance, message: 'Cheguei na Route!' })
  } catch (err) {
    res.status(400).send({ error: err })
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
