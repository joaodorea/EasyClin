const { Exames } = require("../models/Exames");
const { Pacientes } = require("../models/Pacientes");
const { Medicamentos } = require("../models/Medicamentos");

let controller = {};

controller.list = (req, res) => {
  Exames.find()
    .populate("paciente", ["name"])
    .populate("medicamentos", ["name"])
    .then(
      exame => {
        res.send(exame);
      },
      err => {
        res.status(400).send(err);
      }
    );
}
controller.novo = (req, res) => {
  Pacientes.find().then(
    pacientes => {
      Medicamentos.find().then(
          medicamentos => {
              res.send({ pacientes, medicamentos})
          }
      )
    }
  );
}
controller.add = (req, res) => {
  const exames = new Exames(req.body);
  exames.save().then(
    () => {
      res.send({status: "OK"});
    },
    err => {
      res.status(400).send(err);
    }
  );
}
controller.detail = (req, res) => {
  Exames.findById({ _id: req.params.id })
    .populate("paciente", ["_id", "name"])
    .then(
      item => {
        res.send(item);
      },
      err => {
        res.status(400).send(err);
      }
    );
}
controller.delete = (req, res) => {
  Exames.findByIdAndDelete(req.params.id).then(
    () => {
      res.send({ status: "OK" });
    },
    err => {
      res.status(400).send(err);
    }
  );
}
controller.update = (req, res) => {
  Exames.findByIdAndUpdate(req.params.id, req.body).then(
    () => {
      res.send({ status: "OK" });
    },
    err => {
      res.status(400).send(err);
    }
  );
}

module.exports = controller;
