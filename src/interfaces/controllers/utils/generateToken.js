const jwt = require('jsonwebtoken')

exports.generateToken = (params = {}) => {
  const ONE_DAY = 86400

  const privateKey = process.env.PRIVATEKEY

  const token = jwt.sign(params, privateKey, {
    expiresIn: ONE_DAY,
  })

  return token
}
