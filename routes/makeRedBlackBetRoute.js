const express = require("express");
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.REGISTER_KEY;
const RedBlackBetRoute = express.Router();
const RedBlackBetController = require("../controller/Red_Black_bet.controller.js");
const { isNull, isUndefined, isValidtoken } = require("../DataVerification");


  const verifyData = (req, res, next) => {

    const Bearer = req.headers["authorization"];
    const contract_amount = req.body.contract_amount;
    const color = req.body.color;
    const data = isValidtoken(Bearer,jwtKey);
    if(data){
        req.body.userId = data.id;
        if(  isNull(req.body.color) ||isUndefined(req.body.color) || isNull(req.body.contract_amount) || isUndefined(req.body.contract_amount) ){
           if(contract_amount < 10 && (color !== 'red' || color !== 'black')){
            res.json({message:'INVALID_DATA'});
            return;
           }
        }
        next();
    }else{
        res.json({message:'AUTH_FAILED'});
    }


   }
   
RedBlackBetRoute.post("/", verifyData, RedBlackBetController.Bet);
module.exports = RedBlackBetRoute;