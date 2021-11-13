const Client = require('../../infra/mongoose/schemas/clientSchema')

exports.client = async (req, res) => {
  try {
    const client = await Client.create(req.body)

    res.json(client)
  } catch (err) {
    res.send(err)
  }
}
