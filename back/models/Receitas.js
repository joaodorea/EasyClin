var mongoose = require("mongoose");

var receita = new mongoose.Schema({
  consulta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Consultas",
    required: true
  },
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    required: true
  },
  medicamento: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Medicamentos"
  },
  descricao: { type: String, required: true },
  diaCadastro: String,
  deletedAt: {
    type: String,
    default: null
  }
});

receita.pre("save", function() {
  this.diaCadastro = new Date();
});

const Receitas = mongoose.model("Receitas", receita);

module.exports = { Receitas };
