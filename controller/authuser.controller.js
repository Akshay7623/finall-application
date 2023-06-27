const {RegisterModel} = require('../model/model');

const auth = async(req,res,next)=>{
   const id = req.body.id;
   const userData = await RegisterModel.findOne({_id:id});
   if(!userData){
      res.json({message:false});
      return;
   }
   if(userData.ReferCode === req.body.refcode){
       res.json({message:true,mobile:userData.mobile, wallet:userData.wallet,people1:userData.totalPeople1,people2:userData.totalPeople2,wallet1:userData.bonusWallet1,wallet2:userData.bonusWallet2,bonus:userData.bonusWallet});
   }else{
       res.json({message:false});
   }

}

module.exports = {auth};