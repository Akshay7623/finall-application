const { WithdrawModel } = require('../model/model');

const withdrawRecord = async(req,res,next)=>{
   const {userId,firstTime,lastTime,type} =  req.body;

   let records,count;
   if(type === 'next'){
       records = await WithdrawModel.find({$and:[{userId:userId},{time:{ $lt: lastTime }}]}).sort({time: -1}).limit(10);
       count = await WithdrawModel.find({userId:userId}).count();
    }else{
       records = await WithdrawModel.find({$and:[{userId:userId},{time:{ $gt: firstTime }}]}).sort({time: 1}).limit(10);
       count = await WithdrawModel.find({userId:userId}).count();
    }

    res.json({records:records,count:count});

}

module.exports = {withdrawRecord};