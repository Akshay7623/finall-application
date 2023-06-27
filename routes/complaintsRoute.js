const express = require("express");
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.REGISTER_KEY;
const complaintsRoute = express.Router();
const complaintsController = require("../controller/complaints.controller.js");

const {isNull, isUndefined, isValidtoken } = require("../DataVerification");

  const verifyData = (req, res, next) => {
    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        req.body.userId = data.id;
        if(isNull(req.body.type) || isUndefined(req.body.type) || isNull(req.body.contact) || isUndefined(req.body.contact) || isNull(req.body.desc) || isUndefined(req.body.desc)){
            res.json({message:'NOT_AVAILABLE'});
            return;
        }
        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }
}

complaintsRoute.post("/", verifyData, complaintsController.Complaints);
module.exports = complaintsRoute;