const { KYCModel } = require('../model/model');

const getKYC = async(req,res,next)=>{
     const getData = await KYCModel.findOne({userId:req.body.userId});
     if(getData){
        res.json({email:getData.email, mobile:getData.mobile, name:getData.name, upi:getData.upi});
        return;
     }else{
        res.json({message:'NOT_AVAILABLE'});
        return;
     }
}

module.exports = {getKYC};