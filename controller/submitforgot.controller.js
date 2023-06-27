const { RegisterModel,ForgotpassModel } = require('../model/model');
const bcrypt = require('bcrypt');

const submitPass = async(req,res,next)=>{
    // const userData = await RegisterModel.findOne({mobile:req.body.mobile});
    const tempData = await ForgotpassModel.findOne({mobile:req.body.mobile});
    
    if(!tempData){
       res.json({message:'OTP_NOT_AVAILABLE'});
       return;
    }

    const realOtp = tempData.otp;
    if(tempData.OtpTried<=5){
        if (realOtp === parseInt(req.body.otp)) {
            req.body.loginPassword = await bcrypt.hash(req.body.loginPassword,10);
            const updateData =  await RegisterModel.updateOne({mobile:req.body.mobile},{loginPassword:req.body.loginPassword});
            const del = await ForgotpassModel.deleteOne({mobile:req.body.mobile});
            res.json({message:'UPDATED'});
        }else{
            const updateData =  await ForgotpassModel.updateOne({mobile:req.body.mobile},{$inc:{OtpTried:1}});
            res.json({message:'INVALID_OTP'});
        }
    }else{
        res.json({message:'OTP_EXPIRED'});
        return;
    }


}

module.exports = {submitPass};