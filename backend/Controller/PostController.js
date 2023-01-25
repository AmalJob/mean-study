const PostService = require("../services/PostService");

// add a todo

const addPost = async (req, res) => {
  console.log(req.body);
  const text = req.body.text;
  const userId = req.body.userId;
  const username = req.body.username;
  try {
    const data = await PostService.addPost(text, userId, username);
    res.status(200).json({ data: text, msg: "data added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

// get todos

const getPosts = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("haiii", userId);
    const posts = await PostService.getPosts(userId);
    console.log(posts);
    if (posts.length) {
      console.log(posts);
      res.status(200).json(posts);
    } else {
      res.status(401).json({ error: "Data not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// get user todos

const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("haiii", userId);
    const posts = await PostService.getUserPosts(userId);
    console.log(posts);
    if (posts.length) {
      console.log(posts);
      res.status(200).json(posts);
    } else {
      res.status(401).json({ error: "Data not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// get a post

const getPost = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("haiii", id);
    const post = await PostService.getPost(id);
    console.log(post);
    if (post) {
      console.log(post);
      res.status(200).json(post);
    } else {
      res.status(401).json({ error: "Data not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// edit a todo

const editPost = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    console.log("bo", req.body, id);
    const post = await PostService.editPost(id, data);
    if (post) {
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// delete a todo

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await PostService.deletePost(id);
    res.status(200).json({ msg: "Todo Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// block a post

const blockPost = async (req, res) => {
  try {
    console.log(req.body, req.params);
    const id = req.params.id;
    const userId = req.body.userId;
    console.log(id, userId, "hellooo");
    const post = await PostService.blockPost(id, userId);
    res.status(200).json(post);
  } catch (error) {
    console.log("hellooo");
    res.status(500).json({ error: error });
  }
};

module.exports = {
  addPost,
  editPost,
  deletePost,
  getPosts,
  getUserPosts,
  getPost,
  blockPost,
};
