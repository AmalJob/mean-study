const User = require("../modal/UserModal");
const bcrypt = require("bcrypt");
const httpStatus = require('http-status');
const ApiError = require("../utils/ApiError");
const Token = require("../modal/token");
const { verifyToken } = require("./tokenService");
const { tokenTypes } = require("../config/token");


exports.register = async (username, email, phone, password) => {
  console.log(username, email, password);
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: username,
      email: email,
      phone: phone,
      password: hashedPassword,
    });
    console.log(newUser, "new");

    const user = await newUser.save();
    return user;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */

exports.login =   async (email, password ) => {
  const user = await User.findOne({ email: email });
  console.log(user);

  if (!user || !(await bcrypt.compare(password, user.password))) {
  throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  
  }

  if (!user || (await user.isVerified) == false) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "please verify the email");

  }

  return user;
};

exports.blockUser = async (id, userId) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { blocked: id } }
    );
    return user;
  } catch (error) {
    throw Error(error);
  }
};

exports.getUser = async (id) => {
  try {
    const user = await User.findById(id);
    console.log(user);
    if (user) {
      return user;
    }
  } catch (error) {
    throw Error(error);
  }
};

exports.editUser = async (id, data) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    return user;
  } catch (error) {
    throw Error(error);
  }
};

exports.deactivateUser = async (id) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { isActive: false } },
      { new: true }
    );
    return user;
  } catch (error) {
    throw Error(error);
  }
};

exports.activateUser = async (id) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { isActive: true } },
      { new: true }
    );
    return user;
  } catch (error) {
    throw Error(error);
  }
};

exports.profilePic = async (id, pic) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { profilePic: pic } },
      { new: true }
    );
  } catch (error) {
    throw Error(error);
  }
};

exports. getUserById = async (id) => {
  console.log("id", id);
  return User.findById(id);
};


exports. verifyEmail = async (verifyEmailToken) => {
  console.log(verifyEmailToken,"vv");
  try {
    const verifyEmailTokenDoc = await verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);

    const user = await this.getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    console.log("user", user);
    await Token.deleteMany({ user: user._id, type: tokenTypes.VERIFY_EMAIL });
    await this.editUser(user._id, { isVerified: true });
  } catch (error) {
    console.log(error);
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};
