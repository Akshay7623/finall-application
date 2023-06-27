const {addBankModel } = require('../model/model');
const updateBank = async(req,res,next)=>{
    const {ifsc, customerName, mobile, email, bankName, bankAccount} = req.body;
    const userBank = await addBankModel.findOne({userId:req.body.userId});
    if(userBank){
        const update = await addBankModel.updateOne({userId:req.body.userId},{ifsc:ifsc,customerName:customerName,mobile:mobile,email:email,bankName:bankName, bankAccount:bankAccount})
        res.json({message:'success'});
    }else{
        res.json({message:"BANK_NOT_EXIST"});
    }
}

module.exports = {updateBank};