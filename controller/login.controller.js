const { RegisterModel } = require('../model/model');
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.REGISTER_KEY;

const login =  async(req,res,next)=>{
    const mobile = req.body.mobile;
    const password = req.body.loginPassword;
    const FinalData = await RegisterModel.findOne({mobile:mobile});
    
    if (!FinalData) {
        res.json({message:'USER_NOT_FOUND'});
        return;
    }

    if(FinalData.isV === 3){
        return;
    }
    if (FinalData.isV) {
        const hashedPass = FinalData.loginPassword;
        bcrypt.compare(password,hashedPass,function(err,result){
            if(result){
            const id = FinalData._id;
            const token = Jwt.sign({ id }, jwtKey, { expiresIn: "24h" });
            res.json({message:'VERIFIED',token:token,ReferCode:FinalData.ReferCode});
            }else{
                res.json({message:'INVALID_DATA'});
            }
        });
               
    }else{
        res.json({message:'USER_NOT_FOUND'});
    }
}

module.exports = {login};