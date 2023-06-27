const express = require("express");
const resetPassRoute = express.Router();
const jwtKey = process.env.REGISTER_KEY;
const resetPassController = require("../controller/resetpass.controller.js");

const {isNull, isUndefined, isPassword, isValidtoken} = require('../DataVerification');

const verifyData = (req, res, next) => {

    const Bearer = req.headers["authorization"];
    
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        if(isNull(req.body.oldPass) || isUndefined(req.body.oldPass) || isNull(req.body.newPass) || isUndefined(req.body.newPass) || !isPassword(req.body.oldPass) || !isPassword(req.body.newPass)){
            res.json({message:'INVALID_DATA'});
            return;
        }
        req.body.userId = data.id;
        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }

}

resetPassRoute.post("/", verifyData, resetPassController.resetPass);
module.exports = resetPassRoute;