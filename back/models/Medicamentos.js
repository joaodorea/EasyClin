var mongoose = require('mongoose');

var medSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fab:  String,
    nameFab: {
        type:String,
        unique: true
    },
    deletedAt: {
        type: String,
        default: null
    }
})

const Medicamentos = mongoose.model('Medicamentos', medSchema);

module.exports = { Medicamentos };
