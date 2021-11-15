const Client = require('../../infra/mongoose/schemas/clientSchema')

exports.client = async (req, res) => {
  try {
    const { email, cpf, createNumberAccount } = req.body

    if (await Client.findOne({ email })) {
      res.status(400).send({ message: 'erro autenticar o email! D:' })
    }

    if (await Client.findOne({ cpf })) {
      res.status(400).send({ message: 'erro ao autenticar o CPF! D:' })
    }

    // Lógica para não cria numeros duplicas
    if (await Client.findOne({ createNumberAccount })) {
      res.status(400).send({ message: 'erro ao autenticar o numero! D:' })
    }

    const client = await Client.create(req.body)

    res.send({ client, message: 'User Criado com Sucesso! :D' }).end()
  } catch (err) {
    res.send({ err })
  }
}
