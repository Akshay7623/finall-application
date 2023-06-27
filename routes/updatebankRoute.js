const express = require("express");
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.REGISTER_KEY;
const updateBankRoute = express.Router();
const updateBankController = require("../controller/updatebank.controller.js");
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
        if(isNull(req.body.ifsc) || isUndefined(req.body.ifsc) || isNull(req.body.customerName) || isUndefined(req.body.customerName) || isNull(req.body.mobile) || isUndefined(req.body.mobile) || isNull(req.body.email) || isUndefined(req.body.email) || isNull(req.body.bankName) || isUndefined(req.body.bankName) || isNull(req.body.bankAccount) || isUndefined(req.body.bankAccount) || !isIfsc(req.body.ifsc) || !isMobile(req.body.mobile) || !isEmail(req.body.email) || !isBank(req.body.bankAccount)){
            res.json({message:'INVALID_DATA'});
            return;
        }
        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }


}

updateBankRoute.post("/", verifyData, updateBankController.updateBank);
module.exports = updateBankRoute;