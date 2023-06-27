const express = require("express");
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.REGISTER_KEY;
const getSuggestionRoute = express.Router();
const getSuggestionController = require("../controller/getsuggestion.controller.js");

const {isNull, isUndefined, isValidtoken } = require("../DataVerification");

  const verifyData = (req, res, next) => {
    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        req.body.userId = data.id;
        // if(isNull(req.body.type) || isUndefined(req.body.type)){
        //     res.json({message:'NOT_AVAILABLE'});
        //     return;
        // }
        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }
}

getSuggestionRoute.post("/", verifyData, getSuggestionController.getSuggestion);
module.exports = getSuggestionRoute;