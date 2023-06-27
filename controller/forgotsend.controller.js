const {ForgotpassModel} = require('../model/model');
const axios = require('axios');

const sendForgotOtp = async(req,res,next)=>{
    const userData = await ForgotpassModel.findOne({mobile:req.body.mobile});
    function generateOTP() {
        let digits = "5123456789";
        let OTP = "";
        for (let i = 0; i < 6; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
        }
        return parseInt(OTP);
      }
    const mobile = req.body.mobile;
    const otp = generateOTP();
    const t = new Date().getTime();
    if (userData) {
        const diff = t - userData.time;
        if (diff / 1000 > 60) {
            const upUser = await ForgotpassModel.updateOne( { mobile: mobile }, { time: t, otp: otp,OtpTried:0 } );
            //CALLING USER API HERE
            let result =  await axios.get(`https://2factor.in/API/V1/65798c8f-db85-11ea-9fa5-0200cd936042/SMS/${mobile}/${otp}/FIEPAY`);
            res.json({message:'OTP_SENT'});
        }else{
            console.log('time error');
            res.json({message:'TIME_ERROR'});
        }
        
    }else{
     const otpData = ForgotpassModel({mobile:mobile,time:t,otp:otp,OtpTried:0});
     const done = await otpData.save();
     res.json({message:'OTP_SENT'});
     await axios.get(`https://2factor.in/API/V1/65798c8f-db85-11ea-9fa5-0200cd936042/SMS/${mobile}/${otp}/FIEPAY`);
    }

}

module.exports = {sendForgotOtp};