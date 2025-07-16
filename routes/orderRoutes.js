const router = require("express").Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/orderController");

router.post("/", auth, controller.placeOrder);
router.get("/", auth, controller.getOrders);

module.exports = router;
