const {KYCModel,RechargeModel,UPIIDModel,AllTransactionModel} = require('../model/model');


const recharge = async(req,res,next)=>{
    
    const userKyc = await KYCModel.findOne({userId:req.body.userId});
    const allUpi = await UPIIDModel.find();
    const number_of_upi = await UPIIDModel.find().count();
    let num = Math.floor(Math.random()*number_of_upi);


    if (userKyc) {
        
        //insert data and create record in history
        const updateData = await KYCModel.updateOne({userId:req.body.userId},{name:req.body.name,mobile:req.body.mobile,upi:req.body.upi,email:req.body.email});

    }else{
        const KYCdata = KYCModel({userId:req.body.userId,name:req.body.name,mobile:req.body.mobile,upi:req.body.upi,email:req.body.email});
        const saveData = await KYCdata.save();
    }

    if(number_of_upi>0){
        let upi  = Object.values(allUpi)[num]['upi'];
        const time = new Date().getTime();
        const RechareData =  RechargeModel({userId:req.body.userId,mobile:req.body.mobile,upi:req.body.upi,email:req.body.email, time:time,rechargeAmount:req.body.rechargeAmount,toUpi:upi});
        const saveData = await RechareData.save();
        const  transaction = AllTransactionModel({userId:req.body.userId,type:'Recharge',time:time,transactionStatus:0,amount:req.body.rechargeAmount});
        const savetransaction = await transaction.save();
        res.json({rechargeId:saveData._id});
    }else{
        res.json({message:'SERVER_ERROR'});
    }
    

}

module.exports = {recharge};