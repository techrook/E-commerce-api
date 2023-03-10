const { Router } = require("express");
const router = Router();

const {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controllers");
const auth = require("../middleware/authentication");
const userValidatorMiddleware = require("../validator/user.validator");

router.post("/register", userValidatorMiddleware, createUser);
router.post("/login", loginUser);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

module.exports = router;
