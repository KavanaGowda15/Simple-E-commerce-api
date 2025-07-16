const router = require("express").Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const controller = require("../controllers/productController");

router.get("/", controller.getAllProducts);
router.post("/", auth, role("admin"), controller.addProduct);
router.put("/:id", auth, role("admin"), controller.updateProduct);
router.delete("/:id", auth, role("admin"), controller.deleteProduct);

module.exports = router;
