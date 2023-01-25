const User = require("../modal/UserModal");
const bcrypt = require("bcrypt");
const UserService = require("../services/UserServices");
const func = require("../fun");
const generateToken = require("../utils/generateToken");
const catchAsync = require("../utils/CatchAsync");
const {  generateVerifyEmailToken, generateResetPasswordToken } = require('../services/tokenService');
const postmarkService = require("../services/postMarkService");

// user register

const sendVerificationEmail = async (user) => {
  const verifyEmailToken = await generateVerifyEmailToken(user);
  await postmarkService.sendVerificationEmail(user.email, verifyEmailToken);
};
const register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, phone, password } = req.body;
    console.log("hh", name, email, password);
    const user = await UserService.register(name, email, phone, password);
    sendVerificationEmail(user);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

// login

const login = catchAsync(async (req, res) => {
  console.log(req.body, "body");
  const { email, password } = req.body;
  const user = await UserService.login(email, password);
  const token = generateToken(user._id);

  res.status(200).json({ user, token });
});

const blockUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.body.userId;
    const user = await UserService.blockUser(id, userId);
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const userDetails = async (req, res) => {
  console.log("haiiiiii");
  try {
    const id = req.params.id;
    const user = await UserService.getUser(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const editUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const user = await UserService.editUser(id, data);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deactivateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserService.deactivateUser(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const activateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserService.activateUser(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const profilePic = async (req, res) => {
  try {
    const id = req.params.id;
    const pic = req.body.pic;
    console.log(id, pic, "helo");
    const user = UserService.profilePic(id, pic);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await generateResetPasswordToken(req.body.email);
  await postmarkService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.send(formatResponse(true, 200, 'forget-password', 'reset password link sent to your email'));
});

const verifyEmail = catchAsync(async (req, res) => {
  console.log("hello", req.query.token);
  await UserService.verifyEmail(req.query.token); 
  res.redirect(process.env.REDIRECT_URL);
  console.log("success");
  res.status(200). send( 'email-verification successfully completed');
}); 

module.exports = {
  register,
  login,
  blockUser,
  userDetails,
  editUser,
  deactivateUser,
  activateUser,
  profilePic,
  verifyEmail
};
