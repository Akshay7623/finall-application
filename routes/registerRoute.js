const express = require("express");
const register = express.Router();
const registerController = require("../controller/register.controller");
const {
  isNull,
  isUndefined,
  isMobile,
  isPassword,
  isOtp,
  isReferalCode
} = require("../DataVerification");

const verifyData = (req, res, next) => {
  if (
    isNull(req.body.mobile) ||
    isNull(req.body.password) ||
    isNull(req.body.otp) ||
    isUndefined(req.body.mobile) ||
    isUndefined(req.body.password) ||
    isUndefined(req.body.otp) ||
    !isMobile(req.body.mobile) ||
    !isPassword(req.body.password) ||
    !isOtp(req.body.otp)
  ) {
    res.json({ message: "INVALID_DATA" });
    return;
  }
  next();
};

register.post("/", verifyData, registerController.register);
module.exports = register;
