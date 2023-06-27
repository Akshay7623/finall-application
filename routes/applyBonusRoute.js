const express = require("express");
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.REGISTER_KEY;
const applyBonusRoute = express.Router();
const applyBonusController = require("../controller/applybonus.controller.js");

const { isValidtoken } = require("../DataVerification");


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


applyBonusRoute.post("/", verifyData, applyBonusController.applyBonus);
module.exports = applyBonusRoute;