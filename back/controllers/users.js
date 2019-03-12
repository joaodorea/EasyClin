const { User } = require("../models/User");
const { Consultas } = require("../models/Consultas");

var ObjectId = require("mongoose").Types.ObjectId;

const controller = {};
controller.register = (req, res) => {
  const body = {
    email: req.body.email,
    password: req.body.password
  };
  let user = new User(body);

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header("auth", token);
      res.send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};
controller.update = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { schedule: req.body.schedule })
    .then(u => {
      res.status(200).send({ status: "OK" });
    })
    .catch(e => {
      res.status(400).send(e);
    });
};
controller.getUserByToken = (req, res) => {
  // get user by token
  User.findByToken(req.body.token)
    .then(resp => {
      res.send({
        user: resp,
        schedule: resp.schedule
      });
    })
    .catch(e => {
      res.status(400).send(e);
    });
};
controller.getMedico = (req, res) => {
  const user = User.findById(req.params.id);
  const scheduleAvailable = Consultas.find(
    { "medico": new ObjectId(req.params.id) },
    "hora dia"
  );

  Promise.all([user, scheduleAvailable])
    .then(value => {
      res.send({ med: value[0], schedule: value[0].schedule, notAvailable: value[1] });
    }).catch( (e) => {
      console.log(e)
      res.status(400).send(e);
    });
};

module.exports = controller;
