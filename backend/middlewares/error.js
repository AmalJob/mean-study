const mongoose = require('mongoose');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const errorConverter = (err, _req, _res, next) => {
  let error = err;
  console.log(error,"rr");
  if (err instanceof ApiError) {
    return _res.status(error.statusCode).json( error.message ) 
  }
  // pass the error to the default error handler
  return next(err);
};

module.exports= {errorConverter}