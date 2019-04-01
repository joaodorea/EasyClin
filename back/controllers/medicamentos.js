const { Medicamentos } = require("../models/Medicamentos");
const { Receitas } = require("../models/Receitas");
var ObjectId = require("mongoose").Types.ObjectId;

let controller = {};
controller.list = async (req, res) => {
  let total = await Medicamentos.countDocuments({}, (err, count) => count);
  const items = +req.query.items;
  const limit = items ? items : 50;
  let skip = 0;
  if (+req.query.page > 1) {
    skip = limit * (+req.query.page - 1);
  }

  Medicamentos.find()
    .limit(limit)
    .skip(skip)
    .sort("name 1")
    .then(
      meds => {
        res.send({ items: meds, total });
      },
      err => {
        res.status(400).send(err);
      }
    );
};
controller.add = (req, res) => {
  const medicamentos = new Medicamentos(req.body);
  medicamentos.save().then(
    meds => {
      res.send(meds);
    },
    err => {
      console.log(err);
      res.status(400).send(err);
    }
  );
};
controller.delete = (req, res) => {
  Medicamentos.findByIdAndDelete(req.params.id).then(
    meds => {
      removeMedFromRecipe(req.params.id).then(resp => {
        res.send({ status: "OK" });
      });
    },
    err => {
      console.log(err);
      res.status(400).send(err);
    }
  );
};
controller.detail = (req, res) => {
  Medicamentos.findById(req.params.id).then(
    meds => {
      res.send(meds);
    },
    err => {
      console.log(err);
      res.status(400).send(err);
    }
  );
};
controller.update = (req, res) => {
  Medicamentos.findByIdAndUpdate(req.params.id, req.body).then(
    () => {
      res.send({ status: "OK" });
    },
    err => {
      console.log(err);
      res.status(400).send(err);
    }
  );
};

function removeMedFromRecipe(id) {
  return Receitas.findOneAndDelete({
    medicamento: new ObjectId(id)
  }).then(med => console.log(med));
}

module.exports = controller;
