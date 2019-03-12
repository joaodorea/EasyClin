var mongoose = require("mongoose");

var exameSchema = new mongoose.Schema({
  name: String,
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pacientes",
    required: true
  },
  desc: String,
  local: String,
  origem: String,
  tipo: String,
  diaCadastro: String,
  dia: Number,
  deletedAt: {
    type: String,
    default: null
  }
});

exameSchema.pre('save', function() {
  this.diaCadastro = new Date();
})

const Exames = mongoose.model("Exames", exameSchema);

module.exports = { Exames };
