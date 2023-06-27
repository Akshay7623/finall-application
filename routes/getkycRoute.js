const express = require("express");
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.REGISTER_KEY;
const getKYCRoute = express.Router();
const getKYCController = require("../controller/getkyc.controller.js");

const {isNull, isUndefined , isValidtoken } = require("../DataVerification");

  const verifyData = (req, res, next) => {
    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        req.body.userId = data.id;
        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }
}

getKYCRoute.get("/", verifyData, getKYCController.getKYC);
module.exports = getKYCRoute;