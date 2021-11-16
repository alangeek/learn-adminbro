const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  conteudo: { type: String, required: true }
})

module.exports = mongoose.model('Artigos', PostSchema)
