const {RegisterModel} = require('../model/model');

const getProfile = async(req,res,next)=>{
   const id = req.body.id;
   const userData = await RegisterModel.findOne({_id:id});
   if(!userData){
      res.json({message:false});
      return;
   }
   res.json({mobile:userData.mobile,id:userData.ReferCode,wallet:userData.wallet});
   

}

module.exports = {getProfile};