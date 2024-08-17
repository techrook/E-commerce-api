const { Router } = require("express");
const router = Router();

const cartController = require("../controllers/cart.controller");
const auth = require("../middleware/authentication");
const { checkUser } = require("../middleware/authorization");

router.get("/", auth, cartController.getCart);
router.post("/:id",auth, cartController.addToCart);
router.patch("/update/:id", auth, checkUser, cartController.updatecart);
router.delete("/delete/:id", auth, cartController.deletecart);

module.exports = router;
     