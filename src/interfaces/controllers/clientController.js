const bcrypt = require('bcryptjs')
require('dotenv').config()

const Client = require('../../infra/mongoose/schemas/clientSchema')
const Account = require('../../infra/mongoose/schemas/accountSchema')

const { generateToken } = require('./utils/generateToken')
const { paymentKey } = require('./utils/paymentKey')
const { generateNumber } = require('./utils/createNumberAccount')

exports.clientRegister = async (req, res) => {
  try {
    const { _id, email, cpf, numberAccount } = req.body

    if (await Client.findOne({ email })) {
      res.status(400).send({ message: 'erro autenticar o email! D:' })
    }

    if (await Client.findOne({ cpf })) {
      res.status(400).send({ message: 'erro ao autenticar o CPF! D:' })
    }

    // Lógica para não cria numeros duplicas
    if (await Account.findOne({ numberAccount })) {
      res
        .status(400)
        .send({ message: 'erro ao autenticar o numero da conta! D:' })
      return
    }

    if (await Account.findOne({ paymentKey })) {
      res.status(400).send({ message: 'erro ao autenticar a chave Pix! D:' })
      return
    }

    const client = await Client.create(req.body)

    // para já criar o Account e vincular ao client dinâmicamente
    const createAccount = await Account.create({
      client: client.id,
      paymentKey: paymentKey(),
      numberAccount: generateNumber(),
    })

    client.password = undefined

    res.status(201).json({
      createAccount,
      client,
      Id: client.id,
      token: generateToken({ id: _id }),
    })
  } catch (err) {
    res.send({ err })
  }
}

exports.clientAuth = async (req, res) => {
  try {
    const { cpf, password } = req.body

    const client = await Client.findOne({ cpf }).select('+password')

    if (!client) {
      res.status(400).send({ message: 'Vixe!!! Deu erro no email D:' })
    }

    if (!(await bcrypt.compare(password, client.password))) {
      res.status(400).send({
        message: 'Vixe!!! Deu erro na senha D:',
      })
    }

    client.password = undefined

    res.send({
      client,
      token: generateToken({ id: client._id }),
    })
  } catch (err) {
    res.send({ err: err })
  }
}

exports.list = async (req, res) => {
  try {
    const list = await Client.find()

    list.cpf = undefined

    res.send({ list }).end()
  } catch (err) {
    res.send({ err })
  }
}
