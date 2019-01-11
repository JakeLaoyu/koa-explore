const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const SALT_WORK_FACTOR = 10

const UserSchema = new mongoose.Schema({
  name: {
    unique: true,
    type: String,
  },
  password: String,
  role: { // 用户权限: 0 普通用户; 1 邮件激活后的用户; 10 管理员; 50 超级管理员
    type: Number,
    default: 0,
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now(),
    },
    updateAt: {
      type: Date,
      default: Date.now(),
    },
  },
})

UserSchema.pre('save', function (next) {
  const user = this
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()  //eslint-disable-line
  } else {
    this.meta.updateAt = Date.now()
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, (err1, hash) => {
      if (err1) return next(err1)

      user.password = hash
      next()
    })
  })
})

UserSchema.methods = {
  comparePassword(_password, cb) {
    bcrypt.compare(_password, this.password, (err, isMatch) => {
      if (err) return cb(err)

      cb(null, isMatch)
    })
  },
}

module.exports = mongoose.model('User', UserSchema)
