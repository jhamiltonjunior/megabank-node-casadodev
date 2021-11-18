const Client = require('../../infra/mongoose/schemas/clientSchema')

exports.authOnly = async (req, res) => {
  const { _id } = req.body

  if (!await Client.findOne({ _id })) {
    res.status(400).send({
      message: 'ops!'
    })
  }
}
