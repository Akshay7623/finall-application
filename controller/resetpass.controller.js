const {RegisterModel} = require('../model/model');
const bcrypt = require('bcrypt');

const resetPass = async(req,res,next)=>{
    const userData = await RegisterModel.findOne({_id:req.body.userId});
    const newHashed = await bcrypt.hash(req.body.newPass,10);

    if(userData){
      const password = req.body.oldPass;
      const hashedPass = userData.loginPassword;
      bcrypt.compare(password,hashedPass, async function(err,result){
        if(result){
           const updatePass = await RegisterModel.updateOne({_id:req.body.userId},{loginPassword:newHashed});
           res.json({message:'success'});
        }else{
            res.json({message:'FAILED'});
        }
    });
    }else{
        res.json({message:"USER_NOT_EXIST"});
    }

}

module.exports = {resetPass};