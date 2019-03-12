const { Medicamentos } = require("../models/Medicamentos");

let controller = {};
controller.list = (req, res) => {
  Medicamentos.find().then(
    meds => {
      res.send( meds );
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
      res.send( meds );
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
      res.send( meds );
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
      res.send( meds );
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
      res.send( {status: "OK"} );
    },
    err => {
      console.log(err);
      res.status(400).send(err);
    }
  );
};

module.exports = controller;
