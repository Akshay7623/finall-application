const { AllTransactionModel } = require('../model/model');

const TransactionRecord = async(req,res,next)=>{
   const {userId,firstTime,lastTime,type} =  req.body;

   let records,count;
   if(type === 'next'){
      records = await AllTransactionModel.find({$and:[{userId:userId},{time:{ $lt: lastTime }}]}).sort({time: -1}).limit(10);
      count = await AllTransactionModel.find({userId:userId}).count();
    }else{
      records = await AllTransactionModel.find({$and:[{userId:userId},{time:{ $gt: firstTime }}]}).sort({time: 1}).limit(10);
      count = await AllTransactionModel.find({userId:userId}).count();
    }

    res.json({records:records,count:count});

}

module.exports = {TransactionRecord};