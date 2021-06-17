const Router = require('express')
const router = new Router()
const docsController = require('../controllers/docsController')

router.post('/', docsController.create)
router.get('/', docsController.getAll)
router.get('/:id', docsController.getOne)

module.exports = router
