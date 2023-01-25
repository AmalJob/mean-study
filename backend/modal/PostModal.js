const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    blocked: {
      type: Array,
      default: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", PostSchema);
