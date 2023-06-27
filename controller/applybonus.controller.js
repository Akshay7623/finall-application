const {ApplyBonusModel,RegisterModel} = require('../model/model');

const applyBonus = async(req,res,next)=>{
    const {userId} = req.body;
    const userData = await RegisterModel.findOne({_id:userId});
 
    if(userData){
        const bonus = userData.bonusWallet;
        const time = new Date().getTime();
        if(bonus>=10){
        const updateBonusWallet = await RegisterModel.updateOne({_id:userId},{bonusWallet:0});
        const InsertBonus =  ApplyBonusModel({userId:userId,amount:bonus,time:time});
        const saveBonus = await InsertBonus.save();
        const deleteDuplicate = await ApplyBonusModel.deleteMany({$and:[{_id:userId},{time:{$gt:time}}]});
        res.json({message:'success'});
        }else{
        res.json({message:'some error'});
        }
        
    }else{
        res.json({message:'INVALID_DATA'});
    }

    

}

module.exports = {applyBonus};