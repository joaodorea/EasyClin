var ObjectId = require('mongoose').Types.ObjectId;

const { Receitas } = require("../models/Receitas");

let controller = {};
controller.list = (req, res) => {
  Receitas.find({"consulta": new ObjectId(req.params.id)})
  .populate({
    path: "medicamentos.medicamento",
    model: "Medicamentos"
  })
    .then(
      rec => {
        res.send( rec );
      },
      err => {
        res.status(400).send(err);
      }
    );
};
controller.add = (req, res) => {
  const receita = new Receitas(req.body);
  receita.save().then(
    () => {
      res.send({status: "OK"})
    },
    err => {
      res.status(400).send(err)
    }
  )
};
controller.detail = (req, res) => {
  let pac = Receitas.findById(req.params.id, ["-deletedAt"])

  Promise.all([pac, cons, exam])
    .then( value => {
        let resp = value[0]
            resp.exames = value[2]
            resp.consultas = value[1]
        res.send(resp);
      }
    )
};
controller.delete = (req, res) => {
  Receitas.findByIdAndDelete(req.params.id).then(
    () => {
      res.send({ status: "OK" });
    },
    err => {
      console.log(err)
      res.status(400).send(err);
    }
  );
};
controller.update = (req, res) => {
  Receitas.findByIdAndUpdate(req.params.id, req.body).then(
    () => {
      res.send({ status: "OK" });
    },
    err => {
      console.log(err)
      res.status(400).send(err);
    }
  );
};

module.exports = controller;
