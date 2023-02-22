const express = require("express");
const router = express.Router();
const multer = require("multer");
//controller
const productController = require("../controllers/product.controller");

//middleware
const auth = require("../middleware/authentication");
const { checkAdmin } = require("../middleware/authorization");

const Storage = multer.diskStorage({
  destination: "product_images",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: Storage });

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getOneProductById);
router.post(
  "/",
  auth,
  checkAdmin,
  upload.single("productimage"),
  productController.addProduct
);
router.patch("/:id", auth, checkAdmin, productController.updateProduct);

module.exports = router;
