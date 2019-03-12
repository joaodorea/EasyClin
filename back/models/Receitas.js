var mongoose = require("mongoose");

var receita = new mongoose.Schema({
  consulta: { type: mongoose.Schema.Types.ObjectId, ref: "Consultas", required: true },
  paciente: { type: mongoose.Schema.Types.ObjectId, ref: "Paciente", required: true },
  medicamentos: [
    {
      medicamento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicamentos",
        required: true
      },
      descricao: String
    }
  ],
  diaCadastro: Number,
  deletedAt: {
    type: String,
    default: null
  }
});

receita.pre('save', function() {
  this.diaCadastro = new Date();
})

const Receitas = mongoose.model("Receitas", receita);

module.exports = { Receitas };
