const { User } = require("../models/User");
const { Consultas } = require("../models/Consultas");
const sgMail = require("@sendgrid/mail");
const bcrypt = require("bcryptjs");
var ObjectId = require("mongoose").Types.ObjectId;

const controller = {};
controller.register = (req, res) => {
  const { name, cpf, profile, email } = req.body;
  const body = {
    email,
    password: cpf,
    name,
    profile
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
controller.changePassword = (req, res) => {
  const { password, email } = req.body;
  bcrypt.genSalt(12, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (!err) {
        User.findOneAndUpdate({ email }, { password: hash })
          .then(u => {
            res.status(200).send({ status: "OK" });
          })
          .catch(e => {
            res.status(400).send(e);
          });
      }
      console.log(err);
    });
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
    { medico: new ObjectId(req.params.id) },
    "hora dia"
  );

  Promise.all([user, scheduleAvailable])
    .then(value => {
      res.send({
        med: value[0],
        schedule: value[0].schedule,
        notAvailable: value[1]
      });
    })
    .catch(e => {
      console.log(e);
      res.status(400).send(e);
    });
};
controller.forgetPassword = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });

  if (user) {
    await sendEmailAndResetPassword(email); // mandar nova senha
    return res.status(200).send({ status: "OK" });
  }
  res.send({ msg: "E-mail não encontrado" });
};

function sendEmailAndResetPassword(email) {
  newPass = new Date().getTime().toString();
  bcrypt.genSalt(12, (err, salt) => {
    bcrypt.hash(newPass, salt, (err, hash) => {
      if (!err) {
        sendMail(newPass);
        updateUser(hash);
        return;
      }
      console.log(err);
    });
  });

  function updateUser(password) {
    User.findOneAndUpdate({ email }, { $set: { password } })
      .then(resp => {
        console.log({ status: "OK" });
      })
      .catch(err => {
        console.log(err);
      });
  }

  function sendMail(password) {
    sgMail.setApiKey("");
    const msg = {
      to: email,
      replyTo: "EasyClin Contato <email@gmail.com>\r\n",
      returnPath: "EasyClin Contato <email@gmail.com>\r\n",
      organization: "Easy Clin \r\n",
      from: "EasyClin Contato <email@gmail.com>",
      subject: "Recuperação de senha",
      html: `<p>Sua nova senha é: <b></b>${password}</p>
        <p>Por favor, assim que possível, crie uma nova senha por questões de segurança.</p>`
    };
    sgMail.send(msg);
  }
}

module.exports = controller;
