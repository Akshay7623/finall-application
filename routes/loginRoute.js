const express = require("express");
const loginRoute = express.Router();
const loginController = require("../controller/login.controller");
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
      isNull(req.body.loginPassword) ||
      isUndefined(req.body.mobile) ||
      isUndefined(req.body.loginPassword) ||
      !isMobile(req.body.mobile) ||
      !isPassword(req.body.loginPassword)
    ) {
      res.json({ message: "INVALID_DATA" });
      return;
    }
    next();
  };

loginRoute.post("/", verifyData, loginController.login);
module.exports = loginRoute;