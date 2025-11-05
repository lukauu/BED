"use strict";
import httpStatus from "http-status-codes";

const errorLogger = (error, req, res, next) => {
  console.error(error.stack)
  next(error)
}

const pageNotFoundError = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode);
  res.render("error");
};

const internalServerError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.log(`ERROR occurred: ${error.stack}`);
  res.status(errorCode);
  res.send(`${errorCode} | Internal server error`);
};

export const errorController = {
  errorLogger,
  pageNotFoundError,
  internalServerError
};