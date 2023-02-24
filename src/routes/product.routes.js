const { Router } = require("express");
const multer = require("multer");

const router = Router();

//controller
const productController = require("../controllers/product.controller");

//middleware
const auth = require("../middleware/authentication");
const { checkAdmin } = require("../middleware/authorization");
const addProductValidatorMiddleware = require("../validator/product.validator")

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
