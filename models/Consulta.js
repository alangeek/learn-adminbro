const mongoose = require('mongoose')

const ConsultaSchema = new mongoose.Schema({
  paciente: String,
  idade: { type: Number, min: 18, index: true },
  detalhes: String,
  finalizado: Boolean
})

module.exports = mongoose.model('Consulta', ConsultaSchema)
