const { RegisterModel } = require('../model/model');
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.REGISTER_KEY;
const generateUniqueId = require('generate-unique-id');


const register =  async(req,res,next)=>{

  const userData = await RegisterModel.findOne({mobile:req.body.mobile});

  if(userData){
      if(userData.isV){
          res.json({message:'USER_EXIST'});
      }else{
          if(userData.OtpTried >=5){
              res.json({message:'OTP_EXPIRED'});
              return;
          }
            const otp = userData.otp;
            if(otp===parseInt(req.body.otp)){
                req.body.time = new Date().getTime();
                req.body.loginPassword = await bcrypt.hash(req.body.password,10);
                req.body.ReferCode = generateUniqueId({
                    length: 10,
                    useLetters: true
                }).toUpperCase();

                const invitee = await RegisterModel.findOne({ReferCode:req.body.code});
                if(!invitee){
                    req.body.code = ''
                }else{
                    const updateLevel1 = await RegisterModel.updateOne({ReferCode:req.body.code},{$inc:{totalPeople1:1}});
                    const parentInviteCode = invitee.code;
                    if(parentInviteCode!==''){
                        const updateGrandParent = await RegisterModel.updateOne({ReferCode:parentInviteCode},{$inc:{totalPeople2:1}});
                    }
                }
                
                const data =  await RegisterModel.updateOne({mobile:req.body.mobile},{time:req.body.time,loginPassword:req.body.password, ReferCode:req.body.ReferCode, isV:1, inviteCode:req.body.code,OtpTried:0});
                const FinalData = await RegisterModel.findOne({mobile:req.body.mobile});
                const id = FinalData._id;
                const token = Jwt.sign({ id }, jwtKey, { expiresIn: "24h" });
                res.json({message:'VERIFIED',token:token,ReferCode:FinalData.ReferCode});

            }else{
                //invalid otp here
                const Invalid = await RegisterModel.updateOne({mobile:req.body.mobile},{OtpTried:userData.OtpTried+1});
                res.json({message:'INVALID_OTP'});
            }
      }

  }else{

  }


}

module.exports = {register};