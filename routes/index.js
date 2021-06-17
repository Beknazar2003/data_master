const Router = require('express')
const router = new Router()
const docsRouter = require('./docsRouter')
const userRouter = require('./userRouter')

router.use('/auth', userRouter)
router.use('/docs', docsRouter)

module.exports = router
