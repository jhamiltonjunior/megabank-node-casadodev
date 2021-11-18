const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const Client = require('../../infra/mongoose/schemas/clientSchema')
const Account = require('../../infra/mongoose/schemas/accountSchema')

const generateToken = (params = {}) => {
  const ONE_DAY = 86400

  const privateKey = process.env.PRIVATEKEY

  const token = jwt.sign(params, privateKey, {
    expiresIn: ONE_DAY
  })

  return token
}

exports.clientRegister = async (req, res) => {
  try {
    const { _id, email, cpf, createNumberAccount } = req.body

    if (await Client.findOne({ email })) {
      req.body = 0
      res.status(400).send({ message: 'erro autenticar o email! D:' })
    }

    if (await Client.findOne({ cpf })) {
      req.body = 0
      res.status(400).send({ message: 'erro ao autenticar o CPF! D:' })
    }

    // Lógica para não cria numeros duplicas
    if (await Client.findOne({ createNumberAccount })) {
      res.status(400).send({ message: 'erro ao autenticar o numero da conta! D:' })
      return
    }

    const client = await Client.create(req.body)

    // para já criar o Account e vincular ao client dinâmicamente
    const createAccount = await Account.create({
      client: await Client.findOne(_id)
    })

    client.password = undefined

    res.status(201).json({
      createAccount,
      token: generateToken({ id: _id })
    })
  } catch (err) {
    res.send({ err: err })
  }
}

exports.clientAuth = async (req, res) => {
  try {
    const { cpf, password } = req.body

    const client = await Client.findOne({ cpf }).select('+password')

    if (!client) {
      res.status(400).send({ message: 'Vixe!!! Deu erro no email D:' })
    }

    if (!await bcrypt.compare(password, client.password)) {
      res.status(400).send({
        message: 'Vixe!!! Deu erro na senha D:'
      })
    }

    client.password = undefined

    res.send({
      client,
      token: generateToken({ id: client._id })
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
