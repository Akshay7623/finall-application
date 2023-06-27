const express = require('express');
const {RegisterModel} = require('../model/model');
const sendOtpRoute = express.Router();
const sendOtpController = require('../controller/sendotp.controller.js');

const checkUserAail = async(req,res,next)=>{
    if(typeof req.body.mobile === 'undefined'){
        res.json({message:'INVALID_DATA'});
        return;
      }
      if(typeof req.body.mobile  === 'object'){
          res.json({message:'INVALID_DATA'})
          return;
      }
      if(req.body.mobile.toString().trim().length !==10){
        res.json({message:'INVALID_DATA'});
        return;
      } 
    next();

}


sendOtpRoute.post('/',checkUserAail,sendOtpController.sendOtp);
module.exports = sendOtpRoute;