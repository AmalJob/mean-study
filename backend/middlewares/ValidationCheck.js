var ObjectId = require("mongoose").Types.ObjectId;

const ValidationCheck = (req, res, next) => {
  const paramsdata = req.params.id;
  console.log(paramsdata);
  if (Object.keys(paramsdata).length === 0) {
    res.status(401).json({ error: "please provide valid data" });
  } else if (!ObjectId.isValid(paramsdata)) {
    res.status(401).json({ error: "invalid id" });
  } else {
    next();
  }
};

const ValidationCheckBody = (req, res, next) => {
  const data = req.body.todo;
  const userId = req.body.userId;

  console.log("hhhh", data);
  if (Object.keys(data).length === 0) {
    res.status(401).json({ error: "please provide valid data" });
  } else if (!ObjectId.isValid(userId)) {
    res.status(401).json({ error: "invalid id" });
  } else {
    next();
  }
};

module.exports = { ValidationCheck, ValidationCheckBody };
