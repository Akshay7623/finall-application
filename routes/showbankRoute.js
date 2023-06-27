const express = require("express");
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.REGISTER_KEY;
const showBankRoute = express.Router();
const showBankController = require("../controller/showbank.controller.js");
const {isValidtoken } = require("../DataVerification");


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

showBankRoute.get("/", verifyData, showBankController.getBankCard);
module.exports = showBankRoute;