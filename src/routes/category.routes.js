const { Router } = require("express");
const router = Router();

const categoryController = require("../controllers/category.controller");

router.get("/", categoryController.getAllCategories);
router.post("/", categoryController.addCategories);
router.get("/:id", categoryController.getACategories);

module.exports = router;
