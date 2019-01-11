const jwt = require('jsonwebtoken')
const Config = require('../lib/config')

module.exports = async (ctx, next) => {
  const authorization = ctx.get('Authorization')
  if (!authorization) {
    ctx.body = {
      code: 401,
      msg: 'invalid token',
    }
    return
  }
  try {
    await jwt.verify(authorization, Config.jwtSecret)
  } catch (err) {
    ctx.body = {
      code: 401,
      msg: 'invalid token',
    }
    return
  }

  await next()
}
