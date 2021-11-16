const Client = require('../../infra/mongoose/schemas/clientSchema')
const Account = require('../../infra/mongoose/schemas/accountSchema')

const { generateNumber } = require('./utils/createNumberAccount')

exports.client = async (req, res) => {
  try {
    const { _id, email, cpf, createNumberAccount } = req.body

    if (await Client.findOne({ email })) {
      res.status(400).send({ message: 'erro autenticar o email! D:' })
    }

    if (await Client.findOne({ cpf })) {
      res.status(400).send({ message: 'erro ao autenticar o CPF! D:' })
    }

    // Lógica para não cria numeros duplicas
    if (await Client.findOne({ createNumberAccount })) {
      await Client.create({
        createNumberAccount: generateNumber()
      })
    }

    const createClient = await Client.create({
      req: req.body,
      createNumberAccount: generateNumber()
    })

    // para já criar o Account e vincular ao client dinâmicamente
    const createAccount = await Account.create({
      client: await Client.findOne(_id)
    })

    res.json({
      createClient,
      createAccount
    })
  } catch (err) {
    res.send({ err: err })
  }
}

exports.list = async (req, res) => {
  try {
    const list = await Client.find()

    res.send({ list }).end()
  } catch (err) {
    res.send({ err })
  }
}
