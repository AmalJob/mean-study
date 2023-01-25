const Post = require("../modal/PostModal");
const User = require("../modal/UserModal");
// add todo

const addPost = async (text, userId, username) => {
  try {
    const newPost = new Post({
      text: text,
      userId: userId,
      username: username,
    });
    const post = await newPost.save();
    return post;
  } catch (error) {
    throw Error(error);
  }
};

// get todos

const getPosts = async (userId) => {
  try {
    const users = await User.findById(userId);

    let blockUsers = users.blocked;

    const activateUsers = await User.find({ isActive: false });
    const active = activateUsers.map((id) => id._id);
    console.log("act", active);
    const posts = await Post.find({
      $and: [
        { userId: { $ne: userId } },
        { blocked: { $nin: [userId] } },
        { userId: { $nin: blockUsers } },
        { userId: { $nin: active } },
      ],
    }).sort({ _id: -1 });
    return posts;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};

// get a User Posts

const getUserPosts = async (userId) => {
  try {
    const posts = await Post.find({ userId: userId }).sort({ _id: -1 });
    return posts;
  } catch (error) {
    throw Error(error);
  }
};

// get a post

const getPost = async (id) => {
  try {
    const post = await Post.findById(id);
    console.log(post);
    return post;
  } catch (error) {
    throw Error(error);
  }
};

// edit a todo

const editPost = async (id, data) => {
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    return post;
  } catch (error) {
    throw Error(error);
  }
};

// delete a todo

const deletePost = async (id) => {
  try {
    const post = await Post.findByIdAndDelete(id);
    if (post) {
      return post;
    }
  } catch (error) {
    throw Error(error);
  }
};

// block post

const blockPost = async (id, userId) => {
  console.log("post", id, userId);
  try {
    const post = await Post.findOneAndUpdate(
      { _id: id },
      { $push: { blocked: userId } }
    );
    console.log(post, "post");
    if (post) {
      return post;
    }
  } catch (error) {
    console.log("hbhbhbhbb");
  }
};

module.exports = {
  addPost,
  getPosts,
  editPost,
  deletePost,
  getUserPosts,
  getPost,
  blockPost,
};
