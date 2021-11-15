const Account = require('../../infra/mongoose/schemas/accountSchema')

exports.account = async (req, res) => {
  // const { balance, extract, client } = req.body
  try {
    const account = await Account.create(req.body)

    res.json(account)
  } catch (err) {
    res.send({ err })
  }
}

exports.list = async (req, res) => {
  // const { balance, extract, client } = req.body
  try {
    // o parâmetro de populate é nome do atributo relacionado
    const list = await Account.find().populate('client')

    res.json(list)
  } catch (err) {
    res.send({ err })
  }
}
