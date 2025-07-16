const router = require("express").Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/cartController");

router.get("/", auth, controller.getCart);
router.post("/add", auth, controller.addToCart);
router.put("/update", auth, controller.updateCart);
router.delete("/remove", auth, controller.removeFromCart);

module.exports = router;
