const express = require("express");
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.REGISTER_KEY;
const razorpayRoute = express.Router();
const razorpayController = require("../controller/razorpay.controller.js");


const { isNull, isUndefined, isEmail, isMobile, isValidtoken } = require("../DataVerification");


  const verifyData = (req, res, next) => {
      
    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        req.body.userId = data.id;
        if(isNull(req.body.amount) || isUndefined(req.body.amount)){
            res.json({message:'INVALID_DATA'});
            return;
        }
        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }

}

razorpayRoute.post("/", verifyData, razorpayController.razorpayRecharge);
module.exports = razorpayRoute;