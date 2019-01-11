const User = require('./user')

/**
 * 通过 name 查找 user
 */
exports.findOneByName = name => new Promise((reslove, reject) => {
  User.findOne({
    name,
  }, (err, findUser) => {
    if (err) reject(new Error(err))

    reslove(findUser)
  })
})


exports.createAndSave = user => new Promise((resolve, reject) => {
  const newUserModel = new User(user)
  newUserModel.save((err, saveUser) => {
    if (err) reject(new Error(err))
    resolve(saveUser)
  })
})
