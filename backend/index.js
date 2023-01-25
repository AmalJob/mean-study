const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const UserRoute = require("./Routes/User");
const PostRoute = require("./Routes/Post");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { errorConverter } = require("./middlewares/error");

dotenv.config();
// database connection

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("database connected" ,process.env.MONGO_URL );
  }
);

// middlewares


app.use(express.json());
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json())
// routes
app.use("/users", UserRoute);

app.use("/posts", PostRoute);
app.use("/images", express.static(path.join(__dirname, "public/images")));
// image storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
    console.log(req.body);
  },
});

var upload = multer({
  storage: storage,
});

app.post("/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.log(error);
  }
});

// convert error to ApiError, if needed
app.use(errorConverter);

// server connection

app.listen(process.env.PORT, () => {
  console.log("server connected");
});

app.get("/", (req, res) => {
  res.send("Hello ");
});
