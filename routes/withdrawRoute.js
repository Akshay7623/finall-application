const express = require("express");
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.REGISTER_KEY;
const withdrawRoute = express.Router();
const withdrawController = require("../controller/withdraw.controller.js");


const {
    isNull,
    isUndefined,
    isPassword,
    isValidtoken
  } = require("../DataVerification");


  const verifyData = (req, res, next) => {



    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        req.body.userId = data.id;
        if(isNull(req.body.type) || isUndefined(req.body.type) || isNull(req.body.withdrawAmount) || isUndefined(req.body.withdrawAmount) || isNull(req.body.password) || isUndefined(req.body.password) || !isPassword(req.body.password)){
            res.json({message:'INVALID_DATA'});
            return;
        }
        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }
}

withdrawRoute.post("/", verifyData, withdrawController.withdraw);
module.exports = withdrawRoute;