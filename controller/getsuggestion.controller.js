const {ComplaintsModel} = require('../model/model');

const getSuggestion = async(req,res,next)=>{
    const {userId} = req.body;
    const allData = await ComplaintsModel.find({userId:userId}).sort({time:-1});
    const count1 = await ComplaintsModel.find({$and:[{userId:userId},{solved:0}]}).count();
    const count2 = await ComplaintsModel.find({$and:[{userId:userId},{solved:1}]}).count();

    res.json({records:allData,count1:count1,count2:count2});
}

module.exports = {getSuggestion};