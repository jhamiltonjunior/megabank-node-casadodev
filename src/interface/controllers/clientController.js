const Client = require('../../infra/mongoose/schemas/clientSchema')

exports.client = async (req, res) => {
  try {
    const { email, cpf, numberAccount } = req.body

    if (await Client.findOne({ email })) {
      res.status(400).send({ message: 'erro autenticar o email! D:' })
    }

    if (await Client.findOne({ cpf })) {
      res.status(400).send({ message: 'erro ao autenticar o CPF! D:' })
    }

    const client = await Client.create(req.body)

    res.json(client).send({ message: 'User Criado com Sucesso! :D' })
  } catch (err) {
    res.send(err)
  }
}
