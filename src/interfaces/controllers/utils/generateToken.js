const jwt = require('jsonwebtoken')

exports.generateToken = (params = {}) => {
  const ONE_HOUR = 3600

  const privateKey = process.env.PRIVATEKEY

  const token = jwt.sign(params, privateKey, {
    expiresIn: ONE_HOUR
  })

  return token
}
