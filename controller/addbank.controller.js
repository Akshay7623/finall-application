const {addBankModel } = require('../model/model');
const addBank = async(req,res,next)=>{
    const userBank = await addBankModel.findOne({userId:req.body.userId});
    if(userBank){
        res.json({message:"BANK_EXIST"});
    }else{
        const bank = addBankModel(req.body);
        const saveBank = bank.save();
        res.json({message:'success'});
    }
}


module.exports = {addBank};