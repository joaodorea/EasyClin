var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cpf: { type: String, required: true, unique: true },
  phone1: String,
  phone2: String,
  address: String,
  addressComp: String,
  cityState: String,
  diaCadastro: String,
  profile: {
    type: String,
    required: true,
    default: "Editor",
    enum: ["Médico", "Editor", "Administrador"]
  },
  profileArea: { type: String, required: true }
});

schema.pre("save", function() {
  this.diaCadastro = new Date();
});

const Funcionarios = mongoose.model("Funcionarios", schema);

module.exports = { Funcionarios };
