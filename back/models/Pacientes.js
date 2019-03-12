var mongoose = require("mongoose");

var pacSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: String,
  endereco: String,
  enderecoComp: String,
  cidadeEstado: String,
  telefone1: String,
  telefone2: String,
  cpf: {
    type: String,
    unique: true
  },
  convenio: String,
  codigoConvenio: String,
  historicoClinico: String,
  deletedAt: {
    type: String,
    default: null
  }
});

const Pacientes = mongoose.model("Pacientes", pacSchema);

module.exports = { Pacientes };
