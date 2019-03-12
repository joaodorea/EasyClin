const { Consultas } = require("../models/Consultas");
const { Pacientes } = require("../models/Pacientes");
const { User } = require("../models/User");

let controller = {};
controller.list = (req, res) => {
  Consultas.find()
    .populate("medico", ["name"])
    .populate("paciente", ["name"])
    .then(
      con => res.send(con),
      err => res.status(400).send(err)
    );
}
controller.novo = (req, res) => {
  Pacientes.find().then(
    pacientes => {
      User.find({profile: "Médico"}).then(
        medicos => res.send({ pacientes, medicos})
      )
    }
  );
}
controller.add = (req, res) => {
  const consultas = new Consultas(req.body);
  consultas.save().then(
    () => res.send({status: "OK"}),
    err => res.status(400).send(err)
  );
}
controller.detail = (req, res) => {
  Consultas.findById({ _id: req.params.id })
    .populate("medico", ["_id", "name"])
    .populate("paciente", ["_id", "name"])
    .then(
      item => res.send(item),
      err => res.status(400).send(err)
    );
}
controller.delete = (req, res) => {
  Consultas.findByIdAndDelete(req.params.id).then(
    () => res.send({ status: "OK" }),
    err => res.status(400).send(err)
  );
}
controller.update = (req, res) => {
  Consultas.findByIdAndUpdate(req.params.id, req.body).then(
    () => res.send({ status: "OK" }),
    err => res.status(400).send(err)
  );
}

module.exports = controller;
