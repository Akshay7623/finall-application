const express = require("express");
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.REGISTER_KEY;
const addUPIRoute = express.Router();
const addUPIController = require("../controller/addupi.controller.js");
const {
    isNull,
    isUndefined,
    isEmail,
    isMobile,
    isValidtoken
  } = require("../DataVerification");


  const verifyData = (req, res, next) => {

    const Bearer = req.headers["authorization"];
    
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        req.body.userId = data.id;
        if(isNull(req.body.customerName) || isUndefined(req.body.customerName) || isNull(req.body.mobile) || isUndefined(req.body.mobile) || isNull(req.body.email) || isUndefined(req.body.email) || isNull(req.body.upi) || isUndefined(req.body.upi) || !isMobile(req.body.mobile) || !isEmail(req.body.email)){
            res.json({message:'INVALID_DATA'});
            return;
        }
        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }


}

addUPIRoute.post("/", verifyData, addUPIController.addUPI);
module.exports = addUPIRoute;