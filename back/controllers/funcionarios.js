const { Funcionarios } = require("../models/Funcionarios");
const { User } = require("../models/User");

let controller = {};
controller.list = async (req, res) => {
  let total = await Funcionarios.countDocuments({}, (err, count) => count);
  const items = +req.query.items;
  const limit = items ? items : 50;
  let skip = 0;
  if (+req.query.page > 1) {
    skip = limit * (+req.query.page - 1);
  }

  Funcionarios.find({}, "name profile profileArea")
    .limit(limit)
    .skip(skip)
    .then(
      func => {
        res.send({ items: func, total });
      },
      err => {
        res.status(400).send(err);
      }
    );
};

controller.detail = async (req, res) => {
  const funcionario = await Funcionarios.findById(req.params.id);
  User.findOne({ email: funcionario.email }).then(
    user => {
      res.send({ funcionario, hasAccount: !!user });
    },
    err => {
      console.log(err);
      res.status(400).send(err);
    }
  );
};

controller.add = (req, res) => {
  let msg = "";
  if (req.body.generateUser) {
    const { name, cpf, profile, email } = req.body;
    const password = formatCPFtoPassword(cpf);
    const user = generateUser({
      email,
      password,
      name,
      profile
    });
    user
      .then(resp => {
        msg = "OK";
      })
      .catch(err => {
        msg = err;
      });
  }
  const func = new Funcionarios(req.body);
  func.save().then(
    () => {
      res.send({ status: "OK", user: msg });
    },
    err => {
      console.log(err);
      res.status(400).send(err);
    }
  );
};

controller.delete = async (req, res) => {
  try {
    const funcDel = await Funcionarios.findByIdAndDelete(req.params.id);
    await User.findOneAndDelete({ email: funcDel.email });

    res.send({ status: "OK" });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

controller.update = (req, res) => {
  Funcionarios.findByIdAndUpdate(req.params.id, req.body).then(
    () => {
      res.send({ status: "OK" });
    },
    err => {
      console.log(err);
      res.status(400).send(err);
    }
  );
};

function generateUser(body) {
  let user = new User(body);

  return user.save();
}
function formatCPFtoPassword(password) {
  let newPass = password.replace(".", "");
  newPass = newPass.replace(".", "");
  newPass = newPass.replace("-", "");
  return newPass;
}

module.exports = controller;
