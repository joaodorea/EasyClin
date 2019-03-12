const router = require("express").Router();
const controller = require("../controllers/pacientes")
const { auth } = require("./../middleware/auth")

router.get("/", auth, controller.list)
router.post("/", auth, controller.add)
router.get("/:id", auth, controller.detail)
router.delete("/:id", auth, controller.delete)
router.put("/:id", auth, controller.update)

module.exports = router;
