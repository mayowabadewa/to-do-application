const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./users.model");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const CreateUser = async ({ username, password }) => {
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return {
      status: 409,
      success: false,
      message: "User already exists",
    };
  }

  const user = await User.create({ username, password });
  const token = generateToken(user._id);

  return {
    status: 201,
    data: {
      username: user.username,
      message: "Account creation successful",
      token,
    },
    success: true,
  };
};

const LoginUser = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) {
    return {
      status: 400,
      success: false,
      message: "User does not exist!",
    };
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return {
      status: 400,
      success: false,
      message: "Incorrect password!",
    };
  }

  const token = generateToken(user._id);

  return {
    status: 200,
    success: true,
    data: {
      message: "Login succesful",
      token,
    },
  };
};

module.exports = {
  CreateUser,
  LoginUser,
};
