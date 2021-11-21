const Client = require('../../infra/mongoose/schemas/clientSchema')
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

// vou enviar do Hamilton para o Jose

exports.sendMoney = async (req, res) => {
  const { email, paymentKey, quantyti } = req.body

  const client = await Client.findOne({ email })
  const repient = await Account.findOne({ paymentKey })

  if (!client) {
    res.status(400).send({ message: 'Este email não existe! D:' })
  }

  if (!repient) {
    res.status(400).send({ message: 'Chave incorreta! D:' })
  }

  const account = await Account.findOne(req.params.id).populate('client')

  if (account.balance === 0) {
    res
      .status(403)
      .send({ message: 'Você não pode enviar dinheiro, conta zerada!' })
  }

  if (account.balance < quantyti) {
    res.status(403).send({
      message: 'Você não pode enviar essa quantia, escolha um valor menor',
    })
  }

  if (quantyti === 0) {
    res.status(403).send({
      message: 'Envie pelo menos R$0,1',
    })
  }

  const newBalance = account.balance - quantyti
  const newRepientBalance = repient.balance + quantyti

  await Account.updateOne(req.params.id, { balance: newBalance })
  await Account.updateOne({ _id: repient.id }, { balance: newRepientBalance })

  const sendWithSuccess = `Você enviou R$${quantyti} para ${client.name}`

  res.json({
    account: account,
    sendWithSuccess,
    repient,
  })
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
