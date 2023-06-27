const express = require("express");
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.REGISTER_KEY;
const updateUPIRoute = express.Router();
const updateUPIController = require("../controller/updateupi.controller.js");
const {
    isNull,
    isUndefined,
    isIfsc,
    isBank,
    isEmail,
    isMobile,
    isValidtoken
  } = require("../DataVerification");

  const verifyData = (req, res, next) => {

    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        req.body.userId = data.id;
        if(isNull(req.body.upi) || isUndefined(req.body.upi) || isNull(req.body.customerName) || isUndefined(req.body.customerName) || isNull(req.body.mobile) || isUndefined(req.body.mobile) || isNull(req.body.email) || isUndefined(req.body.email) ||  !isMobile(req.body.mobile) || !isEmail(req.body.email) ){
            res.json({message:'INVALID_DATA'});
            return;
        }
        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }
}

updateUPIRoute.post("/", verifyData, updateUPIController.updateUPI);
module.exports = updateUPIRoute;