const router = require("express").Router();
const { auth } = require("./../middleware/auth")

router.get("/", auth, (req, res) => {
  User.find().then(
    func => {
      res.send({ func });
    },
    err => {
      res.status(400).send(err);
    }
  );
});
router.get("/medicos", auth, (req, res) => {
  User.find({ profile: "Medico" }).then(
    meds => {
      res.send({ meds });
    },
    err => {
      res.status(400).send(err);
    }
  );
});

module.exports = router;