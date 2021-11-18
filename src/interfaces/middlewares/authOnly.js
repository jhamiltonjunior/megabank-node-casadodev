const jwt = require('jsonwebtoken')
require('dotenv').config()

const privateKey = process.env.PRIVATEKEY

exports.authOnly = async (req, res, next) => {
  const authHeaders = req.headers.authorization
  const client = req.client

  if (!authHeaders) {
    res.status(401).send({ message: 'No token provided' })
  }

  const parts = authHeaders.split(' ')

  if (parts.length !== 2) {
    res.status(401).send({ message: 'Token error' })
  }

  const [schema, token] = parts

  if (!/^Bearer$/i.test(schema)) {
    res.status(401).send({ message: 'Token malformatted' })
  }

  jwt.verify(token, privateKey, (err, decoded) => {
    if (err) {
      res.status(401).send({ message: 'erro ao autenticar o token!' })
    }

    client._id = decoded.id

    return next()
  })
}
