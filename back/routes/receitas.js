const router = require("express").Router();
const controller = require("../controllers/receitas")
const { auth } = require("./../middleware/auth")

router.get("/:id/receitas", auth, controller.list)
router.post("/:id/receitas", auth, controller.add)
// router.get("/:id", controller.detail)
// router.delete("/:id", controller.delete)
// router.put("/:id", controller.update)

module.exports = router;
