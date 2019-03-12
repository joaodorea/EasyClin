const router = require("express").Router();

router.get("/", (req, res) => {
  User.find().then(
    func => {
      res.send({ func });
    },
    err => {
      res.status(400).send(err);
    }
  );
});
router.get("/medicos", (req, res) => {
  User.find({ profile: "Médico" }).then(
    meds => {
      res.send({ meds });
    },
    err => {
      res.status(400).send(err);
    }
  );
});

module.exports = router;