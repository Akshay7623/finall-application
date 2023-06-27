const express = require("express");
const jwtKey = process.env.REGISTER_KEY;
const getbetRoute = express.Router();
const getbetController = require("../controller/getbet.controller.js");

const {isNull, isUndefined, isValidtoken } = require("../DataVerification");

  const verifyData = (req, res, next) => {
    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        req.body.userId = data.id;
        if(isNull(req.body.server) || isUndefined(req.body.server) || isNull(req.body.lastTime) || isUndefined(req.body.lastTime) || isNull(req.body.type) || isUndefined(req.body.type) ||isNull(req.body.firstBetTime) || isUndefined(req.body.firstBetTime) ){
            res.json({message:'NOT_AVAILABLE'});
            return;
        }
        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }
}

getbetRoute.post("/", verifyData, getbetController.getBet);
module.exports = getbetRoute;