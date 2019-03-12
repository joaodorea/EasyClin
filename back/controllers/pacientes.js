var ObjectId = require('mongoose').Types.ObjectId;

const { Pacientes } = require("../models/Pacientes");
const { Consultas } = require("../models/Consultas");
const { Exames } = require("../models/Exames");
const { Receitas } = require("../models/Receitas");

let controllerPacientes = {};
controllerPacientes.list = (req, res) => {
  Pacientes.find()
    .then(
      pac => {
        res.send( pac );
      },
      err => {
        res.status(400).send(err);
      }
    );
};
controllerPacientes.add = (req, res) => {
  const paciente = new Pacientes(req.body);
  paciente.save().then(
    () => {
      res.send({status: "OK"})
    },
    err => {
      res.status(400).send(err)
    }
  )
};
controllerPacientes.detail = (req, res) => {
  let pac = Pacientes.findById(req.params.id, ["-deletedAt"]);
  let cons = Consultas.find({"paciente": new ObjectId(req.params.id)}, ["-deletedAt"]);
  let exam = Exames.find({"paciente": new ObjectId(req.params.id)}, ["-deletedAt"]);
  let meds = Receitas.find({"paciente": new ObjectId(req.params.id)}, ["-deletedAt"]).populate("medicamentos.medicamento");

  Promise.all([pac, cons, exam, meds])
    .then( value => {
        let resp = {};
        resp.paciente = value[0];
        resp.consultas = value[1];
        resp.exames = value[2];
        resp.receitas = value[3];
        res.send(resp);
      }
    )
};
controllerPacientes.delete = (req, res) => {
  Pacientes.findByIdAndDelete(req.params.id).then(
    () => {
      res.send({ status: "OK" });
    },
    err => {
      console.log(err)
      res.status(400).send(err);
    }
  );
};
controllerPacientes.update = (req, res) => {
  Pacientes.findByIdAndUpdate(req.params.id, req.body).then(
    () => {
      res.send({ status: "OK" });
    },
    err => {
      console.log(err)
      res.status(400).send(err);
    }
  );
};


module.exports = controllerPacientes;
