const express = require("express");
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.REGISTER_KEY;
const TransactionRecordRoute = express.Router();
const TransactionRecordController = require("../controller/transaction.controller.js");


const {isNull,isUndefined,isValidtoken} = require("../DataVerification");

const verifyData = (req, res, next) => {

    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        req.body.userId = data.id;
        if(isNull(req.body.firstTime) || isUndefined(req.body.firstTime) || isNull(req.body.lastTime) || isUndefined(req.body.lastTime) || isNull(req.body.type) || isUndefined(req.body.type) ){
            res.json({message:'INVALID_DATA'});
            return;
        }else{
            next();
        }
        
    }else{
        res.json({message:'AUTH_FAILED'});
    }
}

TransactionRecordRoute.post("/", verifyData, TransactionRecordController.TransactionRecord);
module.exports = TransactionRecordRoute;