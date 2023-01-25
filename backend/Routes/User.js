const express = require("express");
const router = express.Router();
const {
  register,
  login,
  blockUser,
  userDetails,
  editUser,
  deactivateUser,   
  activateUser,
  profilePic,
  verifyEmail,
} = require("../Controller/UserController");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/blockUser/:id").post(blockUser);
router.route("/user/:id").get(userDetails);
router.route("/:id").patch(editUser);
router.route("/deactivate/:id").post(deactivateUser);
router.route("/activate/:id").post(activateUser);
router.route("/profilePic/:id").post(profilePic);
router.route('/verify-email').get(verifyEmail)
module.exports = router;
