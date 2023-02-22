const express = require("express");
const router = express.Router();

const {
  createAdmin,
  loginAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admin-controllers");
const auth = require("../middleware/authentication");
const adminValidatorMiddleware = require("../validator/admin.validator");

router.post("/register", adminValidatorMiddleware, createAdmin);
router.post("/login", loginAdmin);
router.put("/:id", auth, updateAdmin);
router.delete("/:id", auth, deleteAdmin);

module.exports = router;
