const { Exames } = require("../models/Exames");
const { Pacientes } = require("../models/Pacientes");

let controller = {};
controller.list = async (req, res) => {
  let total = await Exames.countDocuments({}, (err, count) => count);
  const items = +req.query.items;
  const limit = items ? items : 50;
  let skip = 0;
  if (+req.query.page > 1) {
    skip = limit * (+req.query.page - 1);
  }

  Exames.find({}, "dia paciente tipo")
    .populate("paciente", ["name"])
    .populate("medicamentos", ["name"])
    .limit(limit)
    .skip(skip)
    .sort({ diaCadastro: -1 })
    .then(
      exame => {
        res.send({ items: exame, total });
      },
      err => {
        res.status(400).send(err);
      }
    );
};
controller.novo = (req, res) => {
  Pacientes.find({}, "name").then(pacientes => {
    res.send({ pacientes });
  });
};
controller.add = (req, res) => {
  const exames = new Exames(req.body);
  exames.save().then(
    () => {
      res.send({ status: "OK" });
    },
    err => {
      res.status(400).send(err);
    }
  );
};
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
};
controller.delete = (req, res) => {
  Exames.findByIdAndDelete(req.params.id).then(
    () => {
      res.send({ status: "OK" });
    },
    err => {
      res.status(400).send(err);
    }
  );
};
controller.update = (req, res) => {
  Exames.findByIdAndUpdate(req.params.id, req.body).then(
    () => {
      res.send({ status: "OK" });
    },
    err => {
      res.status(400).send(err);
    }
  );
};

module.exports = controller;
