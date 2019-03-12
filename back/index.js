const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const { mongoose } = require("./db/mongoose.js");
const { auth } = require("./middleware/auth.js");
const { User } = require("./models/User.js");

const medicamentos = require("./routes/medicamentos");
const funcionarios = require("./routes/funcionarios");
const consultas = require("./routes/consultas");
const pacientes = require("./routes/pacientes");
const receitas = require("./routes/receitas");
const exames = require("./routes/exames");
const users = require("./routes/users");

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  console.log(req.method, req.path);
  next();
});

app.use("/medicamentos", medicamentos);
app.use("/funcionarios", funcionarios);
app.use("/consultas", consultas);
app.use("/consulta", receitas);
app.use("/pacientes", pacientes);
app.use("/exames", exames);
app.use("/users", users);

app.post("/login", (req, res) => {
  var body = {
    email: req.body.email,
    password: req.body.password
  };

  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user
        .generateAuthToken()
        .then(token => {
          res.header("auth", token);
          res.status(200).send({ user, token });
        })
        .catch(e => {
          res.status(400).send({status: "OK"});
        });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});
app.delete("/logout", auth, (req, res) => {
  req.user.removeToken(req.token).then(
    () => {
      res.status(200).send();
    },
    () => {
      res.status(400).send();
    }
  );
});

app.listen(3000, () => {
  console.log("Iniciado na porta 3000");
});
