const express = require('express');
const {RegisterModel} = require('../model/model');
const forgotsendRoute = express.Router();
const forgotSendController = require('../controller/forgotsend.controller.js');

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
     const data = await RegisterModel.findOne({$and:[{mobile:req.body.mobile},{isV:1}]});
     if(data){
       next();
     }else{
      res.json({message:'INVALID_DATA'})
      return;
     }

}


forgotsendRoute.post('/',checkUserAail,forgotSendController.sendForgotOtp);
module.exports = forgotsendRoute;