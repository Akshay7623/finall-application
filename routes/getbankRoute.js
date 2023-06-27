const express = require("express");
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.REGISTER_KEY;
const getBankRoute = express.Router();
const getBankController = require("../controller/getbank.controller.js");

const {isNull, isUndefined, isValidtoken } = require("../DataVerification");

  const verifyData = (req, res, next) => {
    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        req.body.userId = data.id;
        if(isNull(req.body.type) || isUndefined(req.body.type)){
            res.json({message:'NOT_AVAILABLE'});
            return;
        }
        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }
}

getBankRoute.post("/", verifyData, getBankController.getBank);
module.exports = getBankRoute;