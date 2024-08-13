const { Router } = require("express");
const router = Router();

const {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  verifyUser,
  forgetpassword,
  restpassword,     
  resetuserpassword,
  getUserById
} = require("../controllers/user.controllers");
const auth = require("../middleware/authentication");
const userValidatorMiddleware = require("../validator/user.validator");

router.post("/register", userValidatorMiddleware, createUser);
router.post("/login", loginUser);
router.put("/:id", auth, updateUser);
router.get("/:id",getUserById)
router.delete("/:id", auth, deleteUser);
router.get("/verify/:id", verifyUser)
router.post("/forgetpassword",forgetpassword)
router.get("/reset-password/:id", restpassword)
router.post("/reset-password/:userId",   resetuserpassword)

module.exports = router;