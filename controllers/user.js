const jwt = require('jsonwebtoken')
const Config = require('../lib/config')
const UserMethod = require('../models/userMethod')

/**
 * 登录
 */
exports.login = async (ctx) => {
  const { name } = ctx.request.body

  const user = await UserMethod.findOneByName(name)

  if (!user) {
    ctx.body = {
      code: 0,
      msg: '用户不存在',
    }
    return
  }

  const token = jwt.sign({ name }, Config.jwt.secret, {
    expiresIn: Config.jwt.expiresIn,
  })

  ctx.body = {
    code: 1,
    token,
  }
}

/**
 * 注册
 */
exports.signin = async (ctx) => {
  console.log(ctx.request.body)
  const { name, pwd } = ctx.request.body

  const user = await UserMethod.findOneByName(name)

  if (user) {
    ctx.body = {
      code: 0,
      msg: '用户已存在',
    }
    return
  }

  const newuser = await UserMethod.createAndSave({
    name,
    password: pwd,
  })

  const token = jwt.sign({ name: newuser.name }, Config.jwt.secret, {
    expiresIn: '60s',
  })

  ctx.body = {
    code: 1,
    token,
  }
}
