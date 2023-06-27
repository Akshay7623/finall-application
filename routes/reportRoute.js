const express = require("express");
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.REGISTER_KEY;
const getReportRoute = express.Router();
const getReportController = require("../controller/report.controller.js");

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

getReportRoute.post("/", verifyData, getReportController.getReport);
module.exports = getReportRoute;