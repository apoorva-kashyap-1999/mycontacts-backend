const express = require("express");
const {
  getUser,
  registerUser,
  loginUser,
} = require("../controllers/userController");
const validateToken = require("../middlewares/validateTokenHandler");

const router = express.Router();

router.route("/register").post(registerUser);

router.post("/login", loginUser);

router.get("/userInfo",validateToken, getUser);

module.exports = router;
