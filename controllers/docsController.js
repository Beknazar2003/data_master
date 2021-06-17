const uuid = require('uuid')
const path = require('path')
const { documents, docsInfo } = require('../models/models')
const ApiError = require('../error/ApiError')

class docsController {
  async create(req, res, next) {
    try {
      let { name, description } = req.body
      const { document } = req.files
      const extname = path.extname(document.name)
      let fileName = uuid.v4() + extname
      document.mv(path.resolve(__dirname, '..', 'static', fileName))
      const docs = await documents.create({
        name,
        document: fileName,
        description,
      })
      return res.redirect('/')
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    let { limit, page } = req.query
    limit = limit || 9
    let offset = page * limit - limit
    let docs
    docs = await documents.findAndCountAll()
    return res.json(docs)
  }

  async getOne(req, res) {
    const { id } = req.params
    const doc = await documents.findOne({
      where: { id },
    })
    return res.json(doc)
  }
}

module.exports = new docsController()
