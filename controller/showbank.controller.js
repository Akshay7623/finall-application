const {addUPIModel,addBankModel} =  require('../model/model');
const getBankCard = async(req,res,next)=>{
     const bankCard = await addBankModel.findOne({userId:req.body.userId});
     const upiCard = await addUPIModel.findOne({userId:req.body.userId});

    if (bankCard) {
       res.json({bankName:bankCard.bankName,bankAccount:bankCard.bankAccount,ifsc:bankCard.ifsc,upi:false});
       return;
    }

     res.json({message:'EMPTY'});
}

module.exports = {getBankCard};