var mongoose = require("mongoose");

var conSchema = new mongoose.Schema({
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pacientes",
    required: true
  },
  medico: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  medicamentos: [
    {
      medicamento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicamentos",
        required: false
      },
      frequencia: String
    }
  ],
  hora: String,
  dia: String,
  name: String,
  desc: String,
  local: String,
  diaCadastro: String,
  deletedAt: {
    type: String,
    default: null
  }
});

conSchema.pre("save", function() {
  this.diaCadastro = new Date();
});

const Consultas = mongoose.model("Consultas", conSchema);

module.exports = { Consultas };
