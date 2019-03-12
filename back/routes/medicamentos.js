const router = require("express").Router();
const controller = require("../controllers/medicamentos")
const { auth } = require("./../middleware/auth")

router.get("/", auth, controller.list);
router.post("/", auth, controller.add);
router.get("/:id", auth, controller.detail);
router.put("/:id", auth, controller.update);
router.delete("/:id", auth, controller.delete);

module.exports = router;
