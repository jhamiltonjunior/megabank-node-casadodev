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

exports.addBalance = async (req, res) => {
  try {
    const { addBalance } = req.body

    const getBalance = await Account.findOne(req.params.id).populate('client')

    const newBalance = addBalance + getBalance.balance

    await Account.updateOne(req.body.id, { balance: newBalance })

    res.send({ getBalance, message: `Você depositou R$${addBalance} reais` })
  } catch (err) {
    res.status(400).send({ error: err })
  }
}

exports.removeBalance = async (req, res) => {
  try {
    const { withdraw } = req.body

    const getBalance = await Account.findOne(req.params.id).populate('client')

    if (getBalance.balance === 0) {
      res
        .status(403)
        .send({ message: 'Você não pode efetuar um saque, conta zerada!' })
    }

    if (getBalance.balance < withdraw) {
      res
        .status(403)
        .send({ message: 'Você não pode efetuar um saque desse tamanho!' })
    }

    const newBalance = getBalance.balance - withdraw

    await Account.updateOne(req.body.id, { balance: newBalance })

    res.send({
      getBalance,
      message: `
    Você sacou R$${withdraw} reais ${getBalance.balance}
    `,
    })
  } catch (err) {
    res.status(400).send({ erro: err })
  }
}

// vou enviar do jose para o hamilton

exports.sendMoney = async (req, res) => {
  const { email, paymentKey } = req.body

  // , sendMoney

  if (!(await Account.findOne({ email })))
    res.status(400).send('Este email não existe!')

  const account = await Account.findOne(req.params.id).populate('client')
  const whatRepient = await Account.findOne({ paymentKey })

  res.json({ account, whatRepient, balance: whatRepient.balance })
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
