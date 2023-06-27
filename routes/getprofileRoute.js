const express = require("express");
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.REGISTER_KEY;
const getProfileRoute = express.Router();
const getProfileController = require("../controller/getprofile.controller.js");
const {
    isNull,
    isUndefined,
    isReferalCode
  } = require("../DataVerification");


  const verifyData = (req, res, next) => {

    const Bearer = req.headers["authorization"];
    if (isNull(Bearer) || isUndefined(Bearer) || Bearer.trim()==='') {
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
getProfileRoute.get("/", verifyData, getProfileController.getProfile);
module.exports = getProfileRoute;