const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Register Controler
const registerUser = async (req, res) => {
  const { username, email, password, role = "user" } = req.body;

  const isUserAlreadyExists = await userModel.find({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists.length > 0) {
    return res.status(409).json({
      message: "User Already Exists!",
    });
  }

  try {
    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hash,
      role,
    });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
    );
    res.cookie("token", token);

    res.status(201).json({
      message: "User Created Sucessfully!",
    });
  } catch (e) {
    console.log(`their is some error ${e.message}`);
  }
};

//User Login controller

const loginUser = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials!",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid credentials!",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY,
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User Logined Sucessfully!",
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
  });
};

module.exports = { registerUser, loginUser };
