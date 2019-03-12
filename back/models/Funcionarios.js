var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: String,
    email: String,
    phone1: String,
    phone2: String,
    address: String,
    addressComp: String,
    job: String,
    cede: String
})

const Funcionarios = mongoose.model('Funcionarios', schema);

module.exports = { Funcionarios };
