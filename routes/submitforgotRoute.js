const express = require("express");
const submitforgot = express.Router();
const submitforgotController = require("../controller/submitforgot.controller.js");
const {
  isNull,
  isUndefined,
  isMobile,
  isPassword,
  isOtp
} = require("../DataVerification");

const verifyData = (req, res, next) => {
  if (
    isNull(req.body.mobile) ||
    isNull(req.body.loginPassword) ||
    isNull(req.body.otp) ||
    isUndefined(req.body.mobile) ||
    isUndefined(req.body.loginPassword) ||
    isUndefined(req.body.otp) ||
    !isMobile(req.body.mobile) ||
    !isPassword(req.body.loginPassword) ||
    !isOtp(req.body.otp)
  ) {
    res.json({ message: "INVALID_DATA" });
    return;
  }
  next();
};

submitforgot.post("/", verifyData, submitforgotController.submitPass);
module.exports = submitforgot;