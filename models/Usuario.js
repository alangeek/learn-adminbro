const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  nome: String,
  idade: { type: Number, min: 18, index: true },
  pais: String,
  criado_em: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Usuarios', UserSchema)
