const router = require('koa-router')()
const User = require('../controllers/user')

router.prefix('/user')

router.get('/', (ctx, next) => {
  ctx.body = 'this is a users response!'
})

router.get('/bar', (ctx, next) => {
  ctx.body = 'this is a users/bar response'
})

router.post('/login', User.login)
router.post('/signin', User.signin)

module.exports = router
