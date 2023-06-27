const express = require("express");
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.REGISTER_KEY;
const authuserRoute = express.Router();
const authuserController = require("../controller/authuser.controller");
const {
    isNull,
    isUndefined,
    isReferalCode
  } = require("../DataVerification");


  const verifyData = (req, res, next) => {

    const Bearer = req.headers["authorization"];
    if (isNull(Bearer) || Bearer.trim()==='' ||isUndefined(Bearer)) {
        res.json({ message: "AUTH_FAILED" });
        return;
    }
    const token = Bearer.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, authData) => {
      if (err) {
        res.json({ message: false });
      } else {
        req.body.id = authData.id;
        next();
      }
    });


}


authuserRoute.post("/", verifyData, authuserController.auth);
module.exports = authuserRoute;