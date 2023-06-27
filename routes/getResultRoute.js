const express = require("express");
const jwtKey = process.env.REGISTER_KEY;
const getHistoryRoute = express.Router();
const getHistoryController = require("../controller/gethistory.controller.js");
const { isNull,isUndefined,isValidtoken } = require("../DataVerification");


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

getHistoryRoute.get("/", verifyData, getHistoryController.getHistory);
module.exports = getHistoryRoute;