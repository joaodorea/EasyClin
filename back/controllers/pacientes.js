var ObjectId = require("mongoose").Types.ObjectId;

const { Pacientes } = require("../models/Pacientes");
const { Consultas } = require("../models/Consultas");
const { Exames } = require("../models/Exames");
const { Receitas } = require("../models/Receitas");

let controllerPacientes = {};
controllerPacientes.list = async (req, res) => {
  let total = await Pacientes.countDocuments({}, (err, count) => count);
  const items = +req.query.items;
  const limit = items ? items : 50;
  let skip = 0;
  if (+req.query.page > 1) {
    skip = limit * (+req.query.page - 1);
  }

  Pacientes.find({}, "name convenio codigoConvenio cpf")
    .limit(limit)
    .skip(skip)
    .then(
      pac => {
        res.send({ items: pac, total });
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
      res.send({ status: "OK" });
    },
    err => {
      if (err.code == 11000) {
        res.status(400).send({ msg: "CPF já cadastrado" });
      }
      res.status(400).send(err);
    }
  );
};
controllerPacientes.detail = (req, res) => {
  let pac = Pacientes.findById(req.params.id, ["-deletedAt"]);
  let cons = Consultas.find({ paciente: new ObjectId(req.params.id) }, [
    "-deletedAt"
  ]);
  let exam = Exames.find({ paciente: new ObjectId(req.params.id) }, [
    "-deletedAt"
  ]);
  let meds = Receitas.find({ paciente: new ObjectId(req.params.id) }, [
    "-deletedAt"
  ]).populate("medicamento");

  Promise.all([pac, cons, exam, meds]).then(value => {
    let resp = {};
    resp.paciente = value[0];
    resp.consultas = value[1];
    resp.exames = value[2];
    resp.receitas = value[3];
    res.send(resp);
  });
};
controllerPacientes.delete = (req, res) => {
  Pacientes.findByIdAndDelete(req.params.id).then(
    () => {
      res.send({ status: "OK" });
    },
    err => {
      console.log(err);
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
      console.log(err);
      res.status(400).send(err);
    }
  );
};

module.exports = controllerPacientes;
