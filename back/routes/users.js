const router = require("express").Router();
const controller = require("../controllers/users");
const { auth } = require("./../middleware/auth");

router.post("/", auth, controller.register);
router.post("/token", auth, controller.getUserByToken);
router.post("/forget-password", controller.forgetPassword);
router.post("/change-password", auth, controller.changePassword);
router.post("/:id", auth, controller.update);
router.get("/medico/:id", auth, controller.getMedico);

module.exports = router;
