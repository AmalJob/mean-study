const express = require("express");
const router = express.Router();
const {
  addPost,
  deletePost,
  editPost,
  getPosts,
  getUserPosts,
  getPost,
  blockPost,
} = require("../Controller/PostController");

const { verifyToken } = require("../middlewares/SessionCheck");

const {
  ValidationCheck,
  ValidationCheckBody,
} = require("../middlewares/ValidationCheck");

// add a todo
router.route("/").post(addPost);

// get all todos

router.route("/:id").get(getPosts);

// get a User Posts

router.route("/user/:id").get(getUserPosts);

// get a post

router.route("/post/:id").get(getPost);

// edit todo

router.route("/:id").put(editPost);

// delete a todo

router.route("/:id").delete(deletePost);

// block a post

router.route("/block/:id").post(blockPost);

module.exports = router;
