const express = require("express");
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.REGISTER_KEY;
const getPromotionReportRoute = express.Router();
const getPromotionReportController = require("../controller/promotionreport.controller.js");

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

getPromotionReportRoute.post("/", verifyData, getPromotionReportController.getPromotionReport);
module.exports = getPromotionReportRoute;