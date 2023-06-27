const express = require("express");
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.REGISTER_KEY;
const getReport2Route = express.Router();
const getReport2Controller = require("../controller/report2.controller.js");

const {isNull, isUndefined,isReferalCode, isValidtoken } = require("../DataVerification");

  const verifyData = (req, res, next) => {
    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        req.body.userId = data.id;
        if(isNull(req.body.referCode) || isUndefined(req.body.referCode) || isReferalCode(req.body.referCode)){
            next();
        }
    }else{
        res.json({message:'AUTH_FAILED'});
    }
   }

getReport2Route.post("/", verifyData, getReport2Controller.getReport2);
module.exports = getReport2Route;