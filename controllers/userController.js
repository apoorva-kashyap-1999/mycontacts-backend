const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//@description POST user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  console.log("Req body is: " + req.body);
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    res.status(400);
    throw new Error("Email already in use");
  }
  //Hash password --> return promise
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({ message: "Register User", user });
  } else {
    res.status(400).json({ message: "User could not be created" });
  }
  res.json({ message: "Resgister User" });
});

//@description POST user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Email or Password missing");
  }
  const user = await User.findOne({ email });
  // compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          name: user.name,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "50m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Unauthorized");
  }
});

//@description GET user
//@route GET /api/users/userInfo
//@access private
const getUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { getUser, registerUser, loginUser };
