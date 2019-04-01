const { Consultas } = require("../models/Consultas");
const { Pacientes } = require("../models/Pacientes");
const { User } = require("../models/User");

let controller = {};
controller.list = async (req, res) => {
  let total = await Consultas.countDocuments({}, (err, count) => count);
  const items = +req.query.items;
  const limit = items ? items : 50;
  let skip = 0;
  if (+req.query.page > 1) {
    skip = limit * (+req.query.page - 1);
  }

  Consultas.find()
    .select("-deletedAt -desc -local -medicamentos -__v -name")
    .populate("medico", ["name"])
    .populate("paciente", ["name"])
    .limit(limit)
    .skip(skip)
    .sort({ dia: -1, hora: -1 })
    .then(
      con => res.send({ items: con, total }),
      err => res.status(400).send(err)
    );
};
controller.novo = (req, res) => {
  Pacientes.find().then(pacientes => {
    User.find({ profile: "Médico" }, "name").then(medicos =>
      res.send({ pacientes, medicos })
    );
  });
};
controller.add = (req, res) => {
  const consultas = new Consultas(req.body);
  consultas
    .save()
    .then(() => res.send({ status: "OK" }), err => res.status(400).send(err));
};
controller.detail = (req, res) => {
  Consultas.findById({ _id: req.params.id })
    .populate("medico", ["_id", "name"])
    .populate("paciente", ["_id", "name"])
    .then(item => res.send(item), err => res.status(400).send(err));
};
controller.delete = (req, res) => {
  Consultas.findByIdAndDelete(req.params.id).then(
    () => res.send({ status: "OK" }),
    err => res.status(400).send(err)
  );
};
controller.update = (req, res) => {
  Consultas.findByIdAndUpdate(req.params.id, req.body).then(
    () => res.send({ status: "OK" }),
    err => res.status(400).send(err)
  );
};

module.exports = controller;
